'use client'

import React, { useEffect, useState } from 'react'

import classes from './index.module.scss'
import { useFilter } from '../../../_providers/Filter'
import { Category } from '../../../../payload/payload-types'
import { Checkbox } from '../../../_components/Checkbox'
import { HR } from '../../../_components/HR'
import { RadioButton } from '../../../_components/Radio'
import exp from 'constants'
import Image from 'next/image'

const Filters = ({ categories }: { categories: Category[] }) => {
  const [expanded, setExpanded] = useState(true)
  const { categoryFilters, sort, setCategoryFilters, setSort } = useFilter()

  const handleCategories = (categoryId: string) => {
    if (categoryFilters.includes(categoryId)) {
      const updatedCategories = categoryFilters.filter(id => id !== categoryId)

      setCategoryFilters(updatedCategories)
    } else {
      setCategoryFilters([...categoryFilters, categoryId])
    }
  }

  const changeExpanded = () => {
    setExpanded(!expanded)
  }

  const handleSort = (value: string) => setSort(value)

  return (
    <div className={classes.filters}>
      <div className={classes.filterSpan} onClick={changeExpanded}>
        <span>Filters</span>
        {expanded ? (
          <Image
            src="/assets/icons/arrow-right.svg"
            className={classes.right}
            width={36}
            height={36}
            alt="arrow"
          />
        ) : (
          <Image
            src="/assets/icons/arrow-right.svg"
            className={classes.down}
            width={36}
            height={36}
            alt="arrow"
          />
        )}
      </div>
      <div className={expanded ? classes.filterBody : classes.hide}>
        <h6 className={classes.title}>Product Categories</h6>
        <div className={classes.categories}>
          {categories.map(category => {
            const isSelected = categoryFilters.includes(category.id)

            return (
              <Checkbox
                key={category.id}
                label={category.title}
                value={category.id}
                isSelected={isSelected}
                onClickHandler={handleCategories}
              />
            )
          })}
        </div>
        <HR className={classes.hr} />
        <h6 className={classes.title}> Sort By</h6>
        <div className={classes.categories}>
          <RadioButton
            label="latest"
            value="-createdAt"
            isSelected={sort === '-createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />

          <RadioButton
            label="Oldest"
            value="createdAt"
            isSelected={sort === 'createdAt'}
            onRadioChange={handleSort}
            groupName="sort"
          />
        </div>
      </div>
    </div>
  )
}

export default Filters
