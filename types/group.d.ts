import { ApiBase, ApiResponseWithRelationships } from './api'
import { AttributeBase } from './base'
import { User } from './user'

export interface GroupAttributes extends AttributeBase {
  name: string
  leader: User
  members: User[]
}

export type Group = ApiBase<'scanlation_group', GroupAttributes>

export type GroupResponse<W extends boolean = false> =
  ApiResponseWithRelationships<
    W,
    {
      scanlation_group: Group
    },
    {
      user?: User[]
    }
  >
