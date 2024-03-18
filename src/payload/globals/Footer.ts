import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'
import { developer } from '../access/developers'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
    update: developer,
  },
  fields: [
    {
      name: 'copyright',
      label: 'Copyright',
      type: 'text',
      required: true,
    },
    {
      name: 'navItems',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
  ],
}
