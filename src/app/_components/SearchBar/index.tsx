'use client'
import { useState, useEffect } from 'react'

import classes from './index.module.scss'
import { Button } from '../Button'
import { useFilter } from '../../_providers/Filter'
import Image from 'next/image'

const SearchBar = () => {
  const { titleSearch, setTitleSearch } = useFilter()
  const [query, setQuery] = useState('')
  const [show, setShow] = useState(false)

  const handleChange = e => {
    setQuery(e.target.value)
    setTitleSearch(e.target.value)
  }

  useEffect(() => {
    if (query.length > 0) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [query])

  return (
    <div className={classes.gutter}>
      <div className={classes.searchBar_container}>
        <input
          type="text"
          className={classes.search_input}
          value={query}
          onChange={e => handleChange(e)}
          placeholder="Search products by name..."
        />
        <button
          className={[classes.reset, show && classes.show].join(' ')}
          onClick={() => {
            setQuery('')
            setTitleSearch('')
          }}
        >
          <Image src="/assets/icons/close.svg" alt="left arrow" width={24} height={24} />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
