'use client'

import React, { useEffect, useMemo, useState } from 'react'
import Select, { components } from 'react-select'
import { states, ACT, NSW } from '../../../constants/states'

import classes from './index.module.scss'
import label from '../../../../payload/fields/richText/label'
import { set } from 'react-hook-form'
import { User } from 'payload/dist/auth'

export const StateSelectInput: React.FC<{
  state?: string
  suburb?: string
  post_code?: string
}> = props => {
  const { state, suburb, post_code } = props
  const [stateSelect, setStateSelect] = useState(null)
  const [suburbSelect, setSuburbSelect] = useState(false)
  const [suburbKey, setSuburbKey] = useState('suburb-key-0')
  const [postcode, setPostcode] = useState('')
  const [stateSelection, setStateSelection] = useState(null)
  const [suburbSelection, setSuburbSelection] = useState(null)

  useEffect(() => {
    if (state) {
      const selectedState = states.find(s => s.value === state)
      if (selectedState) {
        setStateSelection(selectedState)
        setStateSelect(selectedState)
      }
    }
  }, [])

  const suburbOptions = useMemo(() => {
    let target = []
    if (stateSelect === null) {
      target = []
    }
    if (stateSelect.value === 'ACT') {
      target = ACT
    }

    if (stateSelect.value === 'NSW') {
      target = NSW
    }

    if (suburb && target.length > 0) {
      const selectedSuburb = target.find(s => s.value === suburb)
      setSuburbSelection(selectedSuburb)
    }
    return target
  }, [stateSelect])

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: '#fff',
      borderColor: '#9e9e9e',
      minHeight: '35px',
      height: '35px',
      boxShadow: state.isFocused ? null : null,
    }),

    valueContainer: (provided, state) => ({
      ...provided,
      height: '35px',
      padding: '0 16px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '35px',
    }),
  }

  const handleChangeState = e => {
    setSuburbKey(`suburb-key-${Math.random()}`)
    setPostcode('')
    setStateSelect(e)
  }

  const CustomInput = props => {
    return <components.Input {...props} autoComplete="nope" />
  }

  return (
    <>
      <div className={classes.itemContainer}>
        <label htmlFor="name" className={classes.label}>
          State
          <span className={classes.asterisk}>&nbsp;*</span>
        </label>
        <Select
          instanceId="state-key-0"
          className={classes.stateSelect}
          options={states}
          value={stateSelection}
          isSearchable
          isClearable
          onChange={e => handleChangeState(e)}
          styles={customStyles}
          components={{ Input: CustomInput }}
          placeholder="Select State"
        />
      </div>

      <div className={classes.itemContainer}>
        <label htmlFor="name" className={classes.label}>
          Suburb & Postcode
          <span className={classes.asterisk}>&nbsp;*</span>
        </label>
        <div className={classes.selectContainer}>
          <Select
            instanceId={suburbKey}
            className={classes.suburbSelect}
            options={suburbSelect ? suburbOptions : []}
            isSearchable
            isClearable
            value={suburbSelection}
            onInputChange={e => {
              if (e.length > 0 && e !== ' ') {
                setSuburbSelect(true)
              } else if (e.length == 0 || e === ' ') {
                setSuburbSelect(false)
              }
            }}
            menuIsOpen={suburbSelect}
            onChange={e => e !== null && setPostcode(e.postcode)}
            styles={customStyles}
            components={{ Input: CustomInput }}
            placeholder="Input Suburb"
          />

          <input
            name="postcode"
            className={classes.postcodeInput}
            type="text"
            value={postcode}
            onChange={e => setPostcode(e.target.value)}
            placeholder="Postcode"
          />
        </div>
      </div>
    </>
  )
}
