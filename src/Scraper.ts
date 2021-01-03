import cheerio from 'cheerio'
// work only with cheerio@1.0.0-rc.5
import { Element } from 'domhandler'
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
    const content = cheerio.load(html)

    if (/login/i.test(content('head > title').text())) {
      throw new Error('Authentication required')
    }

    const titles: SearchResultTitle[] = content('#content > div.row.mt-1.mx-0')
      .children('div')
      .map((i, el) => {
        const block = cheerio(el)
        const id = parseInt(block.data('id'))
        return {
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
              .replace(/,/i, '')
          ),
          follows: parseInt(
            block
              .children('ul')
              .children('li:nth-child(2)')
              .text()
              .trim()
              .replace(/,/i, '')
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
            .split('-')[1]
        }
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
    const content = cheerio.load(html)
    if (/login/i.test(content('head > title').text())) {
      throw new Error('Authentication required')
    }

    const parseUpdate = (id: number, el: Element): MangadexHomeUpdate => {
      const selector = cheerio.load(el)

      return {
        id: parseInt(
          selector('div:nth-child(3) > a').attr('href').split('/')[2]
        ),
        chapter: selector('div:nth-child(3) > a').text(),
        title: selector('div:nth-child(2) > a').attr('title').trim(),
        manga_id: parseInt(
          selector('div:first-of-type > a').attr('href').split('/')[2]
        ),
        cover_url: selector('div:first-of-type > a > img').attr('src'),
        group: {
          id: parseInt(
            selector('div:nth-child(4) > a').attr('href').split('/')[2]
          ),
          name: selector('div:nth-child(4) > a').text()
        },
        uploaded: selector('div:nth-child(5)').text().trim()
      }
    }

    const parseTopChapter = (
      id: number,
      el: Element
    ): MangadexHomeTopChapter => {
      const selector = cheerio.load(el)

      return {
        id: parseInt(selector('p > span > a').attr('href').split('/')[2]),
        chapter: selector('p > span > a').text(),
        title: selector('div:nth-child(2) > a').attr('title').trim(),
        manga_id: parseInt(
          selector('div:first-of-type > a').attr('href').split('/')[2]
        ),
        cover_url: selector('div:first-of-type > a > img').attr('src'),
        views: parseInt(
          selector('p > span:last-of-type').text().replace(/,/i, '')
        )
      }
    }

    const parseTopMangaFollow = (
      id: number,
      el: Element
    ): MangadexHomeTopManga => {
      const selector = cheerio.load(el)

      const mangaUrl = selector('div:nth-child(2) > a')
        .attr('href')
        .split('/')
        .map(Number)
        .filter(Boolean)
        .pop()

      return {
        id: mangaUrl,
        title: selector('div:nth-child(2) > a').attr('title'),
        cover_url: selector('div:first-of-type > a > img').attr('src'),
        follows: parseInt(
          selector('p > span:first-of-type').text().trim().replace(/,/i, '')
        ),
        rating: parseFloat(
          selector('p > span:last-of-type > span').text().trim()
        ),
        users: parseInt(
          selector('p > span:last-of-type > small')
            .text()
            .trim()
            .replace(/,/i, '')
        )
      }
    }

    const parseTopMangaRating = (
      id: number,
      el: Element
    ): MangadexHomeTopManga => {
      const selector = cheerio.load(el)

      const mangaUrl = selector('div:nth-child(2) > a')
        .attr('href')
        .split('/')
        .map(Number)
        .filter(Boolean)
        .pop()

      return {
        id: mangaUrl,
        title: selector('div:nth-child(2) > a').attr('title'),
        cover_url: selector('div:first-of-type > a > img').attr('src'),
        follows: parseInt(
          selector('p > span:last-of-type').text().trim().replace(/,/i, '')
        ),
        rating: parseFloat(
          selector('p > span:first-of-type > span').text().trim()
        ),
        users: parseInt(
          selector('p > span:first-of-type > small')
            .text()
            .trim()
            .replace(/,/i, '')
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
