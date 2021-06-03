import { Agent } from '../Agent'
import { ApiBase } from './base'
import { UserResolver } from './user'
import { CoverArtResolver } from './cover-art'
import { ApiResponseError } from '../lib/error'
import { Manga, MangaFeedResponse, MangaResponse } from '../../types/manga'
import { ApiResponseResult } from '../../types/response'
import { getRelationshipType } from '../lib/relationship-type'
import { CoverArtsResponse } from 'types/cover-art'

export interface GetMangaOptions<W extends boolean> {
  /**
   * If true, will additionally fetch data in relationships. (scanlation_group, manga, user)
   */
  withRelationShips?: W
}

export type GetMangaFeedOptions = Partial<{
  limit: number
  offset: number
  translatedLanguage: string[]
  createdAtSince: string
  updatedAtSince: string
  publishAtSince: string
  volume: string
  chapter: string
}>

export class MangaResolver extends ApiBase {
  /**
   * Get a manga
   * @param mangaId The manga ID
   * @param options Request options
   */
  async getManga<W extends boolean>(
    mangaId: string,
    options: GetMangaOptions<W> = {}
  ): Promise<MangaResponse<W>> {
    return MangaResolver.getManga(mangaId, options)
  }

  /**
   * Get a manga
   * @param mangaId The manga ID
   * @param options Request options
   */
  static async getManga<W extends boolean>(
    mangaId: string,
    options: GetMangaOptions<W> = {}
  ): Promise<MangaResponse<W>> {
    const { data: manga } = await Agent.call<ApiResponseResult<Manga>>(
      `manga/${mangaId}`
    )

    if (manga.result === 'error') {
      throw new ApiResponseError(manga.errors[0])
    }

    if (!options.withRelationShips) {
      return { manga: manga.data } as MangaResponse<W>
    }

    const artist = await Promise.all(
      getRelationshipType('artist', manga.relationships).map(({ id }) =>
        UserResolver.getUser(id)
      )
    )

    const author = await Promise.all(
      getRelationshipType('author', manga.relationships).map(({ id }) =>
        UserResolver.getUser(id)
      )
    )

    const coverArt = await Promise.all(
      getRelationshipType('cover_art', manga.relationships).map(({ id }) =>
        CoverArtResolver.getCoverArt(id)
      )
    )

    return {
      manga: manga.data,
      artist,
      author,
      cover_art: coverArt
    } as unknown as MangaResponse<W>
  }

  /**
   * Get manga feed with chapters
   * @param mangaId The manga ID
   * @param options Request Options
   */
  async getMangaFeed(
    mangaId: string,
    options: GetMangaFeedOptions = {}
  ): Promise<MangaFeedResponse> {
    return MangaResolver.getMangaFeed(mangaId, options)
  }

  /**
   * Get manga feed with chapters
   * @param mangaId The manga ID
   * @param options Request Options
   */
  static async getMangaFeed(
    mangaId: string,
    options: GetMangaFeedOptions = {}
  ): Promise<MangaFeedResponse> {
    const { data: mangaFeed } = await Agent.call<MangaFeedResponse>(
      `manga/${mangaId}/feed`,
      {
        params: options
      }
    )

    return mangaFeed
  }

  /**
   * Get a list of covers belonging to a manga.
   * @param mangaId The manga ID
   */
  async getMangaCovers(mangaId: string): Promise<CoverArtsResponse> {
    return MangaResolver.getMangaCovers(mangaId)
  }

  /**
   * Get a list of covers belonging to a manga.
   * @param mangaId The manga ID
   */
  static async getMangaCovers(mangaId: string): Promise<CoverArtsResponse> {
    return CoverArtResolver.getCoverArts({ manga: [mangaId] })
  }
}
