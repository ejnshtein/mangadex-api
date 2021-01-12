import { SearchQuery } from '../../types/agent'

const DefaultSearchQuery: SearchQuery = {
  title: '',
  author: '',
  artist: '',
  lang_id: null,
  demos: [],
  statuses: [],
  tags: [],
  tag_mode_inc_all: 'all',
  tag_mode_exc: 'any'
}

export const getQuery = (query: SearchQuery | string): SearchQuery => {
  const userQuery: SearchQuery = {}
  if (typeof query === 'string') {
    userQuery.title = query
  } else if (typeof query === 'object') {
    Object.entries(query)
      .filter(([key]) => key !== 'with_hentai')
      .forEach(([name, value]) => {
        if (Array.isArray(value) && value.length > 0) {
          userQuery[name] = value.join(',')
        } else {
          userQuery[name] = value
        }
      })
  } else {
    Object.entries(DefaultSearchQuery).forEach(([key, val]) => {
      userQuery[key] = val
    })
  }

  return Object.entries(userQuery)
    .filter(([key]) => key !== 'with_hentai')
    .reduce((acc, [name, value]) => {
      if (typeof value === 'string' && value) {
        acc[name] = value
      }
      if (Array.isArray(value) && value.length > 0) {
        acc[name] = value.join(',')
      }
      return acc
    }, {})
}
