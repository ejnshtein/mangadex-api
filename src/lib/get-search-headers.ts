import { OutgoingHttpHeaders } from 'http'
import { SearchQuery } from 'types/agent'

export const getSearchHeaders = (
  query: string | SearchQuery,
  cookie: string
): OutgoingHttpHeaders => {
  const headers: OutgoingHttpHeaders = {}

  if (
    typeof query !== 'string' &&
    typeof query.with_hentai === 'boolean' &&
    query.with_hentai
  ) {
    if (cookie.includes('mangadex_h_toggle=0')) {
      const cookieWithCorrectHSetting = cookie
        .split('; ')
        .filter((l) => !l.includes('mangadex_h_toggle'))
        .join('; ')
      headers.Cookie = `${cookieWithCorrectHSetting}; mangadex_h_toggle=1`
    }
  } else if (
    typeof query !== 'string' &&
    typeof query.with_hentai === 'boolean' &&
    !query.with_hentai
  ) {
    if (
      ['mangadex_h_toggle=1', 'mangadex_h_toggle=2'].some((hMode) =>
        cookie.includes(hMode)
      )
    ) {
      const cookieWithCorrectHSetting = cookie
        .split('; ')
        .filter((l) => !l.includes('mangadex_h_toggle'))
        .join('; ')
      headers.Cookie = `${cookieWithCorrectHSetting}; mangadex_h_toggle=0`
    }
  }

  return headers
}
