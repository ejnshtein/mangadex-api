import { ApiBase } from '../api'
import { AttributeBase } from '../base'
import { SuccessfulResponse } from '../response'
import { TranslatedField } from './language'

export interface TagAttributes extends AttributeBase {
  name: TranslatedField
  description: TranslatedField[]
  group: string
}

export type Tag = ApiBase<'tag', TagAttributes>
export type TagResponse = SuccessfulResponse<{
  data: Tag
}>
