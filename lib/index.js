const getGenres = require('./get-genres')
const getMangaLinks = require('./get-manga-links')
const getStatus = require('./get-status')
const getLangName = require('./get-lang-name')

class Composer {
  static getGenres (genre) {
    return getGenres(genre)
  }

  static getMangaLinks (link) {
    return getMangaLinks(link)
  }

  static getStatus (status) {
    return getStatus(status)
  }

  static getLangName (langCode) {
    return getLangName(langCode)
  }
}

module.exports = Composer
