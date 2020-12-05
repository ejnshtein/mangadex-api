import { getClient, getInstanceClient } from '../jest/get-test-client'
import { tagSchema, tagsSchema } from '../jest/schema/tag'

describe('tag api', () => {
  it('should get all tags from api', async () => {
    const client = await getClient()
    const result = await client.tag.getTags()

    const validateResult = tagsSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get all tags from api from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.tag.getTags()

    const validateResult = tagsSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get tag 9 (Ecchi)', async () => {
    const client = await getClient()
    const result = await client.tag.getTag(9)

    const validateResult = tagSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get tag 9 (Ecchi) from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.tag.getTag(9)

    const validateResult = tagSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })
})
