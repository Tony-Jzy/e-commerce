import React from 'react'

import classes from './index.module.scss'
import { Gutter } from '../../_components/Gutter'
import Filters from './Filters'
import { Blocks } from '../../_components/Blocks'
import { Category, Page } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { draftMode } from 'next/headers'
import { fetchDocs } from '../../_api/fetchDocs'
import { HR } from '../../_components/HR'
import SearchBar from '../../_components/SearchBar'
import { generateMeta } from '../../_utilities/generateMeta'
import { productsPage } from '../../../payload/seed/products-page'
import { Metadata } from 'next'
import ScrollUp from '../../_components/ScrollUp'

export default async function Products() {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null
  let categories: Category[] | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'products',
      draft: isDraftMode,
    })

    categories = await fetchDocs<Category>('categories')
  } catch (error) {
    console.log(error)
  }

  return (
    <div className={classes.container}>
      <Gutter className={classes.products}>
        <Filters categories={categories} />

        <div>
          <SearchBar />
          <Blocks blocks={page?.layout} disableTopPadding={true} />
        </div>
      </Gutter>
      <HR />

      <ScrollUp />
    </div>
  )
}

export async function generateMetadata({ params: { slug = 'products' } }): Promise<Metadata> {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug,
      draft: isDraftMode,
    })
  } catch (error) {
    // don't throw an error if the fetch fails
    // this is so that we can render a static home page for the demo
    // when deploying this template on Payload Cloud, this page needs to build before the APIs are live
    // in production you may want to redirect to a 404  page or at least log the error somewhere
  }

  return generateMeta({ doc: page })
}
