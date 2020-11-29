import { Agent } from '../Agent'
import { MRequestOptions } from '../../types/agent'
import { Tag } from '../../types/mangadex'
import { ApiBase } from './base'
import { Composer } from '../Composer'

export class TagResolver extends ApiBase {
  /**
   * Get all tags
   * @param options Request options
   */
  async getTags(options: MRequestOptions<'json'> = {}): Promise<Tag[]> {
    const result = await this.agent.callApi<{ [x: string]: Tag }>(
      'tag',
      options
    )

    return Composer.formatTypeMapToArray(result)
  }

  /**
   * Get all tags
   * @param options Request options
   */
  static async getTags(options: MRequestOptions<'json'> = {}): Promise<Tag[]> {
    const result = await Agent.callApi<{ [x: string]: Tag }>('tag', options)

    return Composer.formatTypeMapToArray(result)
  }

  /**
   * Get a tag
   * @param tagId Tag id
   * @param options Request options
   */
  async getTag(
    tagId: number,
    options: MRequestOptions<'json'> = {}
  ): Promise<Tag> {
    const result = await this.agent.callApi<Tag>(`tag/${tagId}`, options)

    return result
  }

  /**
   * Get a tag
   * @param tagId Tag id
   * @param options Request options
   */
  static async getTag(
    tagId: number,
    options: MRequestOptions<'json'> = {}
  ): Promise<Tag> {
    const result = await Agent.callApi<Tag>(`tag/${tagId}`, options)

    return result
  }
}
