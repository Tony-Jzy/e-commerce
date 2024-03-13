import React from 'react'
import { draftMode } from 'next/headers'
import { Page, Product } from '../../../payload/payload-types'
import { fetchDoc } from '../../_api/fetchDoc'
import { Blocks } from '../Blocks'

type Result = {
  docs: (Product | string)[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  page: number
  prevPage: number
  totalDocs: number
  totalPages: number
}

const PopularProducts = async () => {
  const { isEnabled: isDraftMode } = draftMode()

  let page: Page | null = null

  try {
    page = await fetchDoc<Page>({
      collection: 'pages',
      slug: 'home',
      draft: isDraftMode,
    })
  } catch (error) {
    console.log(error)
  }

  console.log(page)

  return <Blocks blocks={page?.layout} disableTopPadding={true} />
}

export default PopularProducts
