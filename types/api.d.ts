export interface ApiBase<Name, T> {
  id: string
  type: Name
  attributes: T
}
