import { ApiBase } from './api'
import { AttributeBaseDateless } from './base'

export interface UserAttributes extends AttributeBaseDateless {
  username: string
}

export type User = ApiBase<'user', UserAttributes>
