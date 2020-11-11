const { Mangadex } = require('../dist')
const fs = require('fs')
const path = require('path')
require('dotenv').config('../.env')

const sessionPath = path.join(__dirname, '../session')

const pathExists = async (path) => {
  try {
    await fs.promises.access(path, fs.constants.F_OK)
    return true
  } catch {
    return false
  }
}

const getTestClient = async () => {
  const client = new Mangadex()
  if (await pathExists(sessionPath)) {
    await client.agent.loginWithSession(sessionPath)
  } else {
    await client.agent.login(
      process.env.MANGADEX_USERNAME,
      process.env.MANGADEX_PASSWORD,
      false
    )
    await client.agent.saveSession(sessionPath)
  }
  return client
}

/**
 * TODO add more tests
 */

describe('mangadex api', () => {
  it('should find To Be Winner', async () => {
    const client = await getTestClient()
    const result = await client.search('To Be Winner')

    expect(result.titles[0].id).toEqual(31623)
  })

  it('should get me', async () => {
    const client = await getTestClient()
    const result = await client.user.getMe()

    expect(result.username).toEqual(process.env.MANGADEX_USERNAME)
  })

  it('should get chapter from api', async () => {
    const client = await getTestClient()
    const expected = [
      'id',
      'hash',
      'mangaId',
      'mangaTitle',
      'volume',
      'chapter',
      'title',
      'language',
      'groups',
      'uploader',
      'timestamp',
      'comments',
      'views',
      'status',
      'pages',
      'server',
      'serverFallback',
      'fallbackPages',
      'languageName'
    ]
    const result = await client.chapter.getChapter(300859)

    expect(Object.keys(result)).toEqual(expect.arrayContaining(expected))
  })

  it('should get manga from api', async () => {
    const client = await getTestClient()
    const expected = [
      'id',
      'title',
      'altTitles',
      'description',
      'artist',
      'author',
      'publication',
      'tags',
      'lastChapter',
      'lastVolume',
      'isHentai',
      'links',
      'relations',
      'rating',
      'views',
      'follows',
      'comments',
      'lastUploaded',
      'mainCover'
    ]
    const result = await client.manga.getManga(26293)

    expect(Object.keys(result)).toEqual(expect.arrayContaining(expected))
  })

  it('should get home page', async () => {
    const client = await getTestClient()
    const expected = ['latest_updates', 'top_chapters', 'top_manga']
    const result = await client.getHome()

    expect(Object.keys(result)).toEqual(expect.arrayContaining(expected))
  })
})
