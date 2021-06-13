import { ApiBase } from '../api'
import { AttributeBaseDateless } from '../base'
import { ApiResponse } from '../response'

export interface UserAttributes extends AttributeBaseDateless {
  username: string
}

export type User = ApiBase<'user', UserAttributes>
export type UserResponse = ApiResponse<{
  data: User
}>
