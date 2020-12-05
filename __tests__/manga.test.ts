import { getClient, getInstanceClient } from '../jest/get-test-client'
import { partialChaptersSchema } from '../jest/schema/chapter'
import { mangaCoversSchema, mangaSchema } from '../jest/schema/manga'

describe('manga api', () => {
  it('should get manga from api', async () => {
    const client = await getClient()

    const result = await client.manga.getManga(26293)

    const validateResult = mangaSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get manga from api from md instance', async () => {
    const client = getInstanceClient()

    const result = await client.manga.getManga(26293)

    const validateResult = mangaSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get manga chapters from api', async () => {
    const client = await getClient()

    const result = await client.manga.getMangaChapters(26293)

    const validateResult = partialChaptersSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get manga chapters from api from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.manga.getMangaChapters(26293)

    const validateResult = partialChaptersSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get manga covers from api', async () => {
    const client = await getClient()

    const result = await client.manga.getMangaCovers(26293)

    const validateResult = mangaCoversSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get manga covers from api from md instance', async () => {
    const client = getInstanceClient()

    const result = await client.manga.getMangaCovers(26293)

    const validateResult = mangaCoversSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })
})
