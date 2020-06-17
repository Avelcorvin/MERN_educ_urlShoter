import { useCallback, useState } from 'react'
/**
 * этот хук отправляет post или get запрос по указаному url
 * 
 *   const request = useCallback(async (url, method = "POST", body = {},mode = 'no-cors', headers = {})
 *   рабочая схема отправки
 */


export const useHttp = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = "POST", body = {}, headers = {}) => {
        setLoading(true)
        if (body) {
            body = JSON.stringify(body)
            headers['Content-Type'] = 'application/json'
        }
        try {
            const response = await fetch(url, { method, body, headers })
            const data = await response.json()
            if (!response.ok) {
                throw new Error(data.message, data.error || 'Что то не отправилось...')
            }
            setLoading(false)
            return data
        } catch (e) {
            setLoading(false)
            setError(e.message)
            throw e
        }
    },[])
    return { request, error, loading }
} 