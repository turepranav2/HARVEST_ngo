const { Prisma } = require('@prisma/client')
const { Decimal } = Prisma

const toSnakeKey = (key) => key.replace(/([A-Z])/g, '_$1').toLowerCase()
const toCamelKey = (key) =>
  key.replace(/([-_][a-z])/gi, (group) =>
    group.toUpperCase().replace('-', '').replace('_', '')
  )

const serializeValue = (value) => {
  if (value instanceof Decimal) {
    return Number(value.toString())
  }
  if (value instanceof Date) {
    return value.toISOString()
  }
  if (Array.isArray(value)) {
    return value.map(serializeValue)
  }
  if (value && typeof value === 'object') {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, serializeValue(val)])
    )
  }
  return value
}

const transformKeys = (data, keyTransformer) => {
  if (Array.isArray(data)) {
    return data.map((item) => transformKeys(item, keyTransformer))
  }
  if (data && typeof data === 'object') {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        keyTransformer(key),
        transformKeys(value, keyTransformer),
      ])
    )
  }
  return data
}

const toSnakeCase = (data) => transformKeys(serializeValue(data), toSnakeKey)
const toCamelCase = (data) => transformKeys(data, toCamelKey)

module.exports = {
  toSnakeCase,
  toCamelCase,
}

