const genresData = require('../genres.json')
const langCodeData = require('../langcodes.json')
const linksData = require('./lib/links')

class Composer {
  static getGenres (genres) {
    genres = Array.isArray(genres) ? genres : [genres]
    const res = genresData.filter(el => genres.some(genreId => el.id === Number.parseInt(genreId)))
    if (res.length >= 2) {
      return res
    } else {
      return genres.map(genre => ({
        id: genre,
        name: `Genre#${genre}`
      }))
    }
  }

  static getMangaLinks (links) {
    const formatted = Object
      .entries(links)
      .map(([name, value]) => {
        const matchedLink = linksData[name]
        if (matchedLink) {
          return {
            title: matchedLink.title,
            url: matchedLink.url + value
          }
        } else {
          return {
            title: name,
            url: value
          }
        }
      })
    return formatted
  }

  static getStatus (status) {
    const statuses = {
      1: 'Ongoing',
      2: 'Completed',
      3: 'Cancelled',
      4: 'Hiatus'
    }
    return statuses[status] || status
  }

  static getLangName (langCode) {
    return langCodeData[langCode] || langCode
  }

  static parseToHTML (string) {
    return string.replace(/\[url=(\S+?)\](\S+?)\[\/url\]/ig, '<a href="$1">$2</a>')
  }
}

module.exports = Composer
