import { getInstanceClient, getClient } from '../jest/get-test-client'
import { chapterSchema } from '../jest/schema/chapter'

describe('chapter api', () => {
  it('should get chapter from api', async () => {
    const client = await getClient()
    const result = await client.chapter.getChapter(300859)

    const validateResult = chapterSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get chapter from api from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.chapter.getChapter(300859)

    const validateResult = chapterSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })
})
