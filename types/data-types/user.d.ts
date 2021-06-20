import { ApiBase } from '../api'
import { AttributeBaseDateless } from '../base'
import { ApiResponse, ApiResponseList } from '../response'
import { Group } from './group'
import { Manga } from './manga'

export interface UserAttributes extends AttributeBaseDateless {
  username: string
}

export type User = ApiBase<'user', UserAttributes>
export type UserResponse = ApiResponse<{
  data: User
}>

export type UsersResponse = ApiResponseList<{
  data: User
}>

export type UserFollowedUsersResponse = ApiResponseList<{
  data: User
}>

export type UserFollowedMangaResponse = ApiResponseList<{
  data: Manga
}>

export type UserFollowedGroupsResponse = ApiResponseList<{
  data: Group
}>

export type UpdatePasswordResponse = ApiResponse<Record<string, never>>
export type UpdateEmailResponse = ApiResponse<Record<string, never>>
