class MangadexError extends Error {
  constructor (payload = {}, response) {
    super(`${response.status}: ${response.statusText}`)
    this.code = response.status
    this.response = payload
    this.description = payload.status
    this.parameters = response.config || {}
  }
}

module.exports = MangadexError
