import { ApiBase } from '../api'
import { AttributeBase, AttributeBaseDateless } from '../base'
import { ApiResponse } from '../response'
import { TranslatedField } from './language'

export interface TagAttributes extends AttributeBaseDateless {
  name: TranslatedField
  description: TranslatedField[]
  group: string
}

export type Tag = ApiBase<'tag', TagAttributes>
export type TagResponse = ApiResponse<{
  data: Tag & AttributeBase
}>
