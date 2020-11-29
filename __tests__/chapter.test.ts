import { getInstanceClient, getClient } from '../jest/get-test-client'

describe('chapter api', () => {
  const expected = {
    getChapter: [
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
  }
  it('should get chapter from api', async () => {
    const client = await getClient()
    const result = await client.chapter.getChapter(300859)

    Object.keys(result).forEach((key) => {
      expect(expected.getChapter).toContain(key)
    })
  })

  it('should get chapter from api from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.chapter.getChapter(300859)

    Object.keys(result).forEach((key) => {
      expect(expected.getChapter).toContain(key)
    })
  })
})
