'use client'

import React, { useEffect, useState } from 'react'

import { Product } from '../../../payload/payload-types'

import classes from './index.module.scss'

export const priceFromJSON = (
  priceJSON: string,
  quantity: number = 1,
  priceRange?: string,
  unit?: string,
  raw?: boolean,
): string => {
  let price = ''

  if (priceRange) {
    return priceRange + (unit ? ` / ${unit}` : '')
  }

  if (priceJSON) {
    try {
      const parsed = JSON.parse(priceJSON)?.data[0]
      const priceValue = parsed.unit_amount * quantity
      const priceType = parsed.type

      if (raw) return priceValue.toString()

      price = (priceValue / 100).toLocaleString('en-US', {
        style: 'currency',
        currency: 'AUD', // TODO: use `parsed.currency`
      })

      if (priceType === 'recurring') {
        price += `/${
          parsed.recurring.interval_count > 1
            ? `${parsed.recurring.interval_count} ${parsed.recurring.interval}`
            : parsed.recurring.interval
        }`
      }
    } catch (e) {
      console.error(`Cannot parse priceJSON`) // eslint-disable-line no-console
    }
  }

  return price + (unit ? ` / ${unit}` : '')
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
  priceFromSKU?: string
  highlight?: boolean
}> = props => {
  const {
    product,
    product: { priceJSON, specification } = {},
    button = 'addToCart',
    quantity,
    priceFromSKU,
    highlight = false,
  } = props

  const unit = (JSON.parse(specification)?.Unit || 'each').toUpperCase()

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
  }>(() => ({
    actualPrice: priceFromJSON(priceJSON, 1, priceFromSKU, unit),
    withQuantity: priceFromJSON(priceJSON, quantity, priceFromSKU, unit),
  }))

  useEffect(() => {
    setPrice({
      actualPrice: priceFromJSON(priceJSON, 1, priceFromSKU),
      withQuantity: priceFromJSON(priceJSON, quantity, priceFromSKU),
    })
  }, [priceJSON, priceFromSKU, quantity])

  return (
    <div className={classes.actions}>
      {typeof price?.actualPrice !== 'undefined' && price?.withQuantity !== '' && (
        <div className={[classes.price, highlight && classes.highlight].join(' ')}>
          <p>
            {priceFromSKU !== null && priceFromSKU !== undefined
              ? priceFromSKU + (!highlight ? (unit ? ` / ${unit}` : '') : '')
              : price?.withQuantity}
          </p>
        </div>
      )}
    </div>
  )
}
