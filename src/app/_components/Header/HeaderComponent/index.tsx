'use client'

import React, { useEffect, useState } from 'react'
import { Header } from '../../../../payload/payload-types'
import { Gutter } from '../../Gutter'
import Link from 'next/link'

import Image from 'next/image'
import { HeaderNav } from '../Nav'

import classes from './index.module.scss'
import { noHeaderFooterUrls } from '../../../constants'
import { usePathname } from 'next/navigation'
import HeaderDropdown from '../../HeaderDropdown'

const HeaderComponent = ({ header }: { header: Header }) => {
  const pathname = usePathname()
  const [scrolling, setScrolling] = useState(false)

  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => setScrolling(window.pageYOffset > 150))
    }
  })

  return (
    <>
      <nav
        className={[
          classes.header,
          noHeaderFooterUrls.includes(pathname) && classes.hide,
          scrolling && classes.small,
        ]
          .filter(Boolean)
          .join(` `)}
      >
        <div className={classes.wrap}>
          <Link href="/" className={classes.link}>
            <Image
              src="/logo-big-black.png"
              alt="logo"
              width={60}
              height={60}
              className={classes.logo}
            />
            <h3 className={classes.name}>EE Corporation</h3>
          </Link>

          <HeaderNav header={header} isVisible={isVisible} setVisible={setVisible} />
        </div>
      </nav>
      <HeaderDropdown isVisible={isVisible} isScroll={scrolling} />
    </>
  )
}

export default HeaderComponent
