import { RequestOptions } from 'smol-request'

export interface Session {
  session?: string
  refresh?: string
}

export interface AgentOptions {
  apiHost?: string
  session?: Session
}

export interface MRequestOptions<T = 'json'> extends RequestOptions<T> {
  baseUrl?: string
}
