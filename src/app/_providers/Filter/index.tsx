'use client'

import { createContext, ReactNode, SetStateAction, useContext, useState } from 'react'
import { set } from 'react-hook-form'

interface IContextType {
  categoryFilters: string[]
  setCategoryFilters: React.Dispatch<SetStateAction<string[]>>
  titleSearch: string
  setTitleSearch: React.Dispatch<SetStateAction<string>>
  sort: string
  setSort: React.Dispatch<SetStateAction<string>>
}

export const INITIAL_FILTER_DATA = {
  categoryFilters: [],
  setCategoryFilters: () => [],
  titleSearch: '',
  setTitleSearch: () => '',
  sort: '',
  setSort: () => '',
}

const FilterContext = createContext<IContextType>(INITIAL_FILTER_DATA)

export const FilterProvider = ({ children }: { children: ReactNode }) => {
  const [categoryFilters, setCategoryFilters] = useState([])
  const [titleSearch, setTitleSearch] = useState('')
  const [sort, setSort] = useState('-createdAt')

  return (
    <FilterContext.Provider
      value={{ categoryFilters, setCategoryFilters, titleSearch, setTitleSearch, sort, setSort }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export const useFilter = () => useContext(FilterContext)
