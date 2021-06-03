import { ApiBase } from './base'
import { FailureResponse } from '../../types/response'
import { ApiError, ApiResponseError } from 'src/lib/error'
import { Agent } from 'src/Agent'

export interface SessionWithRefreshToken {
  session: string
  refresh: string
}

export interface CheckTokenResponse {
  ok: 'ok'
  isAuthenticated: boolean
  roles: string[]
  permissions: string[]
}

export interface LoginSuccessfulResponse {
  result: 'ok'
  token: SessionWithRefreshToken
}

export type LoginApiResponseResult = LoginSuccessfulResponse | FailureResponse

export class Auth extends ApiBase {
  async login(
    username: string,
    password: string
  ): Promise<SessionWithRefreshToken> {
    return Auth.login(username, password)
  }

  static async login(
    username: string,
    password: string
  ): Promise<SessionWithRefreshToken> {
    if (!username || !password) {
      throw new Error('Not enough login info.')
    }
    const {} = await Agent.call<LoginApiResponseResult>('auth/login', {})

    if (data.result === 'error') {
      throw new ApiResponseError(data.errors[0])
    }

    return data.token
  }

  async logout(options: MRequestOptions<'headers'> = {}): Promise<boolean> {
    return Agent.logout(
      {
        session: this.session
      },
      options
    )
  }

  static async logout(
    session: Session,
    options: MRequestOptions<'headers'> = {}
  ): Promise<boolean> {
    let Cookie = ''

    if (session.sessionId) {
      Cookie += `mangadex_session=${session.sessionId}; `
      if (session.persistentId) {
        Cookie += `mangadex_rememberme_token=${session.persistentId}; `
      }
    }

    const result = await Agent.callAjaxAction(
      { function: 'logout' },
      deepmerge(options, {
        headers: { Cookie },
        method: 'POST'
      })
    )

    if (result.status === 200) {
      return true
    }

    throw new ApiError({
      code: result.status,
      message: `Unexpected status code: ${result.status}`,
      url: `ajax/actions.ajax.php?function=logout`
    })
  }
}
