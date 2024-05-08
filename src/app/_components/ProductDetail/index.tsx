import React from 'react'
import classes from './index.module.scss'
import { Product } from '../../../payload/payload-types'
import { Gutter } from '../Gutter'

export const ProductDetail: React.FC<{
  product: Product
}> = ({ product }) => {
  const { meta, specification } = product

  if (!specification) {
    return <></>
  }
  const json = JSON.parse(specification)
  const specs = Object.entries(json)

  return (
    <Gutter>
      <div className={classes.productDetails}>
        <div className={classes.titleBar}>
          {meta.description !== '' && (
            <div className={classes.leftColoumn}>
              <h5>DESCRIPTION</h5>
              <p>{meta.description || 'no content'}</p>
            </div>
          )}
          <div className={meta.description !== '' ? classes.rightColoumn : classes.fullColumn}>
            <h5>SPECIFICATION</h5>
            <div className={classes.specificationContent}>
              <ul className={classes.specList}>
                {specs &&
                  specs.map(([key, value], index) => (
                    <li key={index} className={classes.specListItem}>
                      <span className={classes.label}>{key}</span>
                      <span className={classes.value}>{String(value)}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Gutter>
  )
}
