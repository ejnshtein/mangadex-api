import { getClient, getInstanceClient } from '../jest/get-test-client'
import { mangaFeedSchema, mangaResponseSchema } from '../jest/schema/manga'
import { mangaResponseExtendedSchema } from '../jest/schema/manga-extended'

/**
 * senko-san new id - c26269c7-0f5d-4966-8cd5-b79acb86fb7a
 * old id - 26293
 */

const senkoSanMangaId = 'c26269c7-0f5d-4966-8cd5-b79acb86fb7a'

describe('manga api', () => {
  it('should get manga from api', async () => {
    const client = await getClient()

    const result = await client.manga.getManga(senkoSanMangaId)

    expect(result.result).toEqual('ok')

    const validateResult = mangaResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get manga from api with extra data', async () => {
    const client = await getClient()

    const result = await client.manga.getManga(senkoSanMangaId, {
      withRelationShips: true
    })

    expect(result.result).toEqual('ok')

    const validateResult = mangaResponseExtendedSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get manga from api from md instance', async () => {
    const client = getInstanceClient()

    const result = await client.manga.getManga(senkoSanMangaId)

    expect(result.result).toEqual('ok')

    const validateResult = mangaResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get manga from api from md instance with extra data', async () => {
    const client = getInstanceClient()

    const result = await client.manga.getManga(senkoSanMangaId, {
      withRelationShips: true
    })

    expect(result.result).toEqual('ok')

    const validateResult = mangaResponseExtendedSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get manga chapters from api from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.manga.getMangaFeed(senkoSanMangaId)

    const validateResult = mangaFeedSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  // it('should get manga covers from api', async () => {
  //   const client = await getClient()

  //   const result = await client.manga.getMangaCovers(senkoSanMangaId)

  //   const validateResult = mangaCoversSchema.validate(result)

  //   expect(validateResult.error).toEqual(undefined)
  // })

  // it('should get manga covers from api from md instance', async () => {
  //   const client = getInstanceClient()

  //   const result = await client.manga.getMangaCovers(senkoSanMangaId)

  //   const validateResult = mangaCoversSchema.validate(result)

  //   expect(validateResult.error).toEqual(undefined)
  // })
})
