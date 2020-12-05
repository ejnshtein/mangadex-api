import { getClient, getInstanceClient } from '../jest/get-test-client'
import { partialChaptersSchema } from '../jest/schema/chapter'
import {
  userFollowedPartialMangaSchema,
  userFollowedUpdatesSchema,
  userMangaRatingSchema,
  userMangaSchema,
  userSchema,
  userSettingsSchema
} from '../jest/schema/user'

describe('user api', () => {
  it('should get me', async () => {
    const client = await getClient()
    const result = await client.user.getMe()

    const validateResult = userSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
    expect(result.username).toEqual(process.env.MANGADEX_USERNAME)
  })

  it('should get user data from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.user.getUser(1)

    const validateResult = userSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user uploaded chapters', async () => {
    const client = await getClient()
    const result = await client.user.getUserChapters(1)

    const validateResult = partialChaptersSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user uploaded chapters from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.user.getUserChapters(1)

    const validateResult = partialChaptersSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user followed manga', async () => {
    const client = await getClient()
    const result = await client.user.getUserFollowedManga('me')

    const validateResult = userFollowedPartialMangaSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user followed updates', async () => {
    const client = await getClient()
    const result = await client.user.getUserFollowedUpdates('me')

    const validateResult = userFollowedUpdatesSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user personal data for manga', async () => {
    const client = await getClient()
    const result = await client.user.getUserManga('me', 18331)

    const validateResult = userMangaSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user personal manga rating', async () => {
    const client = await getClient()
    const result = await client.user.getUserRatings('me')

    const validateResult = userMangaRatingSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user settings', async () => {
    const client = await getClient()
    const result = await client.user.getUserSettings('me')

    const validateResult = userSettingsSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })
})
