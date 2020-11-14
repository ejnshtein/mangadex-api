import { Agent } from '../Agent'
import { normalizeChapter } from '../lib/normalize'
import { MRequestOptions } from '../../types/agent'
import { Chapter, FormattedChapter } from '../../types/mangadex'
import { ApiBase } from './base'

export interface GetChapterQueryParams {
  /**
   * Mark the chapter as read.
   */
  mark_read?: boolean

  /**
   * Use low quality images (data saver)
   */
  saver?: boolean

  /**
   * Use to override location-based server assignment.
   */
  server?: 'na' | 'na2' | string
}

export class ChapterResolver extends ApiBase {
  /**
   * Get a chapter. Possible error codes: 410 (deleted), 403 (restricted), 451 (unavailable)."
   * @param chapterId The chapter ID number, or the chapter hash.
   * @param options request options
   */
  async getChapter(
    chapterId: number,
    options: MRequestOptions<'json'> & {
      params?: GetChapterQueryParams
    } = {}
  ): Promise<FormattedChapter> {
    const chapter = await this.agent.callApi<Chapter>(
      `chapter/${chapterId}`,
      options
    )

    return normalizeChapter(chapter)
  }

  /**
   * Get a chapter. Possible error codes: 410 (deleted), 403 (restricted), 451 (unavailable)."
   * @param chapterId The chapter ID number, or the chapter hash.
   * @param options Request options
   */
  static async getChapter(
    chapterId: number,
    options: MRequestOptions<'json'> & {
      params?: GetChapterQueryParams
    } = {}
  ): Promise<FormattedChapter> {
    const chapter = await Agent.callApi<Chapter>(
      `chapter/${chapterId}`,
      options
    )

    return normalizeChapter(chapter)
  }
}
