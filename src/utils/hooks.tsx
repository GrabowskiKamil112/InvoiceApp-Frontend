import { useEffect, RefObject } from 'react'

export function useOnClickOutsideForm(ref: RefObject<HTMLDivElement>, handler: () => void) {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent): void => {
            const form = ref?.current?.childNodes[0]

            if (!form || form.contains(event.target as Node)) {
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
}
