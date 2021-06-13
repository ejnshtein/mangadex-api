import { Relationship } from './data-types/relationship'

export interface ResponseError {
  id: string
  status: number
  title: string
  detail: string
  context?: Record<string, string>
}

export type ApiResponse<T extends Record<'data' | string, string | unknown>> = {
  result: 'error' | 'ok'
  errors: ResponseError[]
  relationships?: Relationship[]
} & T

export interface ApiResponseList<
  T extends Record<'data' | string, string | unknown>
> {
  results: ApiResponse<T>[]
  limit: number
  offset: number
  total: number
}
