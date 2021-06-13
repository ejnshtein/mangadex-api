import { Agent } from '../Agent'
import { ApiBase } from './base'
import {
  CoverArtExtended,
  CoverArtExtendedResponse,
  CoverArtResponse,
  CoverArtsResponse
} from '../../types/data-types/cover-art'
import { getRelationshipType } from '../lib/relationship-type'
import { MangaResolver } from './manga'
import { UserResolver } from './user'
import { formatQueryParams } from '../lib/format-query-params'
import { ApiResponse } from '../../types/response'

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
  async getCoverArt(
    coverArtId: string,
    options?: {
      withRelationShips?: false
    }
  ): Promise<CoverArtResponse>

  async getCoverArt(
    coverArtId: string,
    options?: {
      withRelationShips?: true
    }
  ): Promise<CoverArtExtendedResponse>

  async getCoverArt(
    coverArtId: string,
    options: {
      /**
       * If true, will additionally fetch data in relationships. (manga, user)
       */
      withRelationShips?: boolean
    } = {}
  ): Promise<unknown> {
    const { data: cover } = await this.agent.call<
      ApiResponse<{ data: CoverArtExtended }>
    >(`cover/${coverArtId}`)

    if (cover.result === 'error') {
      return cover
    }

    const manga = getRelationshipType('manga', cover.relationships)[0]
    const user = getRelationshipType('user', cover.relationships)[0]

    cover.data.attributes.urls = [
      `https://uploads.mangadex.org/cover/${manga[0].id}/${cover.data.attributes.fileName}`,
      `https://uploads.mangadex.org/cover/${manga[0].id}/${cover.data.attributes.fileName}.256.jpg`,
      `https://uploads.mangadex.org/cover/${manga[0].id}/${cover.data.attributes.fileName}.512.jpg`
    ]

    if (!options.withRelationShips) {
      return cover
    }

    cover.data.attributes.manga = await MangaResolver.getManga(manga.id)
    cover.data.attributes.uploader = await UserResolver.getUser(user.id)

    return cover
  }

  static async getCoverArt(
    coverArtId: string,
    options?: {
      /**
       * If true, will additionally fetch data in relationships. (manga, user)
       */
      withRelationShips?: false
    }
  ): Promise<CoverArtResponse>

  static async getCoverArt(
    coverArtId: string,
    options?: {
      /**
       * If true, will additionally fetch data in relationships. (manga, user)
       */
      withRelationShips?: true
    }
  ): Promise<CoverArtExtendedResponse>

  static async getCoverArt(
    coverArtId: string,
    options: {
      /**
       * If true, will additionally fetch data in relationships. (manga, user)
       */
      withRelationShips?: boolean
    } = {}
  ): Promise<unknown> {
    const { data: cover } = await Agent.call<
      ApiResponse<{ data: CoverArtExtended }>
    >(`cover/${coverArtId}`)

    if (cover.result === 'error') {
      return cover
    }

    const manga = getRelationshipType('manga', cover.relationships)[0]
    const user = getRelationshipType('user', cover.relationships)[0]

    cover.data.attributes.urls = [
      `https://uploads.mangadex.org/cover/${manga.id}/${cover.data.attributes.fileName}`,
      `https://uploads.mangadex.org/cover/${manga.id}/${cover.data.attributes.fileName}.256.jpg`,
      `https://uploads.mangadex.org/cover/${manga.id}/${cover.data.attributes.fileName}.512.jpg`
    ]

    if (!options.withRelationShips) {
      return cover
    }

    cover.data.attributes.manga = await MangaResolver.getManga(manga.id)
    cover.data.attributes.uploader = await UserResolver.getUser(user.id)

    return cover
  }

  async getCoverArts(options: GetCoverArtsOptions): Promise<CoverArtsResponse> {
    const { data: covers } = await this.agent.call<CoverArtsResponse>('cover', {
      params: formatQueryParams(options)
    })

    return covers
  }

  static async getCoverArts(
    options: GetCoverArtsOptions
  ): Promise<CoverArtsResponse> {
    const { data: covers } = await Agent.call<CoverArtsResponse>('cover', {
      params: formatQueryParams(options)
    })

    return covers
  }
}
