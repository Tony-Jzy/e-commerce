import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { anyone } from '../../access/anyone'
import adminsAndUser from './access/adminsAndUser'
import { checkRole } from './checkRole'
import { customerProxy } from './endpoints/customer'
import { createStripeCustomer } from './hooks/createStripeCustomer'
import { ensureFirstUserIsAdmin } from './hooks/ensureFirstUserIsAdmin'
import { loginAfterCreate } from './hooks/loginAfterCreate'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'
import { CustomerSelect } from './ui/CustomerSelect'
import { developer } from '../../access/developers'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'

const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    read: adminsAndUser,
    create: anyone,
    update: adminsAndUser,
    delete: admins,
    admin: ({ req: { user } }) => checkRole(['admin'], user) || checkRole(['developer'], user),
  },
  hooks: {
    beforeChange: [createStripeCustomer],
    afterChange: [loginAfterCreate],
  },
  auth: true,
  endpoints: [
    {
      path: '/:teamID/customer',
      method: 'get',
      handler: customerProxy,
    },
    {
      path: '/:teamID/customer',
      method: 'patch',
      handler: customerProxy,
    },
  ],
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'developer',
          value: 'developer',
        },
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
      ],
      hooks: {
        beforeChange: [ensureFirstUserIsAdmin],
      },
      access: {
        read: developer,
        create: developer,
        update: developer,
      },
    },
    {
      name: 'purchases',
      label: 'Purchases',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
    {
      name: 'stripeCustomerID',
      label: 'Stripe Customer',
      type: 'text',
      access: {
        read: developer,
      },
      admin: {
        position: 'sidebar',
        components: {
          Field: CustomerSelect,
        },
      },
    },
    {
      label: 'Cart',
      name: 'cart',
      type: 'group',
      fields: [
        {
          name: 'items',
          label: 'Items',
          type: 'array',
          interfaceName: 'CartItems',
          fields: [
            {
              name: 'product',
              type: 'relationship',
              relationTo: 'products',
            },
            {
              name: 'quantity',
              type: 'number',
              min: 0,
              admin: {
                step: 1,
              },
            },
          ],
        },
        // If you wanted to maintain a 'created on'
        // or 'last modified' date for the cart
        // you could do so here:
        // {
        //   name: 'createdOn',
        //   label: 'Created On',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
        // {
        //   name: 'lastModified',
        //   label: 'Last Modified',
        //   type: 'date',
        //   admin: {
        //     readOnly: true
        //   }
        // },
      ],
    },
    {
      name: 'skipSync',
      label: 'Skip Sync',
      type: 'checkbox',
      admin: {
        position: 'sidebar',
        readOnly: true,
        hidden: true,
      },
    },
    {
      name: 'phoneNumber',
      label: 'Phone Number',
      type: 'text',
    },
    {
      name: 'businessName',
      label: 'Business Name',
      type: 'text',
    },
    {
      name: 'position',
      label: 'Position',
      type: 'text',
    },
    {
      name: 'ABN',
      label: 'ABN',
      type: 'text',
    },
    {
      name: 'ACN',
      label: 'ACN',
      type: 'text',
    },
    {
      name: 'address_1',
      label: 'Address Line 1',
      type: 'text',
    },
    {
      name: 'address_2',
      label: 'Address Line 2',
      type: 'text',
    },
    {
      name: 'state',
      label: 'State',
      type: 'text',
    },
    {
      name: 'suburb',
      label: 'suburb',
      type: 'text',
    },
    {
      name: 'postcode',
      label: 'Postcode',
      type: 'text',
    },
  ],
  timestamps: true,
}

export default Users
