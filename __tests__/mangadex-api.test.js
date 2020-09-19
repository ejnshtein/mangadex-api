const Mangadex = require('../src/Mangadex')
require('dotenv').config('../.env')

const getTestClient = async () => {
  const client = new Mangadex()
  await client.agent.login(
    process.env.MANGADEX_USERNAME,
    process.env.MANGADEX_PASSWORD,
    false
  )
  return client
}

describe('mangadex api', () => {
  it('should find To Be Winner', async () => {
    const client = await getTestClient()
    const result = await client.search('To Be Winner')

    expect(result.titles[0].id).toEqual(31623)
  })

  it('should get me', async () => {
    const client = await getTestClient()
    const result = await client.getMe()

    expect(result.username).toEqual(process.env.MANGADEX_USERNAME)
  })

  it('should get chapter from api', async () => {
    const client = await getTestClient()
    const expected = [
      'id',
      'timestamp',
      'hash',
      'volume',
      'chapter',
      'title',
      'lang_name',
      'lang_code',
      'manga_id',
      'group_id',
      'group_name',
      'group_id_2',
      'group_name_2',
      'group_id_3',
      'group_name_3',
      'comments',
      'server',
      'page_array',
      'long_strip',
      'status',
      'server_fallback'
    ]
    const result = await client.getChapter(300859)

    expect(Object.keys(result)).toEqual(expect.arrayContaining(expected))
  })

  it('should get manga from api', async () => {
    const client = await getTestClient()
    const expected = [
      'cover_url',
      'description',
      'title',
      'alt_names',
      'artist',
      'author',
      'status',
      'demographic',
      'genres',
      'last_chapter',
      'last_volume',
      'last_updated',
      'lang_name',
      'lang_flag',
      'hentai',
      'links',
      'related',
      'rating',
      'views',
      'follows',
      'comments',
      'covers'
    ]
    const result = await client.getManga(26293)

    expect(Object.keys(result.manga)).toEqual(expect.arrayContaining(expected))
  })
})
