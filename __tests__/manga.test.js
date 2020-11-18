const getTestClient = require('../jest/get-test-client')

describe('manga api', () => {
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

    Object.keys(result).forEach((key) => {
      expect(expected).toContain(key)
    })
  })

  it('should get manga chapters from api', async () => {
    const client = await getTestClient()
    const expectedChapterKey = [
      'chapter',
      'comments',
      'groups',
      'hash',
      'id',
      'language',
      'mangaId',
      'mangaTitle',
      'timestamp',
      'title',
      'uploader',
      'views',
      'volume',
      'rating',
      'views'
    ]
    const expectedGroupKey = ['id', 'name']
    const result = await client.manga.getMangaChapters(26293)

    result.chapters.forEach((chapter) => {
      Object.keys(chapter).forEach((key) => {
        expect(expectedChapterKey).toContain(key)
      })
    })
    result.groups.forEach((group) => {
      Object.keys(group).forEach((key) => {
        expect(expectedGroupKey).toContain(key)
      })
    })
  })

  it('should get manga covers from api', async () => {
    const client = await getTestClient()
    const expected = ['url', 'volume']
    const result = await client.manga.getMangaCovers(26293)

    result.forEach((cover) => {
      Object.keys(cover).forEach((key) => {
        expect(expected).toContain(key)
      })
    })
  })
})
