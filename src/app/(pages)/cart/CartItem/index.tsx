'use client'

import React, { useState } from 'react'

import classes from './index.module.scss'
import Link from 'next/link'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import Image from 'next/image'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { cp } from 'fs'
import toast from 'react-hot-toast'

const CartItem = ({ product, title, metaImage, qty, changeItemToCart, index }) => {
  if (product === null || !product || product.title === 'undefined') {
    return null
  }

  const [quantity, setQuantity] = useState(qty)

  const href = `/products/${product.slug}`

  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1

    setQuantity(updatedQty)
    changeItemToCart({ product, quantity: Number(updatedQty) })
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1

    setQuantity(updatedQty)
    changeItemToCart({ product, quantity: Number(updatedQty) })
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)

    setQuantity(updatedQty)
    changeItemToCart({ product, quantity: Number(updatedQty) })
  }

  const subProduct = JSON.parse(product.subSKUList)[0]

  const ifPacked = title.indexOf('Pack') > -1

  const regex = /\(Pack:\s*(\d+)\)/
  const match = title.match(regex)

  const packCount = ifPacked ? (match ? parseInt(match[1]) : 1) : 1

  return (
    <li className={classes.item} key={title}>
      <Link href={href} className={classes.mediaWrapper}>
        {!metaImage && <span>No Image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6>{title + '(' + subProduct.subSKU + ')'}</h6>
          <Price product={product} button={false} quantity={packCount} />
        </div>

        <div className={classes.quantity}>
          {/* <div className={classes.quantityBtn} onClick={decrementQty}>
            <Image
              src="assets/icons/minus.svg"
              alt="minus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div> */}
          <input
            type="text"
            className={classes.quantityInput}
            value={quantity}
            onChange={enterQty}
          />
          {/* <div className={classes.quantityBtn} onClick={incrementQty}>
            <Image
              src="assets/icons/plus.svg"
              alt="plus"
              width={24}
              height={24}
              className={classes.qtnBt}
            />
          </div> */}
        </div>
      </div>

      <div className={classes.subtotalWrapper}>
        <Price product={product} button={false} quantity={quantity * packCount} />
        <RemoveFromCartButton product={product} />
      </div>
    </li>
  )
}

export default CartItem
