import { User, UserResponse } from '../../types/data-types/user'
import { ApiResponse } from '../../types/response'
import { Agent } from '../Agent'
import { ApiResponseError } from '../lib/error'
import { ApiBase } from './base'

export class AccountResolver extends ApiBase {
  static async activate(code: string): Promise<boolean> {
    const { data } = await Agent.call<ApiResponse<Record<string, never>>>(
      `account/activate/${code}`
    )

    if (data.result === 'error') {
      throw new ApiResponseError(data.errors[0])
    }

    return true
  }

  /**
   * @param username 1-64 characters
   * @param password 8-1024 characters
   * @param email
   */
  static async createAccount(
    username: string,
    password: string,
    email: string
  ): Promise<UserResponse> {
    const { data: user } = await Agent.call<ApiResponse<{ data: User }>>(
      'account/create',
      {
        method: 'POST'
      },
      {
        username,
        password,
        email
      }
    )

    if (user.result === 'error') {
      return user
    }

    return user
  }

  static async resendActivation(
    email: string
  ): Promise<ApiResponse<Record<string, never>>> {
    const { data } = await Agent.call<ApiResponse<Record<string, never>>>(
      'account/activate/resend',
      {
        method: 'POST'
      },
      {
        email
      }
    )

    return data
  }

  static async recover(
    email: string
  ): Promise<ApiResponse<Record<string, never>>> {
    const { data } = await Agent.call<ApiResponse<Record<string, never>>>(
      'account/recover',
      { method: 'POST' },
      { email }
    )

    return data
  }

  static async completeRecover(
    code: string,
    newPassword: string
  ): Promise<ApiResponse<Record<string, never>>> {
    const { data } = await Agent.call<ApiResponse<Record<string, never>>>(
      `account/recover/${code}`,
      {
        method: 'POST'
      },
      { newPassword }
    )

    return data
  }
}
