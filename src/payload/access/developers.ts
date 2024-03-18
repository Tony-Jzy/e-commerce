import type { AccessArgs } from 'payload/config'

import { checkRole } from '../collections/Users/checkRole'
import type { User } from '../payload-types'

type isDeveloper = (args: AccessArgs<unknown, User>) => boolean

export const developer: isDeveloper = ({ req: { user } }) => {
  return checkRole(['developer'], user)
}
