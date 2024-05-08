'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { useCart } from '../../_providers/Cart'

import classes from './index.module.scss'
import Image from 'next/image'

export const CartLink: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const { cart } = useCart()
  const [length, setLength] = useState<number>()

  useEffect(() => {
    setLength(cart?.items?.length || 0)
  }, [cart])

  return (
    <Link className={[classes.cartLink, className].filter(Boolean).join(' ')} href="/cart">
      <Fragment>
        <Image
          className={classes.image}
          src="/assets/icons/cart-fill.svg"
          width={25}
          height={25}
          alt="cart"
        />
        <span className={classes.label}>
          {typeof length === 'number' && length > 0 && (
            <small className={classes.quantity}>({length})</small>
          )}
        </span>
      </Fragment>
    </Link>
  )
}
