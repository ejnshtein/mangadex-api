const cheerio = require('cheerio')

const { parseFloat, parseInt } = Number

module.exports = {
  parseSearch (html) {
    const content = cheerio.load(html)

    const titles = content('body > div#content > div.row.mt-1.mx-0').children('div')
      .map((i, el) => {
        const block = cheerio(el)
        const id = Number.parseInt(block.data('id'))
        return {
          id,
          title: block.children('div:nth-child(2)').children('a').attr('title'),
          image_url: `https://mangadex.org${block.children('div:nth-child(1)').children('a').children('img').attr('src')}`,
          description: block.children('div:last-of-type').text(),
          views: parseInt(block.children('ul').children('li:nth-child(3)').text().trim().replace(/,/i, '')),
          follows: parseInt(block.children('ul').children('li:nth-child(2)').text().trim().replace(/,/i, '')),
          rating: {
            value: parseFloat(block.children('ul').children('li:nth-child(1)').children('span:last-of-type').text()),
            votes: parseInt(block.children('ul').children('li:nth-child(1)').children('span:last-of-type').attr('title').match(/(\S+) .+/i)[1])
          },
          lang_name: block.children('div:nth-child(2)').children('div').children('img').attr('title')
        }
      }).get()

    const searchResult = { titles }

    searchResult.current_page = parseInt(content('body > div#content > nav > ul').children('li.active').text()) || 1

    return searchResult
  }
}

// export interface Manga {
//   id: number
//   title: string
//   author: string
//   description: string
//   rating: string
//   views: string
//   follows: string
//   last_update: string
//   last_update_text: string
// }
