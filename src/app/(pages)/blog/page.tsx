import { Button } from '../../_components/Button'
import { Gutter } from '../../_components/Gutter'
import { VerticalPadding } from '../../_components/VerticalPadding'

export default function Blog() {
  return (
    <Gutter>
      <VerticalPadding top="none" bottom="large">
        <h1 style={{ marginBottom: 0, marginTop: '60px' }}>In development.</h1>
        <p style={{ marginBottom: '60px' }}>This page is still under development.</p>
        <Button href="/" label="Go Home" appearance="primary" />
      </VerticalPadding>
    </Gutter>
  )
}
