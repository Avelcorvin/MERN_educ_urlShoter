import { useCallback } from 'react';
/**
 * этот хук просто выводит сообщение любое сообщение.
 * зачем он?
 * Он стилизует его  пр помощи css фреймворка
 */

export const useMessage = () => {
    return useCallback(text => {
        if (window.M && text) { 
            window.M.toast({ html: text })
        }
    }, [])
}