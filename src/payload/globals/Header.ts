import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'
import { developer } from '../access/developers'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
    update: developer,
  },
  fields: [
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
