import React, { Fragment } from 'react'
import Link from 'next/link'

import classes from './index.module.scss'
import Image from 'next/image'

export const ContactLink: React.FC<{
  className?: string
}> = props => {
  const { className } = props

  return (
    <Link className={[classes.cartLink, className].filter(Boolean).join(' ')} href="/account">
      <Fragment>
        <Image
          className={classes.image}
          src="/assets/icons/user-fill.svg"
          width={25}
          height={25}
          alt="cart"
        />
      </Fragment>
    </Link>
  )
}
