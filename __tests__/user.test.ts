import { getClient, getInstanceClient } from '../jest/get-test-client'
import { userResponseSchema } from '../jest/schema/user'
import {
  userFollowedGroupsResponseSchema,
  userFollowedMangaResponseSchema,
  userFollowedUsersResponseSchema,
  usersResponseSchema
} from '../jest/schema/user-extended'
const userId = 'c07bd2d6-5881-4b3c-84cf-d868b307c23f'

describe('user api', () => {
  it('should get me', async () => {
    const client = await getClient()
    const result = await client.user.getMe()

    expect(result.result).toEqual('ok')

    const validateResult = userResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
    expect(result.data.attributes.username).toEqual(
      process.env.MANGADEX_USERNAME
    )
  })

  it('should get user data from md instance', async () => {
    const client = getInstanceClient()
    const result = await client.user.getUser(userId)

    expect(result.result).toEqual('ok')

    const validateResult = userResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user followed users list', async () => {
    const client = await getClient()
    const result = await client.user.getUserFollowedUsers()

    const validateResult = userFollowedUsersResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user followed manga list', async () => {
    const client = await getClient()
    const result = await client.user.getUserFollowedManga()

    const validateResult = userFollowedMangaResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get user followed group list', async () => {
    const client = await getClient()
    const result = await client.user.getUserFollowedGroups()

    const validateResult = userFollowedGroupsResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  it('should get users list', async () => {
    const client = await getClient()
    const result = await client.user.search({
      username: process.env.MANGADEX_USERNAME
    })

    const validateResult = usersResponseSchema.validate(result)

    expect(validateResult.error).toEqual(undefined)
  })

  //   it('should get user uploaded chapters from md instance', async () => {
  //     const client = getInstanceClient()
  //     const result = await client.user.getUserChapters(1)

  //     const validateResult = partialChaptersSchema.validate(result)

  //     expect(validateResult.error).toEqual(undefined)
  //   })

  //   it('should get user followed manga', async () => {
  //     const client = await getClient()
  //     const result = await client.user.getUserFollowedManga('me')

  //     const validateResult = userFollowedPartialMangaSchema.validate(result)

  //     expect(validateResult.error).toEqual(undefined)
  //   })

  //   it('should get user followed updates', async () => {
  //     const client = await getClient()
  //     const result = await client.user.getUserFollowedUpdates('me')

  //     const validateResult = userFollowedUpdatesSchema.validate(result)

  //     expect(validateResult.error).toEqual(undefined)
  //   })

  //   it('should get user personal data for manga', async () => {
  //     const client = await getClient()
  //     const result = await client.user.getUserManga('me', 18331)

  //     const validateResult = userMangaSchema.validate(result)

  //     expect(validateResult.error).toEqual(undefined)
  //   })

  //   it('should get user personal manga rating', async () => {
  //     const client = await getClient()
  //     const result = await client.user.getUserRatings('me')

  //     const validateResult = userMangaRatingSchema.validate(result)

  //     expect(validateResult.error).toEqual(undefined)
  //   })

  //   it('should get user settings', async () => {
  //     const client = await getClient()
  //     const result = await client.user.getUserSettings('me')

  //     const validateResult = userSettingsSchema.validate(result)

  //     expect(validateResult.error).toEqual(undefined)
  //   })
})
