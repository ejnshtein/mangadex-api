import { ApiBase } from './base'
import { Agent } from '../Agent'
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
  async login(
    username: string,
    password: string
  ): Promise<ApiResponse<{ token: Session }>> {
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
      return data
    }

    this.agent.setSession(data.token)

    return data
  }

  static async login(
    username: string,
    password: string
  ): Promise<ApiResponse<{ token: Session }>> {
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

    return data
  }

  async logout(): Promise<ApiResponse<Record<string, never>>> {
    const { data } = await this.agent.call<ApiResponse<Record<string, never>>>(
      'auth/logout',
      {
        method: 'POST'
      }
    )

    if (data.result === 'error') {
      return data
    }

    this.agent.session = null

    return data
  }

  static async logout(
    session: Session
  ): Promise<ApiResponse<Record<string, never>>> {
    const { data } = await Agent.call<ApiResponse<Record<string, never>>>(
      'auth/logout',
      {
        method: 'POST',
        headers: getBearerTokenHeader(session)
      }
    )

    return data
  }

  async refresh(): Promise<ApiResponse<{ token: Session; message: string }>> {
    const { data } = await this.agent.call<
      ApiResponse<{ token: Session; message: string }>
    >('auth/refresh', {
      method: 'POST'
    })

    return data
  }

  static async refresh(
    session: Session
  ): Promise<ApiResponse<{ token: Session; message: string }>> {
    const { data } = await Agent.call<
      ApiResponse<{ token: Session; message: string }>
    >('auth/refresh', {
      method: 'POST',
      headers: getBearerRefreshTokenHeader(session)
    })

    return data
  }

  static async checkToken(
    session: Session
  ): Promise<ApiResponse<CheckTokenResponse>> {
    const { data } = await Agent.call<ApiResponse<CheckTokenResponse>>(
      'auth/check',
      {
        headers: getBearerTokenHeader(session)
      }
    )

    return data
  }
}
