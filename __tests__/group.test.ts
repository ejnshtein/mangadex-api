import { getClient, getInstanceClient } from '../jest/get-test-client'
import { partialChaptersSchema } from '../jest/schema/chapter'
import { groupSchema } from '../jest/schema/group'

describe('group api', () => {
  it('should get group info', async () => {
    const client = await getClient()
    const result = await client.group.getGroup(2)

    const validateResult = groupSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get group info from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.group.getGroup(2)

    const validateResult = groupSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get group chapters info', async () => {
    const client = await getClient()
    const result = await client.group.getGroupChapters(2)

    const validateResult = partialChaptersSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get group chapters info from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.group.getGroupChapters(2)

    const validateResult = partialChaptersSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })
})
