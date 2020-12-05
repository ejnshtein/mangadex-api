import fs from 'fs'
import { join } from 'path'
import { links as linksData } from './lib/links'
import { Link } from '../types/mangadex'
import { Language } from '../types/language'

const langCodeData = JSON.parse(
  fs.readFileSync(join(__dirname, '..', 'langcodes.json'), 'utf-8')
)

export class Composer {
  static getMangaLinks(links: Record<string, string>): Link[] {
    return Object.entries(links).map(([name, value]) => {
      const matchedLink = linksData[name]
      return {
        title: matchedLink ? matchedLink.title : name,
        url: matchedLink ? matchedLink.url + value : value
      }
    })
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
