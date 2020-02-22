const genresData = require('./genres.json')
const linkEntries = require('./links.json')

class Composer {
  static getGenres (genre) {
    const genres = Array.isArray(genre) ? genre : [genre]
    const res = genresData.filter(el => genres.some(genreId => el.id === Number.parseInt(genreId)))
    if (res.length >= 2) {
      return res
    } else {
      return genres.map(genre => ({
        id: genre,
        label: `Genre#${genre}`
      }))
    }
  }

  static getMangaLinks (links) {
    const formated = Object
      .entries(links)
      .map(([name, value]) => {
        const matchedLink = linkEntries.find(el => el.short_name === name)
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
    return formated
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
    const codes = {
      sa: 'Arabic',
      bd: 'Bengali',
      bg: 'Bulgarian',
      mm: 'Burmese',
      ct: 'Catalan',
      cn: 'Chinese (Simp)',
      hk: 'Chinese (Trad)',
      cz: 'Czech',
      dk: 'Danish',
      nl: 'Dutch',
      gb: 'English',
      ph: 'Filipino',
      fi: 'Finnish',
      fr: 'French',
      de: 'German',
      gr: 'Greek',
      hu: 'Hungarian',
      id: 'Indonesian',
      it: 'Italian',
      jp: 'Japanese',
      kr: 'Korean',
      lt: 'Lithuanian',
      my: 'Malay',
      mn: 'Mongolian',
      ir: 'Persian',
      pl: 'Polish',
      br: 'Portuguese (Br)',
      pt: 'Portuguese (Pt)',
      ro: 'Romanian',
      ru: 'Russian',
      rs: 'Serbo-Croatian',
      es: 'Spanish (Es)',
      mx: 'Spanish (LATAM)',
      se: 'Swedish',
      th: 'Thai',
      tr: 'Turkish',
      ua: 'Ukrainian',
      vn: 'Vietnamese'
    }
    return codes[langCode] || langCode
  }

  static parseToHTML (string) {
    return string.replace(/\[url=(\S+?)\](\S+?)\[\/url\]/ig, '<a href="$1">$2</a>')
  }
}

module.exports = Composer
