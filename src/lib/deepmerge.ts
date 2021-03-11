export function deepmerge<T = Record<string, unknown>>(
  target: T,
  ...sources: T[]
): T {
  const targetCopy = Object.assign({}, target)
  // eslint-disable-next-line @typescript-eslint/ban-types
  const isObject = (obj: object) => obj && typeof obj === 'object'
  sources.forEach((source) =>
    Object.keys(source).forEach((key) => {
      const targetValue = targetCopy[key]
      const sourceValue = source[key]

      if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
        targetCopy[key] = targetValue.concat(sourceValue)
      } else if (
        isObject(targetValue) &&
        isObject(sourceValue as Record<string, unknown>)
      ) {
        targetCopy[key] = deepmerge(
          Object.assign({}, targetValue),
          sourceValue as Record<string, unknown>
        )
      } else {
        targetCopy[key] = sourceValue
      }
    })
  )

  return targetCopy
}
