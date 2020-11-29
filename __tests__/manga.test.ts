import { getClient, getInstanceClient } from '../jest/get-test-client'

describe('manga api', () => {
  const expected = {
    getManga: [
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
    ],
    getMangaChapters: [
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
    ],
    groupKey: ['id', 'name'],
    getMangaCovers: ['url', 'volume']
  }

  it('should get manga from api', async () => {
    const client = await getClient()

    const result = await client.manga.getManga(26293)

    Object.keys(result).forEach((key) => {
      expect(expected.getManga).toContain(key)
    })
  })

  it('should get manga from api from md instance', async () => {
    const client = getInstanceClient()

    const result = await client.manga.getManga(26293)

    Object.keys(result).forEach((key) => {
      expect(expected.getManga).toContain(key)
    })
  })

  it('should get manga chapters from api', async () => {
    const client = await getClient()
    const result = await client.manga.getMangaChapters(26293)

    result.chapters.forEach((chapter) => {
      Object.keys(chapter).forEach((key) => {
        expect(expected.getMangaChapters).toContain(key)
      })
    })
    result.groups.forEach((group) => {
      Object.keys(group).forEach((key) => {
        expect(expected.groupKey).toContain(key)
      })
    })
  })

  it('should get manga chapters from api from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.manga.getMangaChapters(26293)

    result.chapters.forEach((chapter) => {
      Object.keys(chapter).forEach((key) => {
        expect(expected.getMangaChapters).toContain(key)
      })
    })
    result.groups.forEach((group) => {
      Object.keys(group).forEach((key) => {
        expect(expected.groupKey).toContain(key)
      })
    })
  })

  it('should get manga covers from api', async () => {
    const client = await getClient()
    const result = await client.manga.getMangaCovers(26293)

    result.forEach((cover) => {
      Object.keys(cover).forEach((key) => {
        expect(expected.getMangaCovers).toContain(key)
      })
    })
  })

  it('should get manga covers from api from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.manga.getMangaCovers(26293)

    result.forEach((cover) => {
      Object.keys(cover).forEach((key) => {
        expect(expected.getMangaCovers).toContain(key)
      })
    })
  })
})
