import { RequestOptions } from 'smol-request'

export interface Session {
  session?: string
  refreshToken?: string
}

export interface AgentOptions {
  apiHost?: string
  session?: string
  refreshToken?: string
  getCredentials?: Session | (() => Promise<Session>) | (() => Session)
  loginCredentials?: Session | (() => Promise<Session>) | (() => Session)
}

export interface MRequestOptions<T = 'json'> extends RequestOptions<T> {
  baseUrl?: string
}
