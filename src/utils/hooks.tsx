import { useEffect, RefObject, useLayoutEffect } from 'react'

export function useOnClickOutsideForm(
    ref: RefObject<HTMLDivElement>,
    isFormOpen: boolean,
    handler: () => void
) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent): void => {
            const sidebar = document.getElementById('sidebar')
            const form = ref?.current?.childNodes[0]
            const { target } = event

            if (!form || form.contains(target as Node) || sidebar?.contains(target as Node)) {
                return
            }
            handler()
        }
        document.addEventListener('mousedown', listener)
        document.addEventListener('touchstart', listener)
        return () => {
            document.removeEventListener('mousedown', listener)
            document.removeEventListener('touchstart', listener)
        }
    }, [ref, handler])

    useLayoutEffect(() => {
        const rootHTML = document.getElementsByTagName('html')[0]
        if (isFormOpen) {
            rootHTML.style.overflowY = 'hidden'
        } else {
            rootHTML.style.overflowY = 'auto'
        }
    }, [isFormOpen])
}
