import { getTestClient } from '../jest/get-test-client'

describe('group api', () => {
  it('should get group info', async () => {
    const client = await getTestClient()
    const expected = [
      'id',
      'name',
      'altNames',
      'banner',
      'chapters',
      'delay',
      'description',
      'discord',
      'email',
      'follows',
      'founded',
      'ircChannel',
      'ircServer',
      'isInactive',
      'isLocked',
      'language',
      'lastUpdated',
      'leader',
      'likes',
      'members',
      'threadId',
      'threadPosts',
      'views',
      'website'
    ]
    const result = await client.group.getGroup(2)

    Object.keys(result).forEach((key) => {
      expect(expected).toContain(key)
    })
  })

  it('should get group chapters info', async () => {
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
    const result = await client.group.getGroupChapters(2)

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
})
