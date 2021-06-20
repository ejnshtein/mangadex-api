export interface AttributeBase {
  createdAt: string
  updatedAt: string
  version: number
}

export type AttributeBaseDateless = Omit<
  AttributeBase,
  'createdAt' | 'updatedAt'
>

export type SearchOrder = 'asc' | 'desc'

export type TagsMode = 'AND' | 'OR'
