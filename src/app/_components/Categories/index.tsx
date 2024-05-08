import React from 'react'

import classes from './index.module.scss'
import Link from 'next/link'
import { Category } from '../../../payload/payload-types'
import CategoryCard from './CategoryCard'

const Categories = ({ categories }: { categories: Category[] }) => {
  return (
    <section className={classes.container}>
      <div className={classes.titleWrapper}>
        <div>
          <h2>Shop by Categories</h2>
          <p>
            EE Corporation offers all the tools, parts, pieces, storage and accessories you can
            think of.
          </p>
        </div>
        <Link href="/products">Show All</Link>
      </div>

      <div className={classes.list}>
        {categories.map(category => (
          <CategoryCard category={category} key={category.id} />
        ))}
      </div>
    </section>
  )
}

export default Categories
