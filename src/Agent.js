const { multipart, deepmerge } = require('./lib')
const request = require('@ejnshtein/smol-request')
const fs = require('fs')
const cheerio = require('cheerio')
const { version: packageVersion } = require('../package.json')

const Scraper = require('./Scraper')

const readFile = (path, options) =>
  new Promise((resolve, reject) =>
    fs.readFile(path, options, (err, data) =>
      err ? reject(err) : resolve(data)
    )
  )
const writeFile = (path, data, options) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, data, options, (err) => (err ? reject(err) : resolve()))
  )

class Agent {
  constructor ({
    host = 'https://mangadex.org',
    apiHost = 'https://mangadex.org/api',
    sessionId = null,
    sessionExpiration = null,
    persistentId = null,
    hentai = 1,
    getCredentials
  }) {
    this.sessionId = sessionId
    this.sessionExpiration = sessionExpiration
    this.persistentId = persistentId
    this.hentai = hentai
    this.host = host
    this.apiHost = apiHost
    this.getCredentials = getCredentials || (() => {})
  }

  setSession (id, expiration) {
    this.sessionId = id
    this.sessionExpiration = new Date(expiration)
  }

  setPersistent (token) {
    this.persistentId = token
  }

  async login (username, password, rememberMe = false, options = {}) {
    this.sessionId = null
    this.sessionExpiration = null
    if (this.loginCredentials) {
      const session =
        this.loginCredentials.constructor.name === 'AsyncFunction'
          ? await this.loginCredentials()
          : this.loginCredentials.constructor.name === 'Function'
            ? this.loginCredentials()
            : typeof this.loginCredentials === 'object'
              ? this.loginCredentials
              : null
      if (!session && typeof session === 'object') {
        throw new Error('Agent.credentials is wrong type')
      }
      if (!this.sessionId && !this.sessionExpiration) {
        if (!session.sessionId) {
          throw new Error('No Session Id was given')
        }
        if (!session.expiration) {
          throw new Error('No Expiration was given')
        }
        this.setSession(session.sessionId, session.expiration)

        if (session.persistentId && typeof session.persistentId === 'string') {
          this.setPersistent(session.persistentId)
        }
      }
      const isLogined = await this.checkLogin()
      if (isLogined) {
        return true
      } else {
        throw new Error('Wrong credentials was given in Agent.loginCredentials')
      }
    }
    const { sessionId, expiration, persistentId } = await Agent.login(
      username,
      password,
      rememberMe,
      { baseUrl: this.host, ...options }
    )
    this.setSession(sessionId, expiration)
    if (persistentId) {
      this.setPersistent(persistentId)
    }
    return true
  }

  static async login (username, password, rememberMe = false, options = {}) {
    if (!username || !password) {
      throw new Error('Not enough login info.')
    }
    const payload = {
      login_username: username,
      login_password: password,
      remember_me: rememberMe ? 1 : 0
    }

    const boundary = multipart.boundary()

    const { headers, data } = await request(
      `${
        options.baseUrl || 'https://mangadex.org'
      }/ajax/actions.ajax.php?function=login`,
      {
        method: 'POST',
        headers: {
          'User-Agent': `mangadex-api/${packageVersion}`,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': `multipart/form-data boundary=${boundary}`
        }
      },
      multipart.payload(boundary, payload)
    )

    const session = {}

    const mangadexSession = headers['set-cookie'].find((cookie) =>
      cookie.includes('mangadex_session')
    )
    if (mangadexSession) {
      // eslint-disable-next-line no-unused-vars
      const [_, sessionId] = mangadexSession.match(/mangadex_session=(\S+);/i)
      session.sessionId = sessionId
      // eslint-disable-next-line no-unused-vars
      const [__, expiration] = mangadexSession.match(
        /expires=([\S\s]+?);/i
      )
      session.expiration = expiration
    }
    const persistent = headers['set-cookie'].find((cookie) =>
      cookie.includes('mangadex_rememberme_token')
    )
    if (persistent) {
      // eslint-disable-next-line no-unused-vars
      const [_, persistentId] = persistent.match(
        /mangadex_rememberme_token=(\S+);/i
      )
      session.persistentId = persistentId
    }

    if (!session.sessionId) {
      const errorText = cheerio.load(data)('div').text()

      if (errorText) {
        throw new Error(errorText)
      }
      throw new Error('Failed to retrieve session id.')
    }
    return session
  }

  async _onDeleteSession () {
    this.sessionId = null
    this.sessionExpiration = null
    this.persistentId = null
    this.hentai = 1
    this.host = 'https://mangadex.org'
    this.apiHost = 'https://mangadex.org/api'
    if (this.getCredentials) {
      const session =
        this.getCredentials.constructor.name === 'AsyncFunction'
          ? await this.getCredentials()
          : this.getCredentials()
      if (!this.sessionId && !this.sessionExpiration) {
        if (!session.sessionId) {
          throw new Error('No Session Id was given')
        }
        if (!session.expiration) {
          throw new Error('No Expiration was given')
        }
        this.setSession(session.sessionId, session.expiration)

        if (session.persistentId && typeof session.persistentId === 'string') {
          this.setPersistent(session.persistentId)
        }
      }
      const isLogined = await this.checkLogin()
      if (isLogined) {
        return { result: 'login' }
      } else {
        throw new Error('Wrong credentials was given in Agent.getCredentials')
      }
    }

    try {
      await this.callAjaxAction({ function: 'logout' }, { method: 'POST' })
    } catch (e) {}
    return { result: 'logout' }
  }

  async loginWithSession (path) {
    const file = await readFile(path, 'utf8')

    const [sessionId, expiration, persistentId] = file.split('\n')

    if (!sessionId || !expiration) {
      throw new Error(
        `Lost "${(!sessionId && 'sessionId') || (!expiration && 'expiration')}"`
      )
    }

    this.setSession(sessionId, expiration)

    if (persistentId) {
      this.setPersistent(persistentId)
    }

    const isLogined = await this.checkLogin()

    if (isLogined) {
      return true
    } else {
      return false
    }
  }

  async saveSession (path) {
    return Agent.saveSession(path, {
      sessionId: this.sessionId,
      sessionExpiration: this.sessionExpiration,
      persistentId: this.persistentId
    })
  }

  static async saveSession (path, session) {
    await writeFile(
      path,
      `${session.sessionId}\n${session.sessionExpiration.toGMTString()}${
        session.persistentId ? `\n${session.persistentId}` : ''
      }`,
      'utf8'
    )
    return true
  }

  setCookies (cookies) {
    const mangadexSession = cookies.find((cookie) =>
      cookie.includes('mangadex_session')
    )
    if (mangadexSession) {
      // eslint-disable-next-line no-unused-vars
      const [_, sessionId] = mangadexSession.match(/mangadex_session=(\S+);/i)
      // eslint-disable-next-line no-unused-vars
      const [__, expiration] = mangadexSession.match(/expires=([\S\s]+?);/i)
      if (sessionId === 'deleted') {
        return this._onDeleteSession()
      } else {
        this.setSession(sessionId, expiration)
      }
      return true
    } else {
      return false
    }
  }

  getCookie () {
    let Cookie = ''

    if (this.sessionId) {
      Cookie += `mangadex_session=${this.sessionId}; `
      if (this.persistentId) {
        Cookie += `mangadex_rememberme_token=${this.persistentId}; `
      }
      Cookie += `mangadex_h_toggle=${this.hentai}`
    }

    return Cookie
  }

  async checkLogin () {
    const result = await this.call('login')

    const { isLogined } = Scraper.parseLogin(result)

    return isLogined
  }

  async call (url, options = {}) {
    const Cookie = this.getCookie()
    const result = await Agent.call(
      url,
      deepmerge(options, {
        baseUrl: this.host,
        headers: {
          Cookie
        }
      })
    )
    const resetCookies = this.setCookies(result.headers['set-cookie'])

    if (typeof resetCookies === 'boolean') {
      return result.data
    } else {
      const { result } = await resetCookies

      if (result === 'login') {
        return this.call(url, options)
      } else {
        throw new Error(`Authorization required\n${url}`)
      }
    }
  }

  async callApi (url, options = {}) {
    const result = await this.call(url, {
      baseUrl: this.apiHost,
      responseType: 'json',
      ...options
    })
    if (result.status === 'error') {
      throw new Error(result.message)
    }

    return result
  }

  static async call (url, options = {}) {
    const result = await request(
      `${options.baseUrl || 'https://mangadex.org'}${
        !(url.startsWith('/') && options.baseUrl.endsWith('/')) && '/'
      }${url}`,
      deepmerge(options, {
        method: 'GET',
        headers: {
          'User-Agent': `mangadex-api/${packageVersion}`
        }
      })
    )
    return result
  }

  static async callApi (url, options = {}) {
    const result = await Agent.call(`api${!url.startsWith('/') && '/'}${url}`, {
      responseType: 'json',
      ...options
    })
    return result
  }

  async callAjaxAction (params = {}, options = {}) {
    const result = await this.call('ajax/actions.ajax.php', {
      params,
      ...options
    })

    return result
  }

  static async callAjaxAction (params = {}, options = {}) {
    return Agent.call('ajax/actions.ajax.php', {
      params,
      ...options
    })
  }
}

module.exports = Agent
