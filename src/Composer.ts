import fs from 'fs'
import { join } from 'path'
import { links as linksData } from './lib/links'
import { Link, PartialTag } from '../types/mangadex'
import { Language } from '../types/language'

const genresData = JSON.parse(
  fs.readFileSync(join(__dirname, '..', 'genres.json'), 'utf-8')
)
const langCodeData = JSON.parse(
  fs.readFileSync(join(__dirname, '..', 'langcodes.json'), 'utf-8')
)

export class Composer {
  static getGenres(genres: number[]): PartialTag[] {
    const res = genresData.filter((el) =>
      genres.some((genreId) => el.id === genreId)
    )
    if (res.length >= 2) {
      return res
    } else {
      return genres.map((genre) => ({
        id: genre,
        name: `Genre#${genre}`
      }))
    }
  }

  static getMangaLinks(links: Record<string, string>): Link[] {
    const formatted = Object.entries(links).map(([name, value]) => {
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

  static getLangName(langCode: Language): string {
    return langCodeData[langCode] || langCode
  }

  static parseToHTML(string: string): string {
    return string.replace(
      /\[url=(\S+?)\](\S+?)\[\/url\]/gi,
      '<a href="$1">$2</a>'
    )
  }

  static formatTypeMapToArray<T>(map: { [x: string]: T }): T[] {
    return Object.values(map)
  }
}
