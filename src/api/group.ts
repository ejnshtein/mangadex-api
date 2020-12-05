import { Agent } from '../Agent'
import { MRequestOptions } from '../../types/agent'
import { PartialChapters, Group } from '../../types/mangadex'
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
  ): Promise<Group> {
    const result = await this.agent.callApi<Group>(`group/${groupId}`, options)

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
  ): Promise<Group> {
    const result = await Agent.callApi<Group>(`group/${groupId}`, options)

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
