import { getClient, getInstanceClient } from '../jest/get-test-client'

import { chapterResponseSchema } from '../jest/schema/chapter'
import { chapterResponseExtendedSchema } from '../jest/schema/chapter-extended'

const chapterId = '20412a3f-6305-4c49-aad1-6c3303d183cd'

describe('chapter api', () => {
  it('should get chapter from api', async () => {
    const client = await getClient()
    const result = await client.chapter.getChapter(chapterId)

    expect(result.result).toEqual('ok')

    const validateResult = chapterResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get chapter from api with extra data', async () => {
    const client = await getClient()
    const result = await client.chapter.getChapter(chapterId, {
      withRelationShips: true
    })

    expect(result.result).toEqual('ok')

    const validateResult = chapterResponseExtendedSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get chapter from api from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.chapter.getChapter(chapterId)

    expect(result.result).toEqual('ok')

    const validateResult = chapterResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get chapter from api from md instance with extra data', async () => {
    const client = getInstanceClient()
    const result = await client.chapter.getChapter(chapterId, {
      withRelationShips: true
    })

    expect(result.result).toEqual('ok')

    const validateResult = chapterResponseExtendedSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  //   // it('should get chapter with no chapters from api', async () => {
  //   //   const client = await getClient()
  //   //   const result = await client.chapter.getChapter(1158194)

  //   //   const validateResult = chapterSchema.validate(result)

  //   //   expect(validateResult.error).toEqual(undefined)
  //   // })

  //   // it('should get chapter with no chapters from api from md instance', async () => {
  //   //   const client = getInstanceClient()
  //   //   const result = await client.chapter.getChapter(1158194)

  //   //   const validateResult = chapterSchema.validate(result)

  //   //   expect(validateResult.error).toEqual(undefined)
  //   // })
})
