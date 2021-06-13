import { ApiBase } from '../api'
import { ApiResponse } from '../response'

export type LegacyType = 'group' | 'manga' | 'chapter' | 'tag'

export interface MappingIdAttributes {
  type: LegacyType
  legacyId: number
  newId: string
}

export type MappingId = ApiBase<'mapping_id', MappingIdAttributes>
export type MappingIdResponse = ApiResponse<{ data: MappingId }>
