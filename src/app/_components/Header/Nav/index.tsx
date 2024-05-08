'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'

import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CartLink } from '../../CartLink'
import { CMSLink } from '../../Link'

import classes from './index.module.scss'
import { Button } from '../../Button'
import { ContactLink } from '../../ContactLink'

interface HeaderNavProps {
  header: HeaderType
  isVisible: boolean
  setVisible: (isVisible: boolean) => void // Add this line
}

export const HeaderNav: React.FC<HeaderNavProps> = ({ header, isVisible, setVisible }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()

  return (
    <nav className={[classes.nav, user === undefined && classes.hide].filter(Boolean).join(' ')}>
      {navItems.map(({ link }, i) => {
        return i == 1 ? (
          <div
            key={i}
            onClick={() => setVisible(!isVisible)}
            // onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => {
              setTimeout(() => setVisible(false), 200)
            }}
          >
            <CMSLink key={i} {...link} aboutTab={true} appearance="secondary" />
          </div>
        ) : (
          <CMSLink key={i} {...link} appearance="secondary" />
        )
      })}
      <CartLink />
      {user && <ContactLink />}
      {!user && (
        <Button
          el="link"
          href="/login"
          label="login"
          appearance="primary"
          onClick={() => (window.location.href = '/login')}
        />
      )}
    </nav>
  )
}
