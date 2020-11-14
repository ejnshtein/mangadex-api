export class ApiError extends Error {
  public code: number
  public url: string

  constructor({
    message,
    code,
    url
  }: {
    message: string
    code: number
    url: string
  }) {
    super(`${code} - ${message}`)

    this.code = code
    this.url = url
  }
}
