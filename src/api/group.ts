import { Agent } from '../Agent'
import { ApiBase } from './base'
import { UserResolver } from './user'
import {
  GroupExtended,
  GroupExtendedResponse,
  GroupList,
  GroupResponse
} from '../../types/data-types/group'
import { ApiResponseError } from '../lib/error'
import { getRelationshipType } from '../lib/relationship-type'
import { ApiResponse } from '../../types/response'
import { formatQueryParams } from '../lib/format-query-params'

export type SearchGroupOptions = Partial<{
  /**
   * @default 10
   */
  limit: number

  offset: number

  ids: string[]

  name: string
}>

export class GroupResolver extends ApiBase {
  async getGroup(
    groupId: string,
    options: {
      withRelationShips?: true
    }
  ): Promise<GroupExtendedResponse>

  async getGroup(
    groupId: string,
    options: {
      withRelationShips?: false
    }
  ): Promise<GroupResponse>

  /**
   * Get a group.
   * @param groupId The group ID
   * @param options Request options
   */
  async getGroup(
    groupId: string,
    options: {
      withRelationShips?: boolean
    } = {}
  ): Promise<unknown> {
    const { data: group } = await this.agent.call<
      ApiResponse<{ data: GroupExtended }>
    >(`group/${groupId}`)

    if (group.result === 'error') {
      throw new ApiResponseError(group.errors[0])
    }

    if (!options.withRelationShips) {
      return group
    }

    group.data.attributes.members = await Promise.all(
      getRelationshipType('user', group.relationships).map(({ id }) =>
        UserResolver.getUser(id).then(({ data }) => data)
      )
    )

    return group
  }

  static async getGroup(
    groupId: string,
    options?: {
      /**
       * If true, will additionally fetch data in relationships. (user)
       */
      withRelationShips?: true
    }
  ): Promise<GroupExtendedResponse>

  static async getGroup(
    groupId: string,
    options?: {
      /**
       * If true, will additionally fetch data in relationships. (user)
       */
      withRelationShips?: false
    }
  ): Promise<GroupResponse>

  /**
   * Get a group.
   * @param groupId The group ID
   * @param options Request options
   */
  static async getGroup(
    groupId: string,
    options: {
      /**
       * If true, will additionally fetch data in relationships. (user)
       */
      withRelationShips?: boolean
    } = {}
  ): Promise<unknown> {
    const { data: group } = await Agent.call<
      ApiResponse<{ data: GroupExtended }>
    >(`group/${groupId}`)

    if (group.result === 'error') {
      throw new ApiResponseError(group.errors[0])
    }

    const members = getRelationshipType('user', group.relationships)

    if (!options.withRelationShips) {
      return group
    }

    group.data.attributes.members = await Promise.all(
      members.map(({ id }) => UserResolver.getUser(id).then(({ data }) => data))
    )

    return group
  }

  async search(options: SearchGroupOptions): Promise<GroupList> {
    const { data } = await this.agent.call<GroupList>('group', {
      params: formatQueryParams(options)
    })

    return data
  }

  static async search(options: SearchGroupOptions): Promise<GroupList> {
    const { data } = await Agent.call<GroupList>('group', {
      params: formatQueryParams(options)
    })

    return data
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
