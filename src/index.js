const Mangadex = require('./Mangadex')
const Agent = require('./Agent')
const Scraper = require('./Scraper')
const Composer = require('./Composer')

module.exports = Object.assign(Mangadex, {
  Agent,
  Scraper,
  Composer
})
