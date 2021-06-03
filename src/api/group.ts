import { Agent } from '../Agent'
import { ApiBase } from './base'
import { UserResolver } from './user'
import { Group, GroupResponse } from '../../types/group'
import { ApiResponseResult } from '../../types/response'
import { ApiResponseError } from '../lib/error'
import { getRelationshipType } from '../lib/relationship-type'

export interface GetGroupOptions<W extends boolean> {
  /**
   * If true, will additionally fetch data in relationships. (user)
   */
  withRelationShips?: W
}

export class GroupResolver extends ApiBase {
  /**
   * Get a group.
   * @param groupId The group ID
   * @param options Request options
   */
  async getGroup<W extends boolean>(
    groupId: string,
    options: GetGroupOptions<W> = {}
  ): Promise<GroupResponse<W>> {
    return GroupResolver.getGroup(groupId, options)
  }

  /**
   * Get a group.
   * @param groupId The group ID
   * @param options Request options
   */
  static async getGroup<W extends boolean>(
    groupId: string,
    options: GetGroupOptions<W> = {}
  ): Promise<GroupResponse<W>> {
    const { data: group } = await Agent.call<ApiResponseResult<Group>>(
      `group/${groupId}`
    )

    if (group.result === 'error') {
      throw new ApiResponseError(group.errors[0])
    }

    if (!options.withRelationShips) {
      return { scanlation_group: group.data } as GroupResponse<W>
    }

    const user = await Promise.all(
      getRelationshipType('user', group.relationships).map(({ id }) =>
        UserResolver.getUser(id)
      )
    )

    return {
      scanlation_group: group.data,
      user
    } as unknown as GroupResponse<W>
  }

  // /**
  //  * Get partial information about the chapters belonging to the group.
  //  * @param groupId The group ID
  //  * @param options Request options
  //  */
  // async getGroupChapters(
  //   groupId: number,
  //   options: MRequestOptions<'json'> & {
  //     params?: PartialChaptersParams
  //   } = {}
  // ): Promise<PartialChapters> {
  //   const result = await this.agent.callApi<PartialChapters>(
  //     `group/${groupId}/chapters`,
  //     options
  //   )

  //   return result
  // }

  // /**
  //  * Get partial information about the chapters belonging to the group.
  //  * @param groupId The group ID
  //  * @param options Request options
  //  */
  // static async getGroupChapters(
  //   groupId: number,
  //   options: MRequestOptions<'json'> & {
  //     params?: PartialChaptersParams
  //   } = {}
  // ): Promise<PartialChapters> {
  //   const result = await Agent.callApi<PartialChapters>(
  //     `group/${groupId}/chapters`,
  //     options
  //   )

  //   return result
  // }
}
