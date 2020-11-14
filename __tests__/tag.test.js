const getTestClient = require('../jest/get-test-client')

describe('tag api', () => {
  it('should get all tags from api', async () => {
    const client = await getTestClient()
    const expected = ['id', 'name', 'group', 'description']
    const result = await client.tag.getTags()

    Object.values(result).forEach((tag) => {
      Object.keys(tag).forEach((key) => {
        expect(expected).toContain(key)
      })
    })
  })
})
