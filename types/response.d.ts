import { Relationship } from './relationship'

export interface SuccessfulResponse<T> {
  result: 'ok'
  data: T
  relationships?: Relationship[]
}

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

export type ApiResponseResult<T> = SuccessfulResponse<T> | FailureResponse

export interface ApiResponse<T> {
  results: ApiResponseResult<T>
  limit: number
  offset: number
  total: number
}
