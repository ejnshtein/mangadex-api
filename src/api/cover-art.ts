import { Agent } from '../Agent'
import { ApiBase } from './base'
import {
  CoverArt,
  CoverArtResponse,
  CoverArtsResponse
} from '../../types/cover-art'
import { ApiResponseResult } from 'types/response'
import { ApiResponseError } from 'src/lib/error'
import { getRelationshipType } from 'src/lib/relationship-type'
import { MangaResolver } from './manga'
import { UserResolver } from './user'

export interface GetCoverArtOptions<W extends boolean> {
  /**
   * If true, will additionally fetch data in relationships. (manga, user)
   */
  withRelationShips?: W
}

export type GetCoverArtsOptions = Partial<{
  limit: number
  offset: number
  manga: string[]
  ids: string[]
  uploaders: string[]
  createdAt: string
  uploadedAt: string
  volume: string
}>

export class CoverArtResolver extends ApiBase {
  static async getCoverArt<W extends boolean>(
    coverArtId: string,
    options: GetCoverArtOptions<W> = {}
  ): Promise<CoverArtResponse<W>> {
    const { data: cover } = await Agent.call<ApiResponseResult<CoverArt>>(
      `cover/${coverArtId}`
    )

    if (cover.result === 'error') {
      throw new ApiResponseError(cover.errors[0])
    }

    if (!options.withRelationShips) {
      return { cover_art: cover.data } as CoverArtResponse<W>
    }

    const manga = await Promise.all(
      getRelationshipType('manga', cover.relationships).map((manga) =>
        MangaResolver.getManga(manga.id)
      )
    )

    const user = await Promise.all(
      getRelationshipType('user', cover.relationships).map((user) =>
        UserResolver.getUser(user.id)
      )
    )

    return {
      cover_art: cover.data,
      manga,
      user
    } as unknown as CoverArtResponse<W>
  }

  static async getCoverArts(
    options: GetCoverArtsOptions
  ): Promise<CoverArtsResponse> {
    const { data: covers } = await Agent.call<CoverArtsResponse>(`cover`, {
      params: options
    })

    return covers
  }
}
