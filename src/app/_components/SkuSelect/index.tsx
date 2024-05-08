import classes from './index.module.scss'
import { Product } from '../../../payload/payload-types'
import Select, { ControlProps, components } from 'react-select'

export interface ColourOption {
  readonly value: string
  readonly label: string
  readonly price: number
}

export default function SkuSelect({
  products,
  setProductId,
  setPrice,
  unit,
}: {
  products: Object[]
  setProductId: (sku: string) => void
  setPrice: (price: number) => void
  unit?: string
}) {
  const options = products.map((product: Object) => ({
    value: product['id'],
    subSKU: product['subSKU'],
    label: product['title'],
    price: product['price'],
  }))

  function formatPrice(price: number | string) {
    return price.toLocaleString('en-US', {
      style: 'currency',
      currency: 'AUD',
    })
  }

  const formatOptionLabel = ({ value, subSKU, label, price }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignContent: 'center',
        fontSize: '15px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'left',
          padding: '0 -10px',
          lineHeight: '34px',
        }}
      >
        <div>{label}</div>
        <div style={{ color: 'rgb(149, 153, 163)' }}>{'Sub_SKU: ' + subSKU}</div>
      </div>
      <div style={{ height: '68px', lineHeight: '68px', fontSize: '14px', paddingRight: '20px' }}>
        {formatPrice(price) + (unit ? ` / ${unit}` : '')}
      </div>
    </div>
  )

  const handleChangeSKU = e => {
    setProductId(e !== null ? e.value : null)
    setPrice(e !== null ? e.price : 0)
  }

  const customStyles = {
    valueContainer: (provided, state) => ({
      ...provided,
      height: '68px',
    }),

    input: (provided, state) => ({
      ...provided,
      margin: '0px',
    }),
    indicatorSeparator: state => ({
      display: 'none',
    }),
    indicatorsContainer: (provided, state) => ({
      ...provided,
      height: '68px',
    }),
  }

  return (
    <>
      <span className={classes.qtySpan}>Select models:</span>
      <Select
        instanceId={'sku-select'}
        className={classes.skuSelect}
        formatOptionLabel={formatOptionLabel}
        options={options}
        styles={customStyles}
        // value={sku}
        onChange={e => handleChangeSKU(e)}
      />
    </>
  )
}
