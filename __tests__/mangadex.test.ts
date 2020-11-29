import { getClient, getInstanceClient } from '../jest/get-test-client'

/**
 * TODO add more tests
 */
describe('mangadex api', () => {
  const expected = {
    getHome: ['announcement', 'latest_updates', 'top_chapters', 'top_manga'],
    getRelations: ['id', 'name', 'pairId'],
    getFollows: ['id', 'name']
  }
  it('should find To Be Winner', async () => {
    const client = await getClient()
    const result = await client.search('To Be Winner')

    expect(result.titles[0].id).toEqual(31623)
  })

  it('should get home page', async () => {
    const client = await getClient()
    const result = await client.getHome()

    Object.keys(result).forEach((key) => {
      expect(expected.getHome).toContain(key)
    })
  })

  it('should get home page from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.getHome()

    Object.keys(result).forEach((key) => {
      expect(expected.getHome).toContain(key)
    })
  })

  it('should get all manga relation types', async () => {
    const client = await getClient()
    const result = await client.getRelations()

    Object.values(result).forEach((relation) => {
      Object.keys(relation).forEach((key) => {
        expect(expected.getRelations).toContain(key)
      })
    })
  })

  it('should get all manga relation types from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.getRelations()

    Object.values(result).forEach((relation) => {
      Object.keys(relation).forEach((key) => {
        expect(expected.getRelations).toContain(key)
      })
    })
  })

  it('should get all manga follows types', async () => {
    const client = await getClient()
    const result = await client.getFollows()

    result.forEach((follow) => {
      Object.keys(follow).forEach((key) => {
        expect(expected.getFollows).toContain(key)
      })
    })
  })

  it('should get all manga follows types from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.getFollows()

    result.forEach((follow) => {
      Object.keys(follow).forEach((key) => {
        expect(expected.getFollows).toContain(key)
      })
    })
  })
})
