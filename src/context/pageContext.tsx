import { createContext } from 'react'

interface ContextType {
    activeTheme: string
    toggleTheme: () => void
}

const PageContext = createContext<ContextType>({} as ContextType)

export default PageContext
