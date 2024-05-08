'use client'

import React, { useEffect } from 'react'
import classes from './index.module.scss'
import AboutUs from '../../_components/AboutUs'
import { Gutter } from '../../_components/Gutter'

export default function Aboutus() {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <Gutter>
      <AboutUs />
    </Gutter>
  )
}
