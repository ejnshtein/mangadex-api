const { all: deepmerge } = require('deepmerge')
const LRU = require('lru-cache')
const {
  parseSearch,
  parseUser,
  parseGroup,
  parseHome,
  parseMe
} = require('./scraper')

const Agent = require('./Agent')

const Composer = require('./Composer')

const sharedMangaCache = new LRU({ maxAge: 600000 })
const sharedChapterCache = new LRU({ maxAge: 600000 })

const DefaultOptions = {
  host: 'https://mangadex.org',
  apiHost: 'https://mangadex.org/api',
  cacheTimeout: 600000,
  mangaCacheTimeout: 0,
  chapterCachetimeout: 0,
  cacheMangaResult: false,
  cacheChapterResult: false,
  shareMangaCache: false,
  shareChapterCache: false
}

class Mangadex extends Composer {
  constructor (options) {
    super()
    this.options = Object.assign({}, DefaultOptions, options)

    if (!this.options.shareMangaCache) {
      this.mangaCache = new LRU({
        maxAge: this.options.mangaCacheTimeout
          ? this.options.mangaCacheTimeout
          : this.options.cacheTimeout
      })
    }
    if (!this.options.shareChapterCache) {
      this.chapterCache = new LRU({
        maxAge: this.options.chapterCachetimeout
          ? this.options.chapterCachetimeout
          : this.options.cacheTimeout
      })
    }

    this.agent = new Agent({
      host: this.options.host,
      apiHost: this.options.apiHost,
      getCredentials: this.options.getCredentials
    })
  }

  async getManga (mangaId, normalize = true, params = {}) {
    const fetchManga = () => Agent.callApi(`manga/${mangaId}`, { baseUrl: this.options.host, ...params })
      .then(({ data }) => normalize ? normalizeManga({ ...data, host: this.options.host }) : data)

    if (this.options.cacheMangaResult) {
      const key = `${mangaId}:${normalize === true ? '1' : '0'}`
      const cachedResult = this.options.shareMangaCache
        ? sharedMangaCache.get(key)
        : this.mangaCache.get(key)
      if (cachedResult) {
        return cachedResult
      } else {
        const result = await fetchManga()
        if (this.options.shareMangaCache) {
          sharedMangaCache.set(
            key,
            result,
            this.options.mangaCacheTimeout
              ? this.options.mangaCacheTimeout
              : this.options.cacheTimeout
          )
        } else {
          this.mangaCache.set(key, result)
        }
        return result
      }
    }
    return fetchManga()
  }

  static async getManga (mangaId, normalize = true, params = {}) {
    const { data } = await Agent.callApi(`manga/${mangaId}`, params)
    return normalize ? normalizeManga({ ...data, host: params.baseUrl }) : data
  }

  async getChapter (chapterId, normalize = true, params = {}) {
    const fetchChapter = () => Agent.callApi(`chapter/${chapterId}`, { baseUrl: this.options.host, ...params })
      .then(({ data }) => normalize ? normalizeChapter(data, `${this.options.host}/data/`) : data)
    if (this.options.cacheChapterResult) {
      const key = `${chapterId}:${normalize === true ? '1' : '0'}`
      const cachedResult = this.options.sharedChapteCache
        ? sharedChapterCache.get(key)
        : this.chapterCache.get(key)
      if (cachedResult) {
        return cachedResult
      } else {
        const result = await fetchChapter()
        if (this.options.sharedChapteCache) {
          sharedChapterCache.set(
            key,
            result,
            this.options.chapterCachetimeout
              ? this.options.chapterCachetimeout
              : this.options.cacheTimeout
          )
        } else {
          this.chapterCache.set(key, result)
        }
        return result
      }
    }
    return fetchChapter()
  }

  static async getChapter (chapterId, normalize = true, params = {}) {
    const { data } = await Agent.callApi(`chapter/${chapterId}`, params)
    return normalize ? normalizeChapter(data, params.defaulServer || `${DefaultOptions.host}/data/`) : data
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
      Object
        .entries(query)
        .forEach(([name, value]) => {
          if (typeof value === 'string' && value) {
            defaultQuery[name] = value
          }
          if (Array.isArray(value) && value.length > 0) {
            defaultQuery[name] = value.join(',')
          }
        })
    }
    const finalParams = Object
      .entries(defaultQuery)
      .reduce(
        (acc, [name, value]) => {
          if (typeof value === 'string' && value) {
            acc[name] = value
          }
          if (Array.isArray(value) && value.length > 0) {
            acc[name] = value.join(',')
          }
          return acc
        }, {})

    const result = await this.agent.call(
      'search',
      deepmerge(
        [
          {
            params: finalParams
          },
          params
        ]
      )
    )
    return parseSearch(result, this.options.host)
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
      Object
        .entries(query)
        .forEach(([name, value]) => {
          if (typeof value === 'string' && value) {
            defaultQuery[name] = value
          }
          if (Array.isArray(value) && value.length > 0) {
            defaultQuery[name] = value.join(',')
          }
        })
    }

    const finalParams = Object
      .entries(defaultQuery)
      .reduce(
        (acc, [name, value]) => {
          if (typeof value === 'string' && value) {
            acc[name] = value
          }
          if (Array.isArray(value) && value.length > 0) {
            acc[name] = value.join(',')
          }
          return acc
        }, {})
    const result = await Agent.call(
      'search',
      deepmerge(
        [
          {
            params: finalParams
          },
          params
        ]
      )
    )
    return parseSearch(result.data)
  }

  async quickSearch (title, params = {}) {
    const result = await this.agent.call(`quick_search/${encodeURIComponent(title)}`, params)
    return parseSearch(result)
  }

  static async quickSearch (title, params = {}) {
    const result = await Agent.call(`quick_search/${encodeURIComponent(title)}`, params)
    return parseSearch(result.data)
  }

  async getUser (id, params = {}) {
    const result = await this.agent.call(`user/${id}`, params)
    return parseUser(result)
  }

  static async getUser (id, params = {}) {
    const result = await Agent.call(`user/${id}`, params)
    return parseUser(result.data)
  }

  async getGroup (id, params = {}) {
    const result = await this.agent.call(`group/${id}`, params)
    return parseGroup(result)
  }

  static async getGroup (id, params = {}) {
    const result = await Agent.call(`group/${id}`, params)
    return parseGroup(result.data)
  }

  async getHome (params = {}) {
    const result = await this.agent.call('', params)
    return parseHome(result, this.options.host)
  }

  static async getHome (params = {}) {
    const result = await Agent.call('', params)
    return parseHome(result.data, params.baseUrl || DefaultOptions.host)
  }

  async getMe (params = {}) {
    const result = await this.agent.call('', params)
    const { id } = parseMe(result)

    if (id) {
      return this.getUser(id)
    } else {
      throw new Error('User not found')
    }
  }
}

module.exports = Object.assign(Mangadex, {
  Composer,
  Agent
})

module.exports.default = Object.assign(Mangadex, {
  Composer,
  Agent
})

const normalizeManga = ({ manga, chapter, status, host }) => {
  if (typeof chapter === 'object') {
    const fixedChapters = Object.keys(chapter)
      .map(id => ({ id: Number.parseInt(id), lang_name: Composer.getLangName(chapter[id].lang_code), ...chapter[id] }))
      .sort((a, b) => Number(a.chapter) - Number(b.chapter))
    chapter = fixedChapters
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
    status
  }
}

const normalizeChapter = (chapter, defaulServer = 'https://mangadex.org/data/') => {
  if (chapter.server === '/data/') {
    chapter.server = defaulServer
  }
  if (typeof chapter.page_array === 'object') {
    chapter.page_array = chapter.page_array.map(page => `${chapter.server}${chapter.hash}/${page}`)
  }
  return chapter
}
