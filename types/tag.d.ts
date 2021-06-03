import { AttributeBase } from './base'
import { TranslatedField } from './language'

export interface TagAttributes extends AttributeBase {
  name: TranslatedField
  description: TranslatedField[]
  group: string
}

export interface Tag {
  id: string
  type: 'tag'
  attributes: TagAttributes
}
