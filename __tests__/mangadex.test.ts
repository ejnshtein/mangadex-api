import { getClient, getInstanceClient } from '../jest/get-test-client'
import {
  followsSchema,
  mangadexHomeSchema,
  relationsSchema,
  searchResultSchema
} from '../jest/schema/mangadex'

/**
 * TODO add more tests
 */
describe('mangadex api', () => {
  it('should find To Be Winner', async () => {
    const client = await getClient()

    const result = await client.search('To Be Winner')

    const validateResult = searchResultSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get home page', async () => {
    const client = await getClient()
    const result = await client.getHome()

    const validateResult = mangadexHomeSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get home page from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.getHome()

    const validateResult = mangadexHomeSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get all manga relation types', async () => {
    const client = await getClient()
    const result = await client.getRelations()

    const validateResult = relationsSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get all manga relation types from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.getRelations()

    const validateResult = relationsSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get all manga follows types', async () => {
    const client = await getClient()
    const result = await client.getFollows()

    const validateResult = followsSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get all manga follows types from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.getFollows()

    const validateResult = followsSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })
})
