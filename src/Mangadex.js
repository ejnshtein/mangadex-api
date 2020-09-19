const Scraper = require('./Scraper')
const Agent = require('./Agent')
const Composer = require('./Composer')
const deepmerge = require('./lib/deepmerge')

const DefaultOptions = {
  host: 'https://mangadex.org',
  apiHost: 'https://mangadex.org/api'
}

class Mangadex {
  constructor (options = {}) {
    this.options = Object.assign({}, DefaultOptions, options)

    this.agent = new Agent({
      host: this.options.host,
      apiHost: this.options.apiHost,
      getCredentials: this.options.getCredentials
    })
  }

  async getManga (mangaId, params = {}) {
    const { data } = await Agent.callApi(`manga/${mangaId}`, {
      baseUrl: this.options.host,
      ...params
    })

    return normalizeManga({ ...data, host: this.options.host })
  }

  static async getManga (mangaId, params = {}) {
    const { data } = await Agent.callApi(`manga/${mangaId}`, params)
    return normalizeManga({ ...data, host: params.baseUrl })
  }

  async getChapter (chapterId, params = {}) {
    const { data } = await Agent.callApi(`chapter/${chapterId}`, {
      baseUrl: this.options.host,
      ...params
    })

    return normalizeChapter(data, `${this.options.host}/data/`)
  }

  static async getChapter (chapterId, params = {}) {
    const { data } = await Agent.callApi(`chapter/${chapterId}`, params)
    return normalizeChapter(
      data,
      params.defaultServer || `${DefaultOptions.host}/data/`
    )
  }

  async search (query, params = {}) {
    const defaultQuery = {
      title: '',
      author: '',
      artist: '',
      lang_id: null,
      demos: [],
      statuses: [],
      tags: [],
      tag_mode_inc_all: 'all',
      tag_mode_exc: 'any'
    }

    if (typeof query === 'string') {
      defaultQuery.title = query
    } else if (typeof query === 'object') {
      Object.entries(query).forEach(([name, value]) => {
        if (typeof value === 'string' && value) {
          defaultQuery[name] = value
        }
        if (Array.isArray(value) && value.length > 0) {
          defaultQuery[name] = value.join(',')
        }
      })
    }
    const finalParams = Object.entries(defaultQuery).reduce(
      (acc, [name, value]) => {
        if (typeof value === 'string' && value) {
          acc[name] = value
        }
        if (Array.isArray(value) && value.length > 0) {
          acc[name] = value.join(',')
        }
        return acc
      },
      {}
    )

    const result = await this.agent.call(
      'search',
      deepmerge(params, {
        params: finalParams
      })
    )

    return Scraper.parseSearch(result, this.options.host)
  }

  static async search (query = {}, params = {}) {
    const defaultQuery = {
      title: '',
      author: '',
      artist: '',
      lang_id: null,
      demos: [],
      statuses: [],
      tags: [],
      tag_mode_inc_all: 'all',
      tag_mode_exc: 'any'
    }

    if (typeof query === 'string') {
      defaultQuery.title = query
    } else if (typeof query === 'object') {
      Object.entries(query).forEach(([name, value]) => {
        if (typeof value === 'string' && value) {
          defaultQuery[name] = value
        }
        if (Array.isArray(value) && value.length > 0) {
          defaultQuery[name] = value.join(',')
        }
      })
    }

    const finalParams = Object.entries(defaultQuery).reduce(
      (acc, [name, value]) => {
        if (typeof value === 'string' && value) {
          acc[name] = value
        }
        if (Array.isArray(value) && value.length > 0) {
          acc[name] = value.join(',')
        }
        return acc
      },
      {}
    )

    const result = await Agent.call(
      'search',
      deepmerge(params, {
        params: finalParams
      })
    )

    return Scraper.parseSearch(result.data)
  }

  async quickSearch (title, params = {}) {
    const result = await this.agent.call(
      `quick_search/${encodeURIComponent(title)}`,
      params
    )
    return Scraper.parseSearch(result)
  }

  static async quickSearch (title, params = {}) {
    const result = await Agent.call(
      `quick_search/${encodeURIComponent(title)}`,
      params
    )
    return Scraper.parseSearch(result.data)
  }

  async getUser (id, params = {}) {
    const result = await this.agent.call(`user/${id}`, params)
    return Scraper.parseUser(result)
  }

  static async getUser (id, params = {}) {
    const result = await Agent.call(`user/${id}`, params)
    return Scraper.parseUser(result.data)
  }

  async getGroup (id, params = {}) {
    const result = await this.agent.call(`group/${id}`, params)
    return Scraper.parseGroup(id, result)
  }

  static async getGroup (id, params = {}) {
    const result = await Agent.call(`group/${id}`, params)
    return Scraper.parseGroup(result.data)
  }

  async getHome (params = {}) {
    const result = await this.agent.call('', params)
    return Scraper.parseHome(result, this.options.host)
  }

  static async getHome (params = {}) {
    const result = await Agent.call('', params)
    return Scraper.parseHome(result.data, params.baseUrl || DefaultOptions.host)
  }

  async getMe (params = {}) {
    const result = await this.agent.call('', params)
    const { id } = Scraper.parseMe(result)

    if (id) {
      return this.getUser(id)
    } else {
      throw new Error('User not found')
    }
  }

  async getMangaFollows (params = {}) {
    const { result } = await this.agent.callApi(
      '',
      deepmerge(params, {
        params: { type: 'manga_follows' }
      })
    )
    return result
  }

  async friendAdd (userId, params = {}) {
    await this.agent.callAjaxAction(
      {
        function: 'friend_add',
        id: userId
      },
      params
    )

    return true
  }

  async mangaFollow (mangaId, type, params = {}) {
    await this.agent.callAjaxAction(
      {
        function: 'manga_follow',
        id: mangaId,
        type
      },
      params
    )

    return true
  }

  async mangaUnfollow (mangaId, params = {}) {
    await this.agent.callAjaxAction(
      {
        function: 'manga_unfollow',
        id: mangaId,
        type: mangaId
      },
      params
    )

    return true
  }
}

module.exports = Mangadex

const normalizeManga = ({ manga, group, chapter, status, host }) => {
  if (typeof chapter === 'object') {
    const fixedChapters = Object.keys(chapter)
      .map((id) => ({
        id: Number.parseInt(id),
        lang_name: Composer.getLangName(chapter[id].lang_code),
        ...chapter[id]
      }))
      .sort((a, b) => Number(a.chapter) - Number(b.chapter))
    chapter = fixedChapters
  }
  if (typeof group === 'object') {
    const fixedGroups = Object.entries(group).map(
      ([groupId, { group_name }]) => ({
        id: Number.parseInt(groupId),
        name: group_name
      })
    )
    group = fixedGroups
  }
  manga.cover_url = `${host || 'https://mangadex.org'}${manga.cover_url}`
  if (typeof manga.genres === 'object' && manga.genres !== null) {
    manga.genres = Composer.getGenres(manga.genres)
  }
  if (typeof manga.status === 'number') {
    manga.status_text = Composer.getStatus(manga.status)
  }
  if (typeof manga.links === 'object' && manga.links !== null) {
    manga.links = Composer.getMangaLinks(manga.links)
  }
  if (typeof manga.description === 'string') {
    manga.description = Composer.parseToHTML(manga.description)
  }
  return {
    manga,
    chapter,
    group,
    status
  }
}

const normalizeChapter = (
  chapter,
  defaultServer = 'https://mangadex.org/data/'
) => {
  if (chapter.server === '/data/') {
    chapter.server = defaultServer
  }
  if (typeof chapter.page_array === 'object') {
    chapter.page_array = chapter.page_array.map(
      (page) => `${chapter.server}${chapter.hash}/${page}`
    )
  }
  return chapter
}
