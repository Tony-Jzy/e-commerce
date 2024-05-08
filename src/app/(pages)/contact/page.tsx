import React, { useEffect } from 'react'
import { Gutter } from '../../_components/Gutter'
import ContactUs from '../../_components/ContactUs'
import { Metadata } from 'next'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import ScrollUp from '../../_components/ScrollUp'

export default function contact() {
  return (
    <Gutter>
      <ContactUs />
      <ScrollUp />
    </Gutter>
  )
}

export const metadata: Metadata = {
  title: 'EE Corporation | Contact',
  description: 'Find contact information for EE Corporation or contact us with email.',
  openGraph: mergeOpenGraph({
    title: 'Contact',
    url: '/contact',
  }),
}
