'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'

import { Page, Settings } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { HR } from '../../../_components/HR'
import { LoadingShimmer } from '../../../_components/LoadingShimmer'
import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'
import { RemoveFromCartButton } from '../../../_components/RemoveFromCartButton'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'
import CartItem from '../CartItem'

export const CartPage: React.FC<{
  settings: Settings
  page: Page
}> = props => {
  const { settings } = props
  const { productsPage } = settings || {}

  const { user } = useAuth()

  const { cart, cartIsEmpty, changeItemToCart, cartTotal, hasInitializedCart } = useCart()

  const [gst, setGst] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const gstPercentage = 10 // GST rate
    const gstAmount = Math.round((cartTotal.raw * gstPercentage) / 100) / 100
    const totalAmount = (cartTotal.raw + gstAmount * 100) / 100 // Total includes GST

    setGst(gstAmount)
    setTotal(totalAmount)
  }, [cartTotal])

  return (
    <Fragment>
      <br />
      {!hasInitializedCart ? (
        <div className={classes.loading}>
          <LoadingShimmer />
        </div>
      ) : (
        <Fragment>
          {cartIsEmpty ? (
            <div className={classes.empty}>
              Your cart is empty.
              {typeof productsPage === 'object' && productsPage?.slug && (
                <Fragment>
                  {' '}
                  <Link href={`/${productsPage.slug}`}>Click here</Link>
                  {` to shop.`}
                </Fragment>
              )}
              {!user && (
                <Fragment>
                  {' '}
                  <Link href={`/login?redirect=%2Fcart`}>Log in</Link>
                  {` to view a saved cart.`}
                </Fragment>
              )}
            </div>
          ) : (
            <div className={classes.cartWrapper}>
              <div>
                <div className={classes.header}>
                  <p>Products</p>
                  <div className={classes.headerItemDetails}>
                    <p></p>
                    <p></p>
                    <p>Quantity</p>
                  </div>
                  <p className={classes.headersubtotal}>Subtotal</p>
                </div>
                <ul className={classes.itemsList}>
                  {cart?.items?.map((item, index) => {
                    if (typeof item.product === 'object') {
                      const {
                        quantity,
                        product,
                        product: { id, title, meta, stripeProductID },
                      } = item

                      const isLast = index === (cart?.items?.length || 0) - 1

                      const metaImage = meta?.image

                      return (
                        <CartItem
                          product={product}
                          title={title}
                          metaImage={metaImage}
                          qty={quantity}
                          changeItemToCart={changeItemToCart}
                          index={index}
                        />
                      )
                    }
                    return null
                  })}
                </ul>
              </div>

              <div className={classes.summary}>
                <div className={classes.row}>
                  <h6 className={classes.cartTotal}>Summary</h6>
                </div>
                <div className={classes.row}>
                  <p className={classes.cartTotal}>Cart Total</p>
                  <p className={classes.cartTotal}>{cartTotal.formatted}</p>
                </div>
                <div className={classes.row}>
                  <p className={classes.cartTotal}>GST</p>
                  <p className={classes.cartTotal}>
                    {gst.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'AUD',
                    })}
                  </p>
                </div>
                <div className={classes.row}>
                  <p className={classes.cartTotal}>Grand Total</p>
                  <p className={classes.cartTotal}>
                    {total.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'AUD',
                    })}
                  </p>
                </div>
                <Button
                  className={classes.checkoutButton}
                  href={user ? '/checkout' : '/login?redirect=%2Fcheckout'}
                  label={user ? 'Checkout' : 'Login to checkout'}
                  appearance="primary"
                />
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  )
}
