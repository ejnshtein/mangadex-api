import { Agent } from '../Agent'
import { ApiBase } from './base'
import { MangaResolver } from './manga'
import { UserResolver } from './user'
import { ApiResponse } from '../../types/response'
import {
  Chapter,
  ChapterExtended,
  ChapterExtendedResponse,
  ChapterList,
  ChapterResponse
} from '../../types/data-types/chapter'
import { ApiResponseError } from '../lib/error'
import { getRelationshipType } from '../lib/relationship-type'
import { GroupResolver } from './group'
import { Language } from '../../types/data-types/language'
import { formatQueryParams } from '../lib/format-query-params'

export type SearchOrder = 'asc' | 'desc'

export type SearchChapterOptions = Partial<{
  limit: number
  offset: number
  /**
   * Chapter ids (limited to 100 per request)
   */
  ids: string[]

  title: string

  groups: string[]

  uploader: string
  manga: string
  volume: string
  chapter: string
  translatedLanguage: Language[]
  /**
   * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   */
  createdAtSince: string

  /**
   * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   */
  updatedAtSince: string

  /**
   * DateTime string with following format: YYYY-MM-DDTHH:MM:SS
   */
  publishAtSince: string

  order: Record<
    'createdAt' | 'updatedAt' | 'publishAt' | 'volume' | 'chapter',
    SearchOrder
  >
}>

export class ChapterResolver extends ApiBase {
  /**
   * Get a chapter
   * @param chapterId The chapter ID
   * @param options request options
   */
  async getChapter(
    chapterId: string,
    options: {
      /**
       * If true, will additionally fetch data in relationships. (scanlation_group, manga, user)
       */
      withRelationShips?: true
    }
  ): Promise<ChapterResponse>

  /**
   * Get a chapter
   * @param chapterId The chapter ID
   * @param options request options
   */
  async getChapter(
    chapterId: string,
    options: {
      /**
       * If true, will additionally fetch data in relationships. (scanlation_group, manga, user)
       */
      withRelationShips?: false
    }
  ): Promise<ChapterExtendedResponse>

  /**
   * Get a chapter
   * @param chapterId The chapter ID
   * @param options request options
   */
  async getChapter(
    chapterId: string,
    options: {
      withRelationShips?: boolean
    } = {}
  ): Promise<unknown> {
    const { data: chapter } = await this.agent.call<
      ApiResponse<{ data: ChapterExtended }>
    >(`chapter/${chapterId}`)

    if (chapter.result === 'error') {
      throw new ApiResponseError(chapter.errors[0])
    }

    const scanlationGroup = getRelationshipType(
      'scanlation_group',
      chapter.relationships
    )
    const manga = getRelationshipType('manga', chapter.relationships)
    const uploader = getRelationshipType('user', chapter.relationships)[0]

    if (!options.withRelationShips) {
      return chapter
    }

    chapter.data.attributes.scanlation_group = await Promise.all(
      scanlationGroup.map(({ id }) =>
        GroupResolver.getGroup(id).then(({ data }) => data)
      )
    )

    chapter.data.attributes.manga = (
      await Promise.all(
        manga.map(({ id }) =>
          MangaResolver.getManga(id).then(({ data }) => data)
        )
      )
    )[0]

    chapter.data.attributes.uploader = (
      await UserResolver.getUser(uploader.id)
    ).data

    return chapter
  }

  /**
   * Get a chapter
   * @param chapterId The chapter ID
   * @param options request options
   */
  static async getChapter(
    chapterId: string,
    options: {
      /**
       * If true, will additionally fetch data in relationships. (scanlation_group, manga, user)
       */
      withRelationShips?: true
    }
  ): Promise<ChapterResponse>

  /**
   * Get a chapter
   * @param chapterId The chapter ID
   * @param options request options
   */
  static async getChapter(
    chapterId: string,
    options: {
      /**
       * If true, will additionally fetch data in relationships. (scanlation_group, manga, user)
       */
      withRelationShips?: false
    }
  ): Promise<ChapterExtendedResponse>

  /**
   * Get a chapter
   * @param chapterId The chapter ID
   * @param options request options
   */
  static async getChapter(
    chapterId: string,
    options: {
      withRelationShips?: boolean
    } = {}
  ): Promise<unknown> {
    const { data: chapter } = await Agent.call<
      ApiResponse<{ data: ChapterExtended }>
    >(`chapter/${chapterId}`)

    if (chapter.result === 'error') {
      throw new ApiResponseError(chapter.errors[0])
    }

    const scanlationGroup = getRelationshipType(
      'scanlation_group',
      chapter.relationships
    )
    const manga = getRelationshipType('manga', chapter.relationships)
    const uploader = getRelationshipType('user', chapter.relationships)[0]

    if (!options.withRelationShips) {
      return chapter
    }

    chapter.data.attributes.scanlation_group = await Promise.all(
      scanlationGroup.map(({ id }) =>
        GroupResolver.getGroup(id).then(({ data }) => data)
      )
    )

    chapter.data.attributes.manga = (
      await Promise.all(
        manga.map(({ id }) =>
          MangaResolver.getManga(id).then(({ data }) => data)
        )
      )
    )[0]

    chapter.data.attributes.uploader = (
      await UserResolver.getUser(uploader.id)
    ).data

    return chapter
  }

  async search(options: SearchChapterOptions): Promise<ChapterList> {
    const { data } = await this.agent.call<ChapterList>('chapter', {
      params: formatQueryParams(options)
    })

    return data
  }

  static async search(options: SearchChapterOptions): Promise<ChapterList> {
    const { data } = await Agent.call<ChapterList>('chapter', {
      params: formatQueryParams(options)
    })

    return data
  }
}
