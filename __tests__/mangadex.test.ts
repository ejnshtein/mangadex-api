import { getTestClient } from '../jest/get-test-client'

/**
 * TODO add more tests
 */
describe('mangadex api', () => {
  it('should find To Be Winner', async () => {
    const client = await getTestClient()
    const result = await client.search('To Be Winner')

    expect(result.titles[0].id).toEqual(31623)
  })

  it('should get home page', async () => {
    const client = await getTestClient()
    const expected = ['latest_updates', 'top_chapters', 'top_manga']
    const result = await client.getHome()

    expect(Object.keys(result)).toEqual(expect.arrayContaining(expected))
  })

  it('should get all manga relation types', async () => {
    const client = await getTestClient()
    const expected = { id: 'number', name: 'string', pairId: 'number' }

    const expectedKeys = Object.keys(expected)

    const result = await client.getRelations()

    Object.values(result).forEach((relation) => {
      Object.entries(relation).forEach(([key, type]) => {
        expect(expectedKeys).toContain(key)
        expect(typeof type).toEqual(expected[key])
      })
    })
  })
})
