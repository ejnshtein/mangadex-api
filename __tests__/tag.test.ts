import { getClient, getInstanceClient } from '../jest/get-test-client'

describe('tag api', () => {
  const expected = {
    getTags: ['id', 'name', 'group', 'description']
  }

  it('should get all tags from api', async () => {
    const client = await getClient()
    const result = await client.tag.getTags()

    result.forEach((tag) => {
      Object.keys(tag).forEach((key) => {
        expect(expected.getTags).toContain(key)
      })
    })
  })

  it('should get all tags from api from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.tag.getTags()

    result.forEach((tag) => {
      Object.keys(tag).forEach((key) => {
        expect(expected.getTags).toContain(key)
      })
    })
  })
})
