import { Agent } from '../Agent'
import { AgentOptions } from '../../types/agent'

export interface IncludeParams {
  /**
   * Possible values: chapters (Include partial chapter information).
   */
  include?: 'chapter' | string
}

export interface PartialChaptersParams {
  /**
   * The limit of the paginated results, allowed range 10 - 100
   */
  limit?: number

  /**
   * The current page of the paginated results, starting from 1. Integer, default disables pagination.
   */
  p?: number
}

export class ApiBase {
  public agent: Agent
  public options: AgentOptions
  constructor({ agent, options }: { agent: Agent; options: AgentOptions }) {
    this.agent = agent
    this.options = options
  }
}
