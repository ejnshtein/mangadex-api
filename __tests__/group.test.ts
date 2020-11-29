import { getClient, getInstanceClient } from '../jest/get-test-client'

describe('group api', () => {
  const expected = {
    getGroup: [
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
    ],
    getGroupChapters: [
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
    groupKey: ['id', 'name']
  }
  it('should get group info', async () => {
    const client = await getClient()
    const result = await client.group.getGroup(2)

    Object.keys(result).forEach((key) => {
      expect(expected.getGroup).toContain(key)
    })
  })

  it('should get group info from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.group.getGroup(2)

    Object.keys(result).forEach((key) => {
      expect(expected.getGroup).toContain(key)
    })
  })

  it('should get group chapters info', async () => {
    const client = await getClient()
    const result = await client.group.getGroupChapters(2)

    result.chapters.forEach((chapter) => {
      Object.keys(chapter).forEach((key) => {
        expect(expected.getGroupChapters).toContain(key)
      })
    })
    result.groups.forEach((group) => {
      Object.keys(group).forEach((key) => {
        expect(expected.groupKey).toContain(key)
      })
    })
  })

  it('should get group chapters info from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.group.getGroupChapters(2)

    result.chapters.forEach((chapter) => {
      Object.keys(chapter).forEach((key) => {
        expect(expected.getGroupChapters).toContain(key)
      })
    })
    result.groups.forEach((group) => {
      Object.keys(group).forEach((key) => {
        expect(expected.groupKey).toContain(key)
      })
    })
  })
})
