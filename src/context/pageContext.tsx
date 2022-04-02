import { createContext } from 'react'

interface ContextType {
    activeTheme: 'dark' | 'light'
    toggleTheme: () => void
}

const PageContext = createContext<ContextType>({} as ContextType)

export default PageContext
