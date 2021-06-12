export const formatQueryParams = <T extends Record<string, unknown>>(
  query: T
): Record<string, unknown> =>
  Object.entries(query).reduce((acc, [key, value]) => {
    if (Array.isArray(value)) {
      return {
        ...acc,
        ...value.reduce((a, v, i) => ({ ...a, [`${key}[${i}]`]: v }), {})
      }
    }
    return {
      ...acc,
      [key]: value
    }
  }, {})
