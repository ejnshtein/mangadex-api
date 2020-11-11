import {
  request,
  RequestResult,
  ResponseType,
  ResponseTypeMap
} from 'smol-request'
import fs from 'fs'
import cheerio from 'cheerio'
import { Scraper } from './Scraper'
import * as multipart from './lib/multipart'
import { AgentOptions, LoginSession, MRequestOptions, Session } from '../types'
import { deepmerge } from './lib/deepmerge'
import { MangadexApiResponse } from '../types/mangadex'
import { join } from 'path'

const pkg = JSON.parse(
  fs.readFileSync(join(__dirname, '..', 'package.json'), 'utf-8')
)

export class Agent {
  public sessionId?: string
  public sessionExpiration?: Date
  public persistentId?: string
  public hentai?: number
  public host?: string
  public apiHost?: string
  public getCredentials?: Session | (() => Promise<Session>) | (() => Session)
  public loginCredentials?: Session | (() => Promise<Session>) | (() => Session)

  constructor({
    host = 'https://mangadex.org',
    apiHost = 'https://mangadex.org/api',
    sessionId = null,
    sessionExpiration = null,
    persistentId = null,
    hentai = 1,
    getCredentials,
    loginCredentials
  }: AgentOptions) {
    this.setSession(sessionId, sessionExpiration)
    this.setPersistent(persistentId)
    this.hentai = hentai
    this.host = host
    this.apiHost = apiHost
    this.getCredentials = getCredentials || null
    this.loginCredentials = loginCredentials || null
  }

  setSession(id: string, expiration: string | Date): void {
    this.sessionId = id
    this.sessionExpiration =
      expiration instanceof Date ? expiration : new Date(expiration)
  }

  setPersistent(token: string): void {
    this.persistentId = token
  }

  async login(
    username: string,
    password: string,
    rememberMe = false,
    options: MRequestOptions = {}
  ): Promise<boolean> {
    this.sessionId = null
    this.sessionExpiration = null
    if (this.loginCredentials) {
      const session: Session =
        this.loginCredentials.constructor.name === 'AsyncFunction'
          ? await (this.loginCredentials as () => Promise<Session>)()
          : this.loginCredentials.constructor.name === 'Function'
          ? (this.loginCredentials as () => Session)()
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
        if (!session.sessionExpiration) {
          throw new Error('No Expiration was given')
        }
        this.setSession(session.sessionId, session.sessionExpiration)

        if (session.persistentId && typeof session.persistentId === 'string') {
          this.setPersistent(session.persistentId)
        }
      }
      const isLogin = await this.checkLogin()
      if (isLogin) {
        return true
      } else {
        throw new Error('Wrong credentials was given in Agent.loginCredentials')
      }
    }
    const { sessionId, sessionExpiration, persistentId } = await Agent.login(
      username,
      password,
      rememberMe,
      {
        baseUrl: this.host,
        ...options
      }
    )
    this.setSession(sessionId, sessionExpiration)
    if (persistentId) {
      this.setPersistent(persistentId)
    }
    return true
  }

  static async login(
    username: string,
    password: string,
    rememberMe = false,
    options: MRequestOptions = {}
  ): Promise<Session> {
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
          'User-Agent': `mangadex-api/${pkg.version}`,
          'X-Requested-With': 'XMLHttpRequest',
          'Content-Type': `multipart/form-data boundary=${boundary}`
        }
      },
      multipart.payload(boundary, payload)
    )

    const session: Session = {}

    const mangadexSession = (headers['set-cookie'] as string[]).find((cookie) =>
      cookie.includes('mangadex_session')
    )
    if (mangadexSession) {
      const [_, sessionId] = mangadexSession.match(/mangadex_session=(\S+);/i)
      session.sessionId = sessionId
      const [__, expiration] = mangadexSession.match(/expires=([\S\s]+?);/i)
      session.sessionExpiration = expiration
    }
    const persistent = (headers['set-cookie'] as string[]).find((cookie) =>
      cookie.includes('mangadex_rememberme_token')
    )
    if (persistent) {
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

  async _onDeleteSession(): Promise<{ result: string }> {
    this.sessionId = null
    this.sessionExpiration = null
    this.persistentId = null
    this.hentai = 1
    this.host = 'https://mangadex.org'
    this.apiHost = 'https://mangadex.org/api'
    if (this.getCredentials) {
      const session: Session =
        this.getCredentials.constructor.name === 'AsyncFunction'
          ? await (this.getCredentials as () => Promise<Session>)()
          : (this.getCredentials as () => Session)()
      if (!this.sessionId && !this.sessionExpiration) {
        if (!session.sessionId) {
          throw new Error('No Session Id was given')
        }
        if (!session.sessionExpiration) {
          throw new Error('No Expiration was given')
        }
        this.setSession(session.sessionId, session.sessionExpiration)

        if (session.persistentId && typeof session.persistentId === 'string') {
          this.setPersistent(session.persistentId)
        }
      }
      const isLogin = await this.checkLogin()
      if (isLogin) {
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

  async loginWithSession(path: string): Promise<boolean> {
    const file = await fs.promises.readFile(path, 'utf8')

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

    const isLogin = await this.checkLogin()

    if (isLogin) {
      return true
    } else {
      return false
    }
  }

  async saveSession(path: string): Promise<boolean> {
    return Agent.saveSession(path, {
      sessionId: this.sessionId,
      sessionExpiration: this.sessionExpiration,
      persistentId: this.persistentId
    })
  }

  static async saveSession(
    path: string,
    session: LoginSession
  ): Promise<boolean> {
    await fs.promises.writeFile(
      path,
      `${session.sessionId}\n${session.sessionExpiration.toUTCString()}${
        session.persistentId ? `\n${session.persistentId}` : ''
      }`,
      'utf8'
    )
    return true
  }

  setCookies(cookies: string[]): boolean | Promise<{ result: string }> {
    const mangadexSession = cookies.find((cookie) =>
      cookie.includes('mangadex_session')
    )
    if (mangadexSession) {
      const [_, sessionId] = mangadexSession.match(/mangadex_session=(\S+);/i)
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

  getCookie(): string {
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

  async checkLogin(): Promise<boolean> {
    const result = await this.call('login')

    const { isLogin } = Scraper.parseLogin(result)

    return isLogin
  }

  async call<K, T extends ResponseType = 'text'>(
    url: string,
    options: MRequestOptions<T> = {},
    body?: Record<string, unknown>
  ): Promise<NonNullable<ResponseTypeMap<K>[T]>> {
    const Cookie = this.getCookie()
    const { data, headers } = await Agent.call<K, T>(
      url,
      deepmerge(
        {
          baseUrl: this.host
        },
        options,
        {
          headers: {
            Cookie
          }
        }
      ),
      body
    )
    const resetCookies = this.setCookies(headers['set-cookie'] as string[])

    if (typeof resetCookies === 'boolean') {
      return data
    } else {
      const { result } = await resetCookies

      if (result === 'login') {
        return this.call(url, options)
      } else {
        throw new Error(`Authorization required\n${url}`)
      }
    }
  }

  static async call<K, T extends ResponseType = 'text'>(
    url: string,
    options: MRequestOptions<T> = {},
    body?: Record<string, unknown>
  ): Promise<RequestResult<NonNullable<ResponseTypeMap<K>[T]>>> {
    const result = await request<K, T>(
      `${options.baseUrl || 'https://mangadex.org'}${
        !(url.startsWith('/') && options.baseUrl.endsWith('/')) && '/'
      }${url}`,
      deepmerge(
        {
          method: 'GET',
          headers: {
            'User-Agent': `mangadex-api/${pkg.version}`,
            ...(body
              ? {
                  'Content-Type': 'application/json'
                }
              : {})
          }
        },
        options
      ),
      body ? JSON.stringify(body) : undefined
    )

    return result
  }

  async callApi<K>(
    url: string,
    options: MRequestOptions<'json'> = {},
    body?: Record<string, unknown>
  ): Promise<K> {
    const { data: response } = await this.call<
      RequestResult<MangadexApiResponse<K>>,
      'json'
    >(
      url,
      deepmerge(
        {
          baseUrl: this.apiHost
        },
        options,
        {
          responseType: 'json'
        }
      ),
      body
    )

    if (response.status === 'error') {
      throw new Error(response.message)
    }

    return response.data
  }

  static async callApi<T>(
    url: string,
    options: MRequestOptions<'json'> = {},
    body?: Record<string, unknown>
  ): Promise<T> {
    const { data: response } = await Agent.call<MangadexApiResponse<T>, 'json'>(
      `api${!url.startsWith('/') && '/'}${url}`,
      deepmerge(options, {
        responseType: 'json'
      }),
      body
    )

    if (response.status === 'error') {
      throw new Error(response.message)
    }

    return response.data
  }

  async callAjaxAction(
    params: { [k: string]: unknown },
    options: MRequestOptions<'headers'> = {}
  ): Promise<RequestResult<never>> {
    const result = await this.call<never, 'headers'>(
      'ajax/actions.ajax.php',
      deepmerge(options, {
        params
      })
    )

    return result
  }

  static async callAjaxAction(
    params: { [k: string]: unknown },
    options: MRequestOptions<'headers'> = {}
  ): Promise<RequestResult<never>> {
    const result = await Agent.call<never, 'headers'>(
      'ajax/actions.ajax.php',
      deepmerge(options, {
        params
      })
    )

    return result
  }
}

module.exports = Agent
