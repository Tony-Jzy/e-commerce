import Link from 'next/link'
import classes from './index.module.scss' // Assume you have some basic CSS for styling
import { Gutter } from '../Gutter'

const Breadcrumb = ({ crumbs }) => {
  return (
    <Gutter>
      <nav className={classes.breadcrumb}>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          return (
            <span key={index} className={classes.crumb}>
              {!isLast ? (
                <Link href={crumb.path}>
                  <span>{crumb.name}</span>
                </Link>
              ) : (
                <span>{crumb.name}</span>
              )}
              {!isLast && <span className={classes.divider}>/</span>}
            </span>
          )
        })}
      </nav>
    </Gutter>
  )
}

export default Breadcrumb
