/* eslint-disable @typescript-eslint/no-empty-interface */
import { ApiBase } from '../api'
import { AttributeBase } from '../base'
import { ApiResponse, ApiResponseList } from '../response'
import { User } from './user'

export interface OptionalGroupAttributes {
  // ?
}

export interface GroupAttributes extends AttributeBase {
  name: string
  leader: User
  members: User[]
}

export type GroupAttributesExtended = GroupAttributes & OptionalGroupAttributes

export type Group = ApiBase<'scanlation_group', GroupAttributes>
export type GroupResponse = ApiResponse<{
  data: Group
}>

export type GroupExtended = ApiBase<'scanlation_group', GroupAttributesExtended>
export type GroupExtendedResponse = ApiResponse<{
  data: GroupExtended
}>

export type GroupList = ApiResponseList<{ data: Group }>
