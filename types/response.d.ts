import { Relationship } from './data-types/relationship'

export type SuccessfulResponse<
  T extends Record<'data' | string, string | unknown> = { data: unknown }
> = {
  result: 'ok'
  relationships?: Relationship[]
} & T

export interface ResponseError {
  id: string
  status: number
  title: string
  detail: string
  context?: Record<string, string>
}

export interface FailureResponse {
  result: 'error'
  errors: ResponseError[]
}

export type ApiResponse<T extends Record<'data' | string, string | unknown>> =
  | SuccessfulResponse<T>
  | FailureResponse

export interface ApiResponseList<
  T extends Record<'data' | string, string | unknown>
> {
  results: ApiResponse<T>[]
  limit: number
  offset: number
  total: number
}
