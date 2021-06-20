import { getClient, getInstanceClient } from '../jest/get-test-client'
import { groupResponseSchema } from '../jest/schema/group'

/**
 * Old id - 2
 * New id - 145f9110-0a6c-4b71-8737-6acb1a3c5da4
 */

const groupId = '145f9110-0a6c-4b71-8737-6acb1a3c5da4'

describe('group api', () => {
  it('should get group info', async () => {
    const client = await getClient()
    const result = await client.group.getGroup(groupId)

    expect(result.result).toEqual('ok')

    const validateResult = groupResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get group info from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.group.getGroup(groupId)

    expect(result.result).toEqual('ok')

    const validateResult = groupResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  //   it('should get group chapters info', async () => {
  //     const client = await getClient()
  //     const result = await client.group.getGroupChapters(2)

  //     const validateResult = partialChaptersSchema.validate(result)

  //     expect(validateResult.error).toEqual(undefined)
  //   })

  //   it('should get group chapters info from md instance', async () => {
  //     const client = getInstanceClient()
  //     const result = await client.group.getGroupChapters(2)

  //     const validateResult = partialChaptersSchema.validate(result)

  //     expect(validateResult.error).toEqual(undefined)
  //   })
})
