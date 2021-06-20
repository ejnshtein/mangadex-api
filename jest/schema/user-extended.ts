import { apiResponseList } from './base'
import { groupSchema } from './group'
import { mangaSchema } from './manga'
import { userSchema } from './user'

export const usersResponseSchema = apiResponseList({
  data: userSchema
})

export const userFollowedUsersResponseSchema = apiResponseList({
  data: userSchema
})
export const userFollowedMangaResponseSchema = apiResponseList({
  data: mangaSchema
})
export const userFollowedGroupsResponseSchema = apiResponseList({
  data: groupSchema
})
