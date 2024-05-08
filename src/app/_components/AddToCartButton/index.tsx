'use client'

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Product } from '../../../payload/payload-types'
import { useCart } from '../../_providers/Cart'
import { Button, Props } from '../Button'

import classes from './index.module.scss'
import toast from 'react-hot-toast'

export const AddToCartButton: React.FC<{
  quantity?: number
  productId: string
  className?: string
  appearance?: Props['appearance']
  disabled?: boolean
}> = props => {
  const { quantity, productId, className, appearance = 'primary', disabled } = props

  const { cart, addItemToCart, isProductInCart, hasInitializedCart } = useCart()

  let isInCart = false

  const router = useRouter()

  // useEffect(() => {
  //   setIsInCart(isProductInCart(product))
  // }, [isProductInCart, product, cart])

  return (
    <Button
      href={isInCart ? '/cart' : undefined}
      type={!isInCart ? 'button' : undefined}
      label={isInCart ? `✓ View in cart` : `Add to cart`}
      el={isInCart ? 'link' : undefined}
      appearance={appearance}
      className={[
        className,
        classes.addToCartButton,
        appearance === 'default' && isInCart && classes.green,
        !hasInitializedCart && classes.hidden,
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={
        !disabled
          ? async () => {
              const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products/${productId}`,
              )
              const data = await res.json()
              addItemToCart({
                product: data,
                quantity,
              })

              toast.success(quantity + ' of ' + data.title + ' added to cart!')

              // router.push('/cart')
            }
          : () => {
              toast.error('Please select one model from dropdown.')
            }
      }
    />
  )
}
