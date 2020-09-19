const cheerio = require('cheerio')

const { parseFloat, parseInt } = Number

class Scraper {
  static parseSearch (html, host) {
    const content = cheerio.load(html)

    if (/login/i.test(content('head > title').text())) {
      throw new Error('Authentication required')
    }

    const titles = content('#content > div.row.mt-1.mx-0').children('div')
      .map((i, el) => {
        const block = cheerio(el)
        const id = parseInt(block.data('id'))
        return {
          id,
          title: block.children('div:nth-child(2)').children('a').attr('title'),
          image_url: `${host}${block.children('div:nth-child(1)').children('a').children('img').attr('src')}`,
          description: block.children('div:last-of-type').text(),
          views: parseInt(block.children('ul').children('li:nth-child(3)').text().trim().replace(/,/i, '')),
          follows: parseInt(block.children('ul').children('li:nth-child(2)').text().trim().replace(/,/i, '')),
          rating: {
            value: parseFloat(block.children('ul').children('li:nth-child(1)').children('span:last-of-type').text()),
            votes: parseInt(block.children('ul').children('li:nth-child(1)').children('span:last-of-type').attr('title').match(/(\S+) .+/i)[1])
          },
          lang_name: block.children('div:nth-child(2)').children('div').children('span').attr('class').split('-')[1]
        }
      }).get()

    const searchResult = { titles }

    searchResult.current_page = parseInt(content('body > div#content > nav > ul').children('li.active').text()) || 1
    try {
      searchResult.last_page = parseInt(new URL(content('body > div#content > nav > ul').children('li:last-of-type').children('a').attr('href'), 'https://mangadex.org').searchParams.get('p'))
    } catch (e) {
      searchResult.last_page = null
    }

    if (isNaN(searchResult.last_page)) {
      searchResult.last_page = searchResult.current_page
    }

    return searchResult
  }

  static parseUser (html) {
    const content = cheerio.load(html)
    if (/login/i.test(content('head > title').text())) {
      throw new Error('Authentication required')
    }

    const user = {
      username: content('#content > .card > .card-header > span.mx-1').text(),
      language: content('#content > .card > .card-header > span.flag').attr('title'),
      joined: content('#content > .card > .card-body > .row > div:last-of-type > div:nth-child(2) > div:last-of-type').text().trim(),
      photo_url: content('#content > .card > .card-body > .row > div:first-of-type > img').attr('src')
    }

    content('#content > .card > .card-body > .row > div:last-of-type')
      .children('.row')
      .map((id, el) => {
        const selector = cheerio.load(el)
        const title = selector('div:first-of-type').text()
        switch (true) {
          case /stats/i.test(title):
            return {
              _: 'stats',
              stats: {
                views: parseInt(selector('div:last-of-type > ul > li:first-of-type').text().trim().replace(/,/i, '')),
                uploads: parseInt(selector('div:last-of-type > ul > li:last-of-type').text().trim().replace(/,/i, ''))
              }
            }
          case /website/i.test(title):
            return {
              _: 'website',
              website: selector('div:last-of-type > a').attr('href')
            }
          case /last online/i.test(title):
            return {
              _: 'last_online',
              last_online: selector('div.col-lg-9').text().trim().replace(/\\n\s+/i, '')
            }
          default:
            return null
        }
      })
      .get()
      .filter(el => el)
      .forEach(stat => {
        user[stat._] = stat[stat._]
      })

    return user
  }

  static parseLogin (html) {
    const content = cheerio.load(html)

    const isLogined = /you are logged in/i.test(content('#login_container > p').text())

    return { isLogined }
  }

  static parseGroup (groupId, html) {
    const content = cheerio.load(html)
    if (/login/i.test(content('head > title').text())) {
      throw new Error('Authentication required')
    }

    const group = {
      id: parseInt(groupId),
      name: content('#content > div.card > .card-header > span.mx-1').text().trim(),
      banner: content('#content > div.card > .card-img-bottom').attr('src'),
      stats: {
        views: parseInt(content('#content > .row > .col-md-6:first-of-type > .card > .table > tbody > tr:nth-child(2) > td > ul > li:first-of-type').text().trim().replace(/,/i, '')),
        follows: parseInt(content('#content > .row > .col-md-6:first-of-type > .card > .table > tbody > tr:nth-child(2) > td > ul > li:nth-child(2)').text().trim().replace(/,/i, '')),
        total_chapters: parseInt(content('#content > .row > .col-md-6:first-of-type > .card > .table > tbody > tr:nth-child(2) > td > ul > li:nth-child(3)').text().trim().replace(/,/i, ''))
      },
      links: content('#content > .row > .col-md-6:first-of-type > .card > .table > tbody > tr:nth-child(3) > td')
        .children('a')
        .map((id, el) => {
          const selector = cheerio.load(el)
          const title = selector('span').attr('title')
          switch (true) {
            case /discord/i.test(title):
              return {
                _: 'discord',
                discord: el.attribs.href
              }
            case /website/i.test(title):
              return {
                _: 'website',
                website: el.attribs.href
              }
            case /irc/i.test(title):
              return {
                _: 'irc',
                irc: el.attribs.href
              }
            case /email/i.test(title):
              return {
                _: 'email',
                email: el.attribs.href.match(/mailto:(\S+)/i)[1]
              }
            default:
              return null
          }
        })
        .get()
        .filter(Boolean)
        .reduce(
          (acc, cur) => {
            acc[cur._] = cur[cur._]

            return acc
          },
          {}
        ),
      leader: {
        id: parseInt(content('#content > .row > .col-md-6:nth-child(2) > .card > .table > tbody > tr > td > a').attr('id')),
        username: content('#content > .row > .col-md-6:nth-child(2) > .card > .table > tbody > tr > td > a').text()
      },
      members: content('#content > .row > .col-md-6:nth-child(2) > .card > .table > tbody > tr:nth-child(2) > td > ul > li')
        .map((id, el) => {
          const selector = cheerio.load(el)

          return {
            id: parseInt(selector('a').attr('id')),
            username: selector('a').text()
          }
        })
        .get(),
      upload_restrictions: content('#content > .row > .col-md-6:nth-child(2) > .card > .table > tbody > tr:nth-child(3) > td > span').attr('title'),
      description: content('#content > .card:nth-child(4) > .card-body').html().trim()
    }

    return group
  }

  static parseHome (html, host) {
    const content = cheerio.load(html)
    if (/login/i.test(content('head > title').text())) {
      throw new Error('Authentication required')
    }

    const parseUpdates = (id, el) => {
      const selector = cheerio.load(el)

      return {
        id: parseInt(selector('div:nth-child(3) > a').attr('href').split('/')[2]),
        chapter: selector('div:nth-child(3) > a').text(),
        title: selector('div:nth-child(2) > a').attr('title').trim(),
        manga_id: parseInt(selector('div:first-of-type > a').attr('href').split('/')[2]),
        cover_url: selector('div:first-of-type > a > img').attr('src'),
        group: {
          id: parseInt(selector('div:nth-child(4) > a').attr('href').split('/')[2]),
          name: selector('div:nth-child(4) > a').text()
        },
        uploaded: selector('div:nth-child(5)').text().trim()
      }
    }

    const parseTopChapters = (id, el) => {
      const selector = cheerio.load(el)

      return {
        id: parseInt(selector('p > span > a').attr('href').split('/')[2]),
        chapter: selector('p > span > a').text(),
        title: selector('div:nth-child(2) > a').attr('title').trim(),
        manga_id: parseInt(selector('div:first-of-type > a').attr('href').split('/')[2]),
        cover_url: selector('div:first-of-type > a > img').attr('src'),
        views: parseInt(selector('p > span:last-of-type').text().replace(/,/i, ''))
      }
    }

    const parseTopMangaFollows = (id, el) => {
      const selector = cheerio.load(el)

      return {
        id: parseInt(selector('div:first-of-type > a').attr('href').split('/')[2]),
        title: selector('div:nth-child(2) > a').attr('title'),
        cover_url: selector('div:first-of-type > a > img').attr('src'),
        follows: parseInt(selector('p > span:first-of-type').text().trim().replace(/,/i, '')),
        rating: parseFloat(selector('p > span:last-of-type > span').text().trim()),
        users: parseInt(selector('p > span:last-of-type > small').text().trim().replace(/,/i, ''))
      }
    }

    const parseTopMangaRating = (id, el) => {
      const selector = cheerio.load(el)

      return {
        id: parseInt(selector('div:first-of-type > a').attr('href').split('/')[2]),
        title: selector('div:nth-child(2) > a').attr('title'),
        cover_url: selector('div:first-of-type > a > img').attr('src'),
        follows: parseInt(selector('p > span:last-of-type').text().trim().replace(/,/i, '')),
        rating: parseFloat(selector('p > span:first-of-type > span').text().trim()),
        users: parseInt(selector('p > span:first-of-type > small').text().trim().replace(/,/i, ''))
      }
    }

    const home = {
      announcement: content('#announcement').html() ? {
        text: content('#announcement').text()
      } : null,
      latest_updates: {
        all: content('#latest_update > .row > .col-md-6')
          .map(parseUpdates)
          .get(),
        follows: /You haven't followed any manga/i.test(content('#follows_update > div.alert').text())
          ? content('#follows_update > div.alert').text().trim()
          : content('#follows_update > .row > .col-md-6')
            .map(parseUpdates)
            .get()
      },
      top_chapters: {
        six_hours: content('#six_hours > ul > li')
          .map(parseTopChapters)
          .get(),
        day: content('#day > ul > li')
          .map(parseTopChapters)
          .get(),
        week: content('#week > ul > li')
          .map(parseTopChapters)
          .get()
      },
      top_manga: {
        follows: content('#top_follows > ul > li')
          .map(parseTopMangaFollows)
          .get(),
        rating: content('#top_rating > ul > li')
          .map(parseTopMangaRating)
          .get()
      }
    }

    if (home.announcement) {
      if (content('#announcement > a').attr('href')) {
        home.announcement.url = `${host}${content('#announcement > a').attr('href')}`
      }
    }

    return home
  }

  static parseMe (html) {
    const content = cheerio.load(html)
    if (/login/i.test(content('head > title').text())) {
      throw new Error('Authentication required')
    }

    const id = parseInt(content('#navbarSupportedContent > ul.navbar-nav:last-of-type > li:nth-child(2) > a').attr('href').split('/')[2])

    return { id: isNaN(id) ? null : id }
  }
}

module.exports = Scraper
