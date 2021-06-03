import { request, RequestResult, ResponseTypeMap } from 'smol-request'
import fs from 'fs'
// import cheerio from 'cheerio'
// import * as multipart from './lib/multipart'
import { AgentOptions, MRequestOptions } from '../types/agent'
import { deepmerge } from './lib/deepmerge'
// import { MangadexApiResponse, User } from '../types/mangadex'
import { join } from 'path'
import { DefaultOptions } from './lib/options'
// import { Auth } from './api/autSessioh'

const pkg = JSON.parse(
  fs.readFileSync(join(__dirname, '..', 'package.json'), 'utf-8')
)

export class Agent {
  public session?: string
  public refreshToken?: string
  public apiHost: string

  constructor({
    apiHost = 'https://api.mangadex.org',
    session,
    refreshToken
  }: AgentOptions = {}) {
    this.apiHost = apiHost
    this.session = session
    this.refreshToken = refreshToken
  }

  // async saveSession(path: string): Promise<boolean> {
  //   return Agent.saveSession(path, {
  //     sessionId: this.sessionId,
  //     sessionExpiration: this.sessionExpiration,
  //     persistentId: this.persistentId
  //   })
  // }

  // static async saveSession(path: string, session: Session): Promise<boolean> {
  //   await fs.promises.writeFile(
  //     path,
  //     `${session.session}\n${session.refreshToken}${
  //       session.persistentId ? `\n${session.persistentId}` : ''
  //     }`,
  //     'utf8'
  //   )
  //   return true
  // }

  async call<K>(
    url: string,
    options: MRequestOptions = {},
    body?: Record<string, unknown>
  ): Promise<RequestResult<ResponseTypeMap<K>['json']>> {
    const result = await Agent.call<K>(
      url,
      deepmerge(
        {
          baseUrl: this.apiHost
        },
        options
      ),
      body
    )

    return result
  }

  static async call<T>(
    url: string,
    options: MRequestOptions = {},
    body?: Record<string, unknown>
  ): Promise<RequestResult<ResponseTypeMap<T>['json']>> {
    const requestUrl = `${options.baseUrl || DefaultOptions.apiHost}${
      !(url.startsWith('/') && options.baseUrl.endsWith('/')) && '/'
    }${url}`

    const result = await request<T, 'json'>(
      requestUrl,
      deepmerge(
        {
          responseType: 'json',
          method: 'GET',
          headers: {
            'User-Agent': `mangadex-api/${pkg.version}`,
            ...(body
              ? {
                  'Content-Type': 'application/json'
                }
              : {})
          }
        },
        options
      ),
      body ? JSON.stringify(body) : undefined
    )

    return result
  }

  // async callApi<K>(
  //   url: string,
  //   options: MRequestOptions<'json'> = {},
  //   body?: Record<string, unknown>
  // ): Promise<K> {
  //   const response = await this.call<MangadexApiResponse<K>, 'json'>(
  //     url,
  //     deepmerge(options, {
  //       baseUrl: this.apiHost
  //     }),
  //     body
  //   )

  //   if (response.status === 'error') {
  //     throw new ApiError({
  //       message: response.message,
  //       code: response.code,
  //       url
  //     })
  //   }

  //   return response.data
  // }

  // static async callApi<T>(
  //   url: string,
  //   options: MRequestOptions<'json'> = {},
  //   body?: Record<string, unknown>
  // ): Promise<T> {
  //   const { data: response } = await Agent.call<MangadexApiResponse<T>, 'json'>(
  //     url,
  //     deepmerge(
  //       {
  //         baseUrl: DefaultOptions.apiHost
  //       },
  //       options,
  //       {
  //         responseType: 'json'
  //       }
  //     ),
  //     body
  //   )

  //   if (response.status === 'error') {
  //     throw new ApiError({
  //       message: response.message,
  //       code: response.code,
  //       url
  //     })
  //   }

  //   return response.data
  // }
}
