export interface AttributeBase {
  createdAt: string
  updatedAt: string
  version: number
}

export type AttributeBaseDateless = Omit<
  AttributeBase,
  'createdAt' | 'updatedAt'
>
