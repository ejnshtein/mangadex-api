import { request, RequestResult, ResponseTypeMap } from 'smol-request'
import fs from 'fs'
import { join } from 'path'
import { AgentOptions, MRequestOptions, Session } from '../types/agent'
import { deepmerge } from './lib/deepmerge'
import { AuthResolver } from './api/auth'
import { getBearerTokenHeader } from './lib/get-bearer-auth'

const pkg = JSON.parse(
  fs.readFileSync(join(__dirname, '..', 'package.json'), 'utf-8')
)

export const DefaultOptions = {
  apiHost: 'https://api.mangadex.org'
}

export class Agent {
  public session?: Session
  public apiHost: string

  constructor({
    apiHost = 'https://api.mangadex.org',
    session
  }: AgentOptions = {}) {
    this.apiHost = apiHost
    this.session = session
  }

  setSession(session: Session): void {
    this.session = session
  }

  async saveSession(path: string): Promise<boolean> {
    return Agent.saveSession(path, this.session)
  }

  static async saveSession(path: string, session: Session): Promise<boolean> {
    await fs.promises.writeFile(
      path,
      `${session.session}\n${session.refresh}`,
      'utf-8'
    )
    return true
  }

  async loginWithSession(path: string): Promise<boolean> {
    const file = await fs.promises.readFile(path, 'utf8')

    const [session, refresh] = file.split('\n')

    if (!session || !refresh) {
      throw new Error(
        `Lost "${(!session && 'session') || (!refresh && 'refresh')}"`
      )
    }

    await AuthResolver.checkToken({ session, refresh })

    this.session = {
      session,
      refresh
    }

    return true
  }

  async call<K>(
    url: string,
    options: MRequestOptions = {},
    body?: Record<string, unknown>
  ): Promise<RequestResult<ResponseTypeMap<K>['json']>> {
    const result = await Agent.call<K>(
      url,
      deepmerge(
        {
          baseUrl: this.apiHost,
          headers: getBearerTokenHeader(this.session)
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
}
