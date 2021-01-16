import { Agent } from '../Agent'
import { MRequestOptions } from '../../types/agent'
import {
  FollowedUpdates,
  FormattedFollowedUpdates,
  PartialChapters,
  ReadChaptersStatus,
  SetHomePageSettingsArguments,
  User,
  UserManga,
  UserMangaRating,
  UserSettings
} from '../../types/mangadex'
import { ApiBase, IncludeParams, PartialChaptersParams } from './base'
import { deepmerge } from '../lib/deepmerge'
import { Composer } from '../Composer'

export interface GetUserFollowedUpdatesParams {
  /**
   * Include delayed chapters in the results.
   * Default `false`
   */
  delayed?: boolean

  /**
   * Filter results based on whether the titles are marked as hentai.
   * 0 = Hide H, 1 = Show all, 2 = Show H only. Integer, default 0.
   */
  hentai?: number

  /**
   * The current page of the paginated results.
   * Integer, default 1.
   */
  p?: number

  /**
   * Filter the results by the follow type ID (i.e. 1 = Reading, 2 = Completed etc). Use 0 to remove filtering.
   * Integer, default 0.
   */
  type?: number
}

export interface SetUserChapterReadParams {
  /**
   * Set or unset the chapter as read.
   * Boolean, default true.
   */
  read?: boolean
}

export class UserResolver extends ApiBase {
  /**
   * Get a user
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  async getUser(
    userId: number | string,
    options: MRequestOptions<'json'> & {
      params?: PartialChaptersParams
    } = {}
  ): Promise<User> {
    const result = await this.agent.callApi<User>(`user/${userId}`, options)

    return result
  }

  /**
   * Get a user
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  static async getUser(
    userId: number | string,
    options: MRequestOptions<'json'> & {
      params?: PartialChaptersParams
    } = {}
  ): Promise<User> {
    const result = await Agent.callApi<User>(`user/${userId}`, options)

    return result
  }

  /**
   * Get partial information about the chapters uploaded by the user
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  async getUserChapters(
    userId: number | string,
    options: MRequestOptions<'json'> & {
      params?: IncludeParams
    } = {}
  ): Promise<PartialChapters> {
    const result = await this.agent.callApi<PartialChapters>(
      `user/${userId}/chapters`,
      options
    )

    return result
  }

  /**
   * Get partial information about the chapters uploaded by the user
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  static async getUserChapters(
    userId: number | string,
    options: MRequestOptions<'json'> & {
      params?: IncludeParams
    } = {}
  ): Promise<PartialChapters> {
    const result = await Agent.callApi<PartialChapters>(
      `user/${userId}/chapters`,
      options
    )

    return result
  }

  /**
   * (Authorization required) Get a user's followed manga and personal data for them.
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  async getUserFollowedManga(
    userId: number | string,
    options: MRequestOptions<'json'> = {}
  ): Promise<UserManga[]> {
    const result = await this.agent.callApi<UserManga[]>(
      `user/${userId}/followed-manga`,
      options
    )

    return result
  }

  /**
   * (Authorization required) Get the latest uploaded chapters for the manga that the user has followed, as well as basic related manga information.
   * Ordered by timestamp descending (the datetime when the chapter is available).
   * Limit 100 chapters per page.
   * Note that the results are automatically filtered by the authorized user's chapter language filter setting.
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  async getUserFollowedUpdates(
    userId: number | string,
    options: MRequestOptions<'json'> & {
      params?: GetUserFollowedUpdatesParams
    } = {}
  ): Promise<FormattedFollowedUpdates> {
    const result = await this.agent.callApi<FollowedUpdates>(
      `user/${userId}/followed-updates`,
      options
    )

    return {
      ...result,
      manga: Composer.formatTypeMapToArray(result.manga)
    }
  }

  /**
   * Get a user's personal data for any given manga
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param mangaId Manga id
   * @param options Request options
   */
  async getUserManga(
    userId: number | string,
    mangaId: number,
    options: MRequestOptions<'json'> = {}
  ): Promise<UserManga> {
    const result = await this.agent.callApi<UserManga>(
      `user/${userId}/manga/${mangaId}`,
      options
    )

    return result
  }

  /**
   * (Authorization required) Get a user's manga ratings
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  async getUserRatings(
    userId: number | string,
    options: MRequestOptions<'json'> = {}
  ): Promise<UserMangaRating[]> {
    const result = await this.agent.callApi<UserMangaRating[]>(
      `user/${userId}/ratings`,
      options
    )

    return result
  }

  /**
   * (Authorization required) Get a user's website settings.
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param options Request options
   */
  async getUserSettings(
    userId: number | string,
    options: MRequestOptions<'json'> = {}
  ): Promise<UserSettings> {
    const result = await this.agent.callApi<UserSettings>(
      `user/${userId}/settings`,
      options
    )

    return result
  }

  /**
   * (Authorization required) Set or unset chapter read markers.
   * @param userId The user ID number, or the string 'me' as an alias for the current cookie-authenticated user
   * @param chapters List of chapter IDs to set or unset. Max 100 items.
   * @param read Set or unset the chapter as read. Boolean, default true.
   * @param options Request options
   */
  async setUserChapterRead(
    userId: number | string,
    chapters: number[],
    read = true,
    options: MRequestOptions<'json'> = {}
  ): Promise<ReadChaptersStatus> {
    const result = await this.agent.callApi<ReadChaptersStatus>(
      `user/${userId}/marker`,
      deepmerge(options, {
        method: 'POST'
      }),
      {
        chapters,
        read
      }
    )

    return result
  }

  /**
   * Get user info
   * @param options Request options
   */
  async getMe(options: MRequestOptions<'json'> = {}): Promise<User> {
    return this.getUser('me', options)
  }

  async setHomepageSettings(
    args: SetHomePageSettingsArguments,
    options: MRequestOptions<'headers'> = {}
  ): Promise<boolean> {
    await this.agent.callAjaxAction(
      {
        function: 'homepage_settings'
      },
      deepmerge(options, {
        method: 'POST'
      }),
      {
        theme_id: args.themeId ?? 0,
        display_lang_id: args.displayLangId ?? 1,
        hentai_mode: args.hentaiMode ?? 0
      }
    )

    return true
  }
}
