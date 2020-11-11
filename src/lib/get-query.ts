import { SearchQuery } from '../../types'

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
    Object.entries(query).forEach(([name, value]) => {
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

  return Object.entries(userQuery).reduce((acc, [name, value]) => {
    if (typeof value === 'string' && value) {
      acc[name] = value
    }
    if (Array.isArray(value) && value.length > 0) {
      acc[name] = value.join(',')
    }
    return acc
  }, {})
}
