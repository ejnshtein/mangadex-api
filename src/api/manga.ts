import { Agent } from '../Agent'
import { normalizeManga } from '../lib/normalize'
import { MRequestOptions } from '../../types/agent'
import {
  FormattedManga,
  Manga,
  MangaCover,
  PartialChapters
} from '../../types/mangadex'
import { ApiBase, IncludeParams, PartialChaptersParams } from './base'

export class MangaResolver extends ApiBase {
  /**
   * Get a manga
   * @param mangaId The manga ID number
   * @param options Request options
   */
  async getManga(
    mangaId: number,
    options: MRequestOptions<'json'> & {
      params?: IncludeParams
    } = {}
  ): Promise<FormattedManga> {
    const manga = await this.agent.callApi<Manga>(`manga/${mangaId}`, options)

    return normalizeManga(manga)
  }

  /**
   * Get a manga
   * @param mangaId The manga ID number
   * @param options Request options
   */
  static async getManga(
    mangaId: number,
    options: MRequestOptions<'json'> & {
      params?: IncludeParams
    } = {}
  ): Promise<FormattedManga> {
    const manga = await Agent.callApi<Manga>(`manga/${mangaId}`, options)

    return normalizeManga(manga)
  }

  /**
   * Get partial information about the chapters belonging to a manga
   * @param mangaId The manga ID number
   * @param options Request Options
   */
  async getMangaChapters(
    mangaId: number,
    options: MRequestOptions<'json'> & {
      params?: PartialChaptersParams
    } = {}
  ): Promise<PartialChapters> {
    const result = await this.agent.callApi<PartialChapters>(
      `manga/${mangaId}/chapters`,
      options
    )

    return result
  }

  /**
   * Get partial information about the chapters belonging to a manga
   * @param mangaId The manga ID number
   * @param options Request Options
   */
  static async getMangaChapters(
    mangaId: number,
    options: MRequestOptions<'json'> & {
      params?: PartialChaptersParams
    } = {}
  ): Promise<PartialChapters> {
    const result = await Agent.callApi<PartialChapters>(
      `manga/${mangaId}/chapters`,
      options
    )

    return result
  }

  /**
   * Get a list of covers belonging to a manga.
   * @param mangaId The manga ID number
   * @param options Request Options
   */
  async getMangaCovers(
    mangaId: number,
    options: MRequestOptions<'json'> = {}
  ): Promise<MangaCover[]> {
    const result = await this.agent.callApi<MangaCover[]>(
      `manga/${mangaId}/covers`,
      options
    )

    return result
  }

  /**
   * Get a list of covers belonging to a manga.
   * @param mangaId The manga ID number
   * @param options Request Options
   */
  static async getMangaCovers(
    mangaId: number,
    options: MRequestOptions<'json'> = {}
  ): Promise<MangaCover[]> {
    const result = await Agent.callApi<MangaCover[]>(
      `manga/${mangaId}/covers`,
      options
    )

    return result
  }
}
