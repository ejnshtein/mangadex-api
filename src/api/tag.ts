import { Agent } from '../Agent'
import { MRequestOptions } from '../../types'
import { Tag, Tags } from '../../types/mangadex'
import { ApiBase } from './base'

export class TagResolver extends ApiBase {
  /**
   * Get all tags
   * @param options Request options
   */
  async getTags(options: MRequestOptions<'json'> = {}): Promise<Tags> {
    const result = await this.agent.callApi<Tags>('tag', options)

    return result
  }

  /**
   * Get all tags
   * @param options Request options
   */
  static async getTags(options: MRequestOptions<'json'> = {}): Promise<Tags> {
    const result = await Agent.callApi<Tags>('tag', options)

    return result
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
