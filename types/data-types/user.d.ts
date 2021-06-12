import { ApiBase } from '../api'
import { AttributeBaseDateless } from '../base'
import { SuccessfulResponse } from '../response'

export interface UserAttributes extends AttributeBaseDateless {
  username: string
}

export type User = ApiBase<'user', UserAttributes>
export type UserResponse = SuccessfulResponse<{
  data: User
}>
