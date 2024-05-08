'use client'

import React, { useState } from 'react'

import classes from './index.module.scss'
import { Gutter } from '../Gutter'
import { useAuth } from '../../_providers/Auth'
import { usePathname } from 'next/navigation'
import { noHeaderFooterUrls } from '../../constants'

export default function HeaderDropdown({
  isVisible,
  isScroll,
}: {
  isVisible: boolean
  isScroll: boolean
}) {
  const [Visible, setVisible] = useState(false)
  const { user } = useAuth()
  const pathname = usePathname()

  return (
    <div
      className={[
        classes.dropdownContainer,
        !isVisible && !Visible && classes.translateY100,
        isScroll && classes.scrolled,
        noHeaderFooterUrls.includes(pathname) && classes.hide,
      ].join(` `)}
    >
      <Gutter className={classes.wrap}>
        <div className={[classes.menuContainer, user && classes.user].join(` `)}>
          <ul
            className={classes.menu}
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            <li className={classes.button} key={0}>
              <a href="/about">About Us</a>
            </li>
            <li className={classes.button} key={1}>
              <a href="/blog">Products Blog</a>
            </li>
          </ul>
        </div>
      </Gutter>
    </div>
  )
}
