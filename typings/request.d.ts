import { Readable } from 'stream'
import http from 'http'
import qs from 'querystring'

export interface RequestOptions extends http.RequestOptions {
  params?: { [string]: string },
  headers?: Headers,
  json?: Boolean,
  responseType?: 'stream'
}

export interface RequestResult {
  data: Readable | String | Object
  headers: Headers,
  status: Number,
  statusText: String
}

export type Request = (
  url: string,
  options: RequestOptions,
  formData: qs.ParsedUrlQueryInput
) => Promise<RequestResult>
