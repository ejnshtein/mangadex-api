import { ResponseError } from '../../types/response'

export class ApiResponseError extends Error {
  public id: string
  public detail: string
  public context: ResponseError['context']
  constructor({ id, status, detail, title, context }: ResponseError) {
    super(`${status} - ${title}`)

    this.id = id
    this.detail = detail
    this.name = title
    this.context = context
  }
}
