export interface ApiBase<Name, T> {
  id: string
  type: Name
  attributes: T
}

export type ApiResponseWithRelationships<
  WithRelationShips extends boolean,
  T,
  K
> = T & (WithRelationShips extends true ? K : never)
