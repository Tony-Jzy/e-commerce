'use client'

import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react'
import { INITIAL_FILTER_DATA } from '../Filter'

interface IContextType {
  title: string
  setTitle: React.Dispatch<SetStateAction<string>>
}

export const INITIAL_SEARCH_DATA = {
  title: '',
  setTitle: () => [],
}

const SearchContext = createContext<IContextType>(INITIAL_SEARCH_DATA)

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [title, setTitle] = useState('')

  return <SearchContext.Provider value={{ title, setTitle }}>{children}</SearchContext.Provider>
}

export const useSearch = () => useContext(SearchContext)
