'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Gutter } from '../../_components/Gutter'
import { Media } from '../../_components/Media'
import { Message } from '../../_components/Message'
import { Price } from '../../_components/Price'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'
import SkuSelect from '../../_components/SkuSelect'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    id,
    stripeProductID,
    title,
    categories,
    SKU,
    isSubSKU,
    subSKU,
    priceRange,
    subSKUList,
    meta: { image: metaImage, description } = {},
  } = product

  if (product === null || !product || product.title === 'undefined') {
    return null
  }

  const [quantity, setQuantity] = useState(1)

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    setQuantity(updatedQty)
  }

  const [sku, setSku] = useState(
    isSubSKU
      ? subSKU
      : JSON.parse(subSKUList).length == 1
      ? JSON.parse(subSKUList)[0].subSKU
      : '-1',
  )

  const [productId, setProductId] = useState(
    isSubSKU ? id : JSON.parse(subSKUList).length == 1 ? JSON.parse(subSKUList)[0].id : '-1',
  )

  const [price, setPrice] = useState(
    JSON.parse(subSKUList).length == 1 ? JSON.parse(subSKUList)[0].price : 0,
  )

  const [highlight, setHighlight] = useState('SELECT FOR PRICING')

  const ifPacked = title.indexOf('Pack') > -1

  const regex = /\(Pack:\s*(\d+)\)/
  const match = title.match(regex)

  const packCount = ifPacked ? (match ? parseInt(match[1]) : 1) : 1

  function formatPrice(price: number | string) {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'AUD',
    })
  }

  useEffect(() => {
    const highlightPrice = price == 0 ? 'SELECT FOR PRICING' : ifPacked ? price * packCount : price
    setHighlight(
      formatPrice(highlightPrice) +
        ' ' +
        (price == 0 ? '' : ifPacked ? `/ Pack: ${packCount}` : ''),
    )
  }, [price])

  return (
    <Gutter className={classes.productHero}>
      <div className={classes.mediaWrapper}>
        {!metaImage && <div className={classes.placeholder}>No image</div>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media imgClassName={classes.image} resource={metaImage} fill />
        )}
      </div>

      <div className={classes.details}>
        <h3 className={classes.title}>{title}</h3>

        <div className={classes.categoryWrapper}>
          <div className={classes.categories}>
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                const isLast = index === categories.length - 1

                return (
                  <p key={index} className={classes.category}>
                    {titleToUse}
                    {!isLast && <Fragment>, &nbsp;</Fragment>}
                    <span className={classes.separator}>|</span>
                  </p>
                )
              }

              return null
            })}
          </div>

          <p className={classes.stock}>SKU: {`${SKU}`}</p>
        </div>

        <Price product={product} button={false} priceFromSKU={highlight} highlight={true} />

        <Price
          product={product}
          button={false}
          priceFromSKU={price === 0 ? priceRange : formatPrice(price)}
        />
        {subSKUList && JSON.parse(subSKUList).length > 1 && (
          <SkuSelect
            products={JSON.parse(subSKUList)}
            setProductId={setProductId}
            setPrice={setPrice}
            unit={(JSON.parse(product.specification)?.Unit || 'each').toUpperCase()}
          />
        )}

        <span className={classes.qtySpan}>Quantity:</span>
        <div className={classes.addCartContainer}>
          <div className={classes.quantity}>
            <input
              type="text"
              className={classes.quantityInput}
              value={quantity}
              onChange={enterQty}
            />
          </div>
          <AddToCartButton
            quantity={quantity}
            productId={productId}
            className={classes.addToCartButton}
            disabled={!productId || productId === '-1'}
          />
        </div>
      </div>
    </Gutter>
  )
}
