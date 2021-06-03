import { Agent } from '../Agent'
import { ApiBase } from './base'
import { MangaResolver } from './manga'
import { UserResolver } from './user'
import { ApiResponseResult } from '../../types/response'
import { Chapter, ChapterResponse } from '../../types/chapter'
import { ApiResponseError } from '../lib/error'
import { getRelationshipType } from '../lib/relationship-type'
import { GroupResolver } from './group'

export interface GetChapterOptions<W extends boolean> {
  /**
   * If true, will additionally fetch data in relationships. (scanlation_group, manga, user)
   */
  withRelationShips?: W
}

export class ChapterResolver extends ApiBase {
  /**
   * Get a chapter
   * @param chapterId The chapter ID
   * @param options request options
   */
  async getChapter<W extends boolean>(
    chapterId: string,
    options: GetChapterOptions<W> = {}
  ): Promise<ChapterResponse<W>> {
    return ChapterResolver.getChapter(chapterId, options)
  }

  /**
   * Get a chapter
   * @param chapterId The chapter ID
   * @param options request options
   */
  static async getChapter<W extends boolean>(
    chapterId: string,
    options: GetChapterOptions<W> = {}
  ): Promise<ChapterResponse<W>> {
    const { data: chapter } = await Agent.call<ApiResponseResult<Chapter>>(
      `chapter/${chapterId}`
    )

    if (chapter.result === 'error') {
      throw new ApiResponseError(chapter.errors[0])
    }

    if (!options.withRelationShips) {
      return { chapter: chapter.data } as ChapterResponse<W>
    }

    const scanlationGroup = await Promise.all(
      getRelationshipType('scanlation_group', chapter.relationships).map(
        ({ id }) => GroupResolver.getGroup(id)
      )
    )

    const manga = await Promise.all(
      getRelationshipType('manga', chapter.relationships).map(({ id }) =>
        MangaResolver.getManga(id)
      )
    )

    const user = await Promise.all(
      getRelationshipType('user', chapter.relationships).map(({ id }) =>
        UserResolver.getUser(id)
      )
    )

    return {
      chapter: chapter.data,
      manga,
      scanlation_group: scanlationGroup,
      user
    } as unknown as ChapterResponse<W>
  }
}
