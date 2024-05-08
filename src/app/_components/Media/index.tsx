import React, { ElementType, Fragment } from 'react'

import { Image } from './Image'
import { Props } from './types'
import { Video } from './Video'

export const Media: React.FC<Props> = props => {
  const { className, resource, htmlElement = 'div' } = props

  const isVideo = typeof resource !== 'string' && resource?.mimeType?.includes('video')
  const Tag = (htmlElement as ElementType) || Fragment

  return (
    <Tag
      style={{ width: '100%', height: '100%', position: 'relative' }}
      {...(htmlElement !== null
        ? {
            className,
          }
        : {})}
    >
      {isVideo ? <Video {...props} /> : <Image {...props} />}
    </Tag>
  )
}
