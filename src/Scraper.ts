import cheerio from 'cheerio'
import ch from '../types/cheerio'
// work only with cheerio@1.0.0-rc.5
import { Element } from '../types/domhandler'
import { URL } from 'url'
import {
  MangadexHome,
  MangadexHomeTopChapter,
  MangadexHomeTopManga,
  MangadexHomeUpdate,
  SearchResult,
  SearchResultTitle
} from '../types/mangadex'

export class Scraper {
  static parseSearch(html: string, host?: string): SearchResult {
    const content = (cheerio as typeof ch).load(html)

    if (/login/i.test(content('head > title').text())) {
      throw new Error('Authentication required')
    }

    const titles: SearchResultTitle[] = content('#content > div.row.mt-1.mx-0')
      .children('div')
      .map((i, el) => {
        const block = (cheerio as typeof ch)(el)
        const tags = el.children.filter((n) => n.type === 'tag')
        const id = parseInt(block.data('id'))

        const foundHMangaElement = tags
          .find(
            (tag) =>
              tag.name === 'div' && tag.attribs.class.includes('text-truncate')
          )
          .children.filter((tag) => tag.type === 'tag')
          .find(
            (tag, i, arr) =>
              tag.name === 'div' &&
              i ===
                arr.length -
                  1 -
                  Array.from(arr)
                    .reverse()
                    .findIndex((t) => t.name === 'div')
          )
        const is_hentai = foundHMangaElement
          ? foundHMangaElement.children
              .find((tag) => tag.name === 'span')
              .attribs.class.includes('badge-danger')
          : false

        const title: SearchResultTitle = {
          id,
          title: block.children('div:nth-child(2)').children('a').attr('title'),
          image_url: `${host}${block
            .children('div:nth-child(1)')
            .children('a')
            .children('img')
            .attr('src')}`,
          description: block.children('div:last-of-type').text(),
          views: parseInt(
            block
              .children('ul')
              .children('li:nth-child(3)')
              .text()
              .trim()
              .replace(/,/gi, '')
          ),
          follows: parseInt(
            block
              .children('ul')
              .children('li:nth-child(2)')
              .text()
              .trim()
              .replace(/,/gi, '')
          ),
          rating: {
            value: parseFloat(
              block
                .children('ul')
                .children('li:nth-child(1)')
                .children('span:last-of-type')
                .text()
            ),
            votes: parseInt(
              block
                .children('ul')
                .children('li:nth-child(1)')
                .children('span:last-of-type')
                .attr('title')
                .match(/(\S+) .+/i)[1]
            )
          },
          lang_name: block
            .children('div:nth-child(2)')
            .children('div')
            .children('span')
            .attr('class')
            .split('-')[1],
          is_hentai
        }

        return title
      })
      .get()

    const searchResult: SearchResult = {
      titles
    }

    searchResult.current_page =
      parseInt(
        content('body > div#content > nav > ul').children('li.active').text()
      ) || 1
    try {
      searchResult.last_page = parseInt(
        new URL(
          content('body > div#content > nav > ul')
            .children('li:last-of-type')
            .children('a')
            .attr('href'),
          'https://mangadex.org'
        ).searchParams.get('p')
      )
    } catch (e) {
      searchResult.last_page = null
    }

    if (isNaN(searchResult.last_page)) {
      searchResult.last_page = searchResult.current_page
    }

    return searchResult
  }

  static parseLogin(html: string): { isLogin: boolean } {
    const content = cheerio.load(html)

    const isLogin = /you are logged in/i.test(
      content('#login_container > p').text()
    )

    return { isLogin }
  }

  static parseHome(html: string, host: string): MangadexHome {
    const content = (cheerio as typeof ch).load(html)
    if (/login/i.test(content('head > title').text())) {
      throw new Error('Authentication required')
    }

    const parseUpdate = (id: number, el: Element): MangadexHomeUpdate => {
      const tagList = el.childNodes.filter((n) => n.type === 'tag')

      return {
        id: parseInt(
          tagList
            .find((tag, i) => i === 2 && tag.name === 'div')
            .children.find((tag) => tag.name === 'a')
            .attribs.href.split('/')[2]
        ),
        chapter: tagList
          .find((tag, i) => i === 2 && tag.name === 'div')
          .children.find((tag) => tag.name === 'a').children[0].data,
        title: tagList
          .find((tag, i) => i === 1 && tag.name === 'div')
          .children.find((tag) => tag.name === 'a')
          .attribs.title.trim(),
        manga_id: parseInt(
          tagList
            .find((tag, i) => i === 0 && tag.name === 'div')
            .children.find((tag) => tag.name === 'a')
            .attribs.href.split('/')[2]
        ),
        cover_url: tagList
          .find((tag, i) => i === 0 && tag.name === 'div')
          .children.find((tag) => tag.name === 'a')
          .children.find((tag) => tag.name === 'img').attribs.src,
        group: {
          id: parseInt(
            tagList
              .find((tag, i) => i === 3 && tag.name === 'div')
              .children.find((tag) => tag.name === 'a')
              .attribs.href.split('/')[2]
          ),
          name: tagList
            .find((tag, i) => i === 3 && tag.name === 'div')
            .children.find((tag) => tag.name === 'a').children[0].data
        },
        uploaded: tagList
          .find((tag, i) => i === 4 && tag.name === 'div')
          .children.map((tag) => tag.data)
          .join()
          .trim()
      }
    }

    const parseTopChapter = (
      id: number,
      el: Element
    ): MangadexHomeTopChapter => {
      const tagList = el.childNodes.filter((n) => n.type === 'tag')

      return {
        id: parseInt(
          tagList
            .find((tag) => tag.name === 'p')
            .children.find((tag) => tag.name === 'span')
            .children.find((tag) => tag.name === 'a')
            .attribs.href.split('/')[2]
        ),
        chapter: tagList
          .find((tag) => tag.name === 'p')
          .children.find((tag) => tag.name === 'span')
          .children.find((tag) => tag.name === 'a').children[0].data,
        title: tagList
          .find((tag, i) => tag.name === 'div' && i === 1)
          .children.find((tag) => tag.name === 'a')
          .attribs.title.trim(),
        manga_id: parseInt(
          tagList
            .find((tag) => tag.name === 'div')
            .children.find((tag) => tag.name === 'a')
            .attribs.href.split('/')[2]
        ),
        cover_url: tagList
          .find((tag) => tag.name === 'div')
          .children.find((tag) => tag.name === 'a')
          .children.find((tag) => tag.name === 'img').attribs.src,
        views: parseInt(
          tagList
            .find((tag) => tag.name === 'p')
            .children.find(
              (tag, i, arr) =>
                tag.name === 'span' &&
                i ===
                  arr.length -
                    1 -
                    Array.from(arr)
                      .reverse()
                      .findIndex((t) => t.name === 'span')
            )
            .children.find((tag) => tag.type === 'text')
            .data.trim()
            .replace(/,/gi, '')
        )
      }
    }

    const parseTopMangaFollow = (
      id: number,
      el: Element
    ): MangadexHomeTopManga => {
      const tagList = el.childNodes.filter((n) => n.type === 'tag')

      const mangaUrl = tagList
        .find((tag, i) => tag.name === 'div' && i === 1)
        .children.find((tag) => tag.name === 'a')
        .attribs.href.split('/')
        .map(Number)
        .filter(Boolean)
        .pop()

      return {
        id: mangaUrl,
        title: tagList
          .find((tag, i) => tag.name === 'div' && i === 1)
          .children.find((tag) => tag.name === 'a').attribs.title,
        cover_url: tagList
          .find((tag) => tag.name === 'div')
          .children.find((tag) => tag.name === 'a')
          .children.find((tag) => tag.name === 'img').attribs.src,
        follows: parseInt(
          tagList
            .find((tag) => tag.name === 'p')
            .children.find((tag) => tag.name === 'span')
            .children.find((tag) => tag.type === 'text')
            .data.trim()
            .replace(/,/gi, '')
        ),
        rating: parseFloat(
          tagList
            .find((tag) => tag.name === 'p')
            .children.find(
              (tag, i, arr) =>
                tag.name === 'span' &&
                i ===
                  arr.length -
                    1 -
                    Array.from(arr)
                      .reverse()
                      .findIndex((t) => t.name === 'span')
            )
            .children.find((tag) => tag.name === 'span')
            .children.find((tag) => tag.type === 'text')
            .data.trim()
        ),
        users: parseInt(
          tagList
            .find((tag) => tag.name === 'p')
            .children.find(
              (tag, i, arr) =>
                tag.name === 'span' &&
                i ===
                  arr.length -
                    1 -
                    Array.from(arr)
                      .reverse()
                      .findIndex((t) => t.name === 'span')
            )
            .children.find((tag) => tag.name === 'small')
            .children.find((tag) => tag.type === 'text')
            .data.trim()
            .replace(/,/gi, '')
        )
      }
    }

    const parseTopMangaRating = (
      id: number,
      el: Element
    ): MangadexHomeTopManga => {
      const tagList = el.childNodes.filter((n) => n.type === 'tag')

      const mangaUrl = tagList
        .find((tag, i) => tag.name === 'div' && i === 1)
        .children.find((tag) => tag.name === 'a')
        .attribs.href.split('/')
        .map(Number)
        .filter(Boolean)
        .pop()

      return {
        id: mangaUrl,
        title: tagList
          .find((tag, i) => tag.name === 'div' && i === 1)
          .children.find((tag) => tag.name === 'a').attribs.title,
        cover_url: tagList
          .find((tag) => tag.name === 'div')
          .children.find((tag) => tag.name === 'a')
          .children.find((tag) => tag.name === 'img').attribs.src,
        follows: parseInt(
          tagList
            .find((tag) => tag.name === 'p')
            .children.find(
              (tag, i, arr) =>
                tag.name === 'span' &&
                i ===
                  arr.length -
                    1 -
                    Array.from(arr)
                      .reverse()
                      .findIndex((t) => t.name === 'span')
            )
            .children.find((tag) => tag.type === 'text')
            .data.trim()
            .replace(/,/gi, '')
        ),
        rating: parseFloat(
          tagList
            .find((tag) => tag.name === 'p')
            .children.find((tag) => tag.name === 'span')
            .children.find((tag) => tag.name === 'span')
            .children.find((tag) => tag.type === 'text')
            .data.trim()
        ),
        users: parseInt(
          tagList
            .find((tag) => tag.name === 'p')
            .children.find((tag) => tag.name === 'span')
            .children.find((tag) => tag.name === 'small')
            .children.find((tag) => tag.type === 'text')
            .data.trim()
            .replace(/,/gi, '')
        )
      }
    }

    const home: MangadexHome = {
      announcement: content('#announcement').html()
        ? {
            text: content('#announcement').text()
          }
        : null,
      latest_updates: {
        all: content('#latest_update > .row > .col-md-6')
          .map(parseUpdate)
          .get(),
        follows: /You haven't followed any manga/i.test(
          content('#follows_update > div.alert').text()
        )
          ? content('#follows_update > div.alert').text().trim()
          : content('#follows_update > .row > .col-md-6').map(parseUpdate).get()
      },
      top_chapters: {
        six_hours: content('#six_hours > ul > li').map(parseTopChapter).get(),
        day: content('#day > ul > li').map(parseTopChapter).get(),
        week: content('#week > ul > li').map(parseTopChapter).get()
      },
      top_manga: {
        follows: content('#top_follows > ul > li')
          .map(parseTopMangaFollow)
          .get(),
        rating: content('#top_rating > ul > li').map(parseTopMangaRating).get()
      }
    }

    if (home.announcement) {
      if (content('#announcement > a').attr('href')) {
        home.announcement.url = `${host}${content('#announcement > a').attr(
          'href'
        )}`
      }
    }

    return home
  }
}
