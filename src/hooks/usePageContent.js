import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchPageContent } from '../services/api'

const buildIndex = (items) =>
  items.reduce((acc, item) => {
    const section = item.section
    const field = item.field_name
    if (!acc[section]) acc[section] = {}
    acc[section][field] = item
    return acc
  }, {})

export const usePageContent = (page) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    setLoading(true)
    fetchPageContent(page)
      .then((response) => {
        if (mounted) {
          setData(response)
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(err)
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [page])

  const index = useMemo(() => buildIndex(data), [data])

  const getText = useCallback(
    (section, fieldName, fallback) =>
      index[section]?.[fieldName]?.text_content || fallback,
    [index]
  )

  const getImage = useCallback(
    (section, fieldName, fallback) => ({
      src: index[section]?.[fieldName]?.image_url || fallback,
      alt: index[section]?.[fieldName]?.image_alt || '',
    }),
    [index]
  )

  return {
    loading,
    error,
    getText,
    getImage,
    raw: data,
  }
}

export default usePageContent


