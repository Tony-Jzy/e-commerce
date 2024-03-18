'use client'
import { useState, useEffect } from 'react'

import classes from './index.module.scss'
import { Button } from '../Button'

const SearchBar = () => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    const fetchResults = async () => {
      // if (query.length > 2) {
      // Fetch results when query length is more than 2 characters
      // const response = await fetch(`/api/search?q=${query}`)
      // const data = await response.json()
      // setResults(data)
      setShowDropdown(true)
      // } else {
      //   setShowDropdown(false)
      // }
    }

    fetchResults()
  }, [query])

  return (
    <div className={classes.gutter}>
      <div className={classes.searchBar_container}>
        <input
          type="text"
          className={classes.search_input}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search For Products..."
        />

        <Button
          el="button"
          label="search"
          appearance="primary"
          className={classes.search_btn}
          onClick={() => (window.location.href = 'login')}
        />
      </div>
      {showDropdown && (
        <div className={classes.dropdown}>
          {results.map(result => (
            <div key={result.id} className={classes.dropdownItem}>
              <img src={result.image} alt={result.title} />
              <div>
                <h4>{result.title}</h4>
                <p>${result.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchBar
