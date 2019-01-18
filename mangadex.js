const axios = require('axios').default
const { parseSearch } = require('./scraper')
const api = axios.create({
  baseURL: 'https://mangadex.org/api/'
})
const Composer = require('./lib')

class Mangadex extends Composer {
  getManga (mangaId, normalize = true, params = {}) {
    return Mangadex.getManga(mangaId, normalize, params)
  }

  getChapter (chapterId, normalize = true, params = {}) {
    return Mangadex.getChapter(chapterId, normalize, params)
  }

  search (query, searchSegment = 'title', params = {}) {
    return Mangadex.search(query, searchSegment, params)
  }

  static getManga (mangaId, normalize = true, params = {}) {
    return api
      .get(`manga/${mangaId}`, params)
      .then(response => normalize ? normalizeManga(response.data) : response.data)
  }

  static getChapter (chapterId, normalize = true, params = {}) {
    return api
      .get(`chapter/${chapterId}`, params)
      .then(response => normalize ? normalizeChapter(response.data) : response.data)
  }

  static search (query, searchSegment = 'title', params = {}) {
    return axios
      .get(
        'https://mangadex.org/search',
        Object.assign({}, {
          params: {
            [searchSegment]: query
          }
        }, params)
      )
      .then(response => parseSearch(response.data))
  }
}

module.exports = Object.assign(Mangadex, {
  Composer
})

module.exports.default = Object.assign(Mangadex, {
  Composer
})

const normalizeManga = mangaData => {
  const { chapter } = mangaData
  const fixedChapters = Object.keys(chapter).map(id => ({ id: Number.parseInt(id), lang_name: Composer.getLangName(chapter[id].lang_code), ...chapter[id] }))
  fixedChapters.sort((a, b) => Number.parseFloat(a.chapter) - Number.parseFloat(b.chapter))
  mangaData.chapter = fixedChapters
  mangaData.manga.cover_url = `https://mangadex.org${mangaData.manga.cover_url}`
  mangaData.manga.genres = Composer.getGenres(mangaData.manga.genres)
  mangaData.manga.status_text = Composer.getStatus(mangaData.manga.status)
  mangaData.manga.links = Composer.getMangaLinks(mangaData.manga.links)
  return mangaData
}

const normalizeChapter = chapter => {
  if (chapter.status !== 'OK') return chapter
  if (chapter.server === '/data/') {
    chapter.server = 'https://mangadex.org/data/'
  }
  chapter.page_array = chapter.page_array.map(page => `${chapter.server}${chapter.hash}/${page}`)
  return chapter
}
