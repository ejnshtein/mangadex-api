import { ApiBase } from './base'
import { Agent } from '../Agent'
import { ApiResponseError } from '../lib/error'
import { Session } from '../../types/agent'
import { ApiResponse } from '../../types/response'
import {
  getBearerRefreshTokenHeader,
  getBearerTokenHeader
} from '../lib/get-bearer-auth'

export type CheckTokenResponse = {
  ok: 'ok' | 'error'
  isAuthenticated: boolean
  roles: string[]
  permissions: string[]
}

export class AuthResolver extends ApiBase {
  async login(username: string, password: string): Promise<boolean> {
    if (!username || !password) {
      throw new Error('Not enough login info.')
    }
    const { data } = await Agent.call<ApiResponse<{ token: Session }>>(
      'auth/login',
      {
        method: 'POST'
      },
      {
        username,
        password
      }
    )

    if (data.result === 'error') {
      throw new ApiResponseError(data.errors[0])
    }

    this.agent.setSession(data.token)

    return true
  }

  static async login(username: string, password: string): Promise<Session> {
    if (!username || !password) {
      throw new Error('Not enough login info.')
    }
    const { data } = await Agent.call<ApiResponse<{ token: Session }>>(
      'auth/login',
      {
        method: 'POST'
      },
      {
        username,
        password
      }
    )

    if (data.result === 'error') {
      throw new ApiResponseError(data.errors[0])
    }

    return data.token
  }

  async logout(): Promise<boolean> {
    const { data } = await this.agent.call<ApiResponse<Record<string, never>>>(
      'auth/logout',
      {
        method: 'POST'
      }
    )

    if (data.result === 'error') {
      throw new ApiResponseError(data.errors[0])
    }

    this.agent.session = null

    return true
  }

  static async logout(session: Session): Promise<boolean> {
    const { data } = await Agent.call<ApiResponse<Record<string, never>>>(
      'auth/logout',
      {
        method: 'POST',
        headers: getBearerTokenHeader(session)
      }
    )

    if (data.result === 'error') {
      throw new ApiResponseError(data.errors[0])
    }

    return true
  }

  async refresh(): Promise<Session> {
    const { data } = await this.agent.call<
      ApiResponse<{ token: Session; message: string }>
    >('auth/refresh', {
      method: 'POST'
    })

    if (data.result === 'error') {
      throw new ApiResponseError(data.errors[0])
    }

    return data.token
  }

  static async refresh(session: Session): Promise<Session> {
    const { data } = await Agent.call<
      ApiResponse<{ token: Session; message: string }>
    >('auth/refresh', {
      method: 'POST',
      headers: getBearerRefreshTokenHeader(session)
    })

    if (data.result === 'error') {
      throw new ApiResponseError(data.errors[0])
    }

    return data.token
  }

  static async checkToken(session: Session): Promise<CheckTokenResponse> {
    const { data } = await Agent.call<ApiResponse<CheckTokenResponse>>(
      'auth/check',
      {
        headers: getBearerTokenHeader(session)
      }
    )

    if (data.result === 'error') {
      throw new ApiResponseError(data.errors[0])
    }

    return data
  }
}
