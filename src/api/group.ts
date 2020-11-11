import { Agent } from '../Agent'
import { MRequestOptions } from '../../types/agent'
import { PartialChapters, MangadexGroup } from '../../types/mangadex'
import { ApiBase, IncludeParams, PartialChaptersParams } from './base'

export class GroupResolver extends ApiBase {
  /**
   * Get a group.
   * @param groupId The group ID number
   * @param options Request options
   */
  async getGroup(
    groupId: number,
    options: MRequestOptions<'json'> & {
      params?: IncludeParams
    } = {}
  ): Promise<MangadexGroup> {
    const result = await this.agent.callApi<MangadexGroup>(
      `group/${groupId}`,
      options
    )

    return result
  }

  /**
   * Get a group.
   * @param groupId The group ID number
   * @param options Request options
   */
  static async getGroup(
    groupId: number,
    options: MRequestOptions<'json'> & {
      params?: IncludeParams
    } = {}
  ): Promise<MangadexGroup> {
    const result = await Agent.callApi<MangadexGroup>(
      `group/${groupId}`,
      options
    )

    return result
  }

  /**
   * Get partial information about the chapters belonging to the group.
   * @param groupId The group ID number
   * @param options Request options
   */
  async getGroupChapters(
    groupId: number,
    options: MRequestOptions<'json'> & {
      params?: PartialChaptersParams
    } = {}
  ): Promise<PartialChapters> {
    const result = await this.agent.callApi<PartialChapters>(
      `group/${groupId}/chapters`,
      options
    )

    return result
  }

  /**
   * Get partial information about the chapters belonging to the group.
   * @param groupId The group ID number
   * @param options Request options
   */
  static async getGroupChapters(
    groupId: number,
    options: MRequestOptions<'json'> & {
      params?: PartialChaptersParams
    } = {}
  ): Promise<PartialChapters> {
    const result = await Agent.callApi<PartialChapters>(
      `group/${groupId}/chapters`,
      options
    )

    return result
  }
}
