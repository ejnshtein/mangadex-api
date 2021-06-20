import { Agent } from '../Agent'
import { ApiBase } from './base'
import {
  UpdateEmailResponse,
  UpdatePasswordResponse,
  UserFollowedGroupsResponse,
  UserFollowedMangaResponse,
  UserFollowedUsersResponse,
  UserResponse,
  UsersResponse
} from '../../types/data-types/user'
import { SearchOrder } from '../../types/base'
import { formatQueryParams } from '../lib/format-query-params'

export type SearchUsersOptions = Partial<{
  /**
   * @default 10
   */
  limit: number

  offset: number

  ids: string[]

  username: string

  order: Record<'username', SearchOrder>
}>

export class UserResolver extends ApiBase {
  /**
   * User list
   */
  async search(options: SearchUsersOptions): Promise<UsersResponse> {
    const { data } = await this.agent.call<UsersResponse>('user', {
      params: formatQueryParams(options)
    })

    return data
  }

  /**
   * Get a user
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  async getUser(userId: string): Promise<UserResponse> {
    const { data: user } = await this.agent.call<UserResponse>(`user/${userId}`)

    return user
  }

  /**
   * Get a user
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  static async getUser(userId: string): Promise<UserResponse> {
    const { data: user } = await Agent.call<UserResponse>(`user/${userId}`)

    return user
  }

  /**
   * Logged User details
   */
  async getMe(): Promise<UserResponse> {
    const user = await this.getUser('me')

    return user
  }

  /**
   * Get logged User followed User list
   */
  async getUserFollowedUsers(): Promise<UserFollowedUsersResponse> {
    const { data } = await this.agent.call<UserFollowedUsersResponse>(
      'user/follows/user'
    )

    return data
  }

  /**
   * Get logged User followed Manga list
   */
  async getUserFollowedManga(): Promise<UserFollowedMangaResponse> {
    const { data } = await this.agent.call<UserFollowedMangaResponse>(
      'user/follows/manga'
    )

    return data
  }

  /**
   * Get logged User followed Groups
   */
  async getUserFollowedGroups(): Promise<UserFollowedGroupsResponse> {
    const { data } = await this.agent.call<UserFollowedGroupsResponse>(
      'user/follows/group'
    )

    return data
  }

  /**
   * Update User password
   * @param oldPassword 8-1024 characters
   * @param newPassword 8-1024 characters
   */
  async updatePassword(
    oldPassword: string,
    newPassword: string
  ): Promise<UpdatePasswordResponse> {
    const { data } = await this.agent.call<UpdatePasswordResponse>(
      'user/password',
      {
        method: 'POST'
      },
      {
        oldPassword,
        newPassword
      }
    )

    return data
  }

  /**
   * Update User email
   */
  async updateEmail(email: string): Promise<UpdateEmailResponse> {
    const { data } = await this.agent.call<UpdateEmailResponse>(
      'user/email',
      {
        method: 'POST'
      },
      {
        email
      }
    )

    return data
  }

  // /**
  //  * Get partial information about the chapters uploaded by the user
  //  * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
  //  * @param options Request options
  //  */
  // async getUserChapters(
  //   userId: number | string,
  //   options: MRequestOptions<'json'> & {
  //     params?: IncludeParams
  //   } = {}
  // ): Promise<PartialChapters> {
  //   const result = await this.agent.callApi<PartialChapters>(
  //     `user/${userId}/chapters`,
  //     options
  //   )

  //   return result
  // }

  // /**
  //  * Get partial information about the chapters uploaded by the user
  //  * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
  //  * @param options Request options
  //  */
  // static async getUserChapters(
  //   userId: number | string,
  //   options: MRequestOptions<'json'> & {
  //     params?: IncludeParams
  //   } = {}
  // ): Promise<PartialChapters> {
  //   const result = await Agent.callApi<PartialChapters>(
  //     `user/${userId}/chapters`,
  //     options
  //   )

  //   return result
  // }

  // /**
  //  * (Authorization required) Get a user's followed manga and personal data for them.
  //  * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
  //  * @param options Request options
  //  */
  // async getUserFollowedManga(
  //   userId: number | string,
  //   options: MRequestOptions<'json'> = {}
  // ): Promise<UserManga[]> {
  //   const result = await this.agent.callApi<UserManga[]>(
  //     `user/${userId}/followed-manga`,
  //     options
  //   )

  //   return result
  // }

  // /**
  //  * (Authorization required) Get the latest uploaded chapters for the manga that the user has followed, as well as basic related manga information.
  //  * Ordered by timestamp descending (the datetime when the chapter is available).
  //  * Limit 100 chapters per page.
  //  * Note that the results are automatically filtered by the authorized user's chapter language filter setting.
  //  * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
  //  * @param options Request options
  //  */
  // async getUserFollowedUpdates(
  //   userId: number | string,
  //   options: MRequestOptions<'json'> & {
  //     params?: GetUserFollowedUpdatesParams
  //   } = {}
  // ): Promise<FormattedFollowedUpdates> {
  //   const result = await this.agent.callApi<FollowedUpdates>(
  //     `user/${userId}/followed-updates`,
  //     options
  //   )

  //   return {
  //     ...result,
  //     manga: Composer.formatTypeMapToArray(result.manga)
  //   }
  // }

  // /**
  //  * Get a user's personal data for any given manga
  //  * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
  //  * @param mangaId Manga id
  //  * @param options Request options
  //  */
  // async getUserManga(
  //   userId: number | string,
  //   mangaId: number,
  //   options: MRequestOptions<'json'> = {}
  // ): Promise<UserManga> {
  //   const result = await this.agent.callApi<UserManga>(
  //     `user/${userId}/manga/${mangaId}`,
  //     options
  //   )

  //   return result
  // }

  // /**
  //  * (Authorization required) Get a user's manga ratings
  //  * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
  //  * @param options Request options
  //  */
  // async getUserRatings(
  //   userId: number | string,
  //   options: MRequestOptions<'json'> = {}
  // ): Promise<UserMangaRating[]> {
  //   const result = await this.agent.callApi<UserMangaRating[]>(
  //     `user/${userId}/ratings`,
  //     options
  //   )

  //   return result
  // }

  // /**
  //  * (Authorization required) Get a user's website settings.
  //  * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
  //  * @param options Request options
  //  */
  // async getUserSettings(
  //   userId: number | string,
  //   options: MRequestOptions<'json'> = {}
  // ): Promise<UserSettings> {
  //   const result = await this.agent.callApi<UserSettings>(
  //     `user/${userId}/settings`,
  //     options
  //   )

  //   return result
  // }

  // /**
  //  * (Authorization required) Set or unset chapter read markers.
  //  * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
  //  * @param chapters List of chapter IDs to set or unset. Max 100 items.
  //  * @param read Set or unset the chapter as read. Boolean, default true.
  //  * @param options Request options
  //  */
  // async setUserChapterRead(
  //   userId: number | string,
  //   chapters: number[],
  //   read = true,
  //   options: MRequestOptions<'json'> = {}
  // ): Promise<ReadChaptersStatus> {
  //   const result = await this.agent.callApi<ReadChaptersStatus>(
  //     `user/${userId}/marker`,
  //     deepmerge(options, {
  //       method: 'POST'
  //     }),
  //     {
  //       chapters,
  //       read
  //     }
  //   )

  //   return result
  // }

  // /**
  //  * Get user info
  //  * @param options Request options
  //  */
  // async getMe(options: MRequestOptions<'json'> = {}): Promise<User> {
  //   return this.getUser('me', options)
  // }

  // async setHomepageSettings(
  //   args: SetHomePageSettingsArguments,
  //   options: MRequestOptions<'headers'> = {}
  // ): Promise<boolean> {
  //   await this.agent.callAjaxAction(
  //     {
  //       function: 'homepage_settings'
  //     },
  //     deepmerge(options, {
  //       method: 'POST'
  //     }),
  //     {
  //       theme_id: args.themeId ?? 0,
  //       display_lang_id: args.displayLangId ?? 1,
  //       hentai_mode: args.hentaiMode ?? 0
  //     }
  //   )

  //   return true
  // }
}
