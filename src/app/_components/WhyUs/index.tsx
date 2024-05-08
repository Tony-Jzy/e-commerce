import classes from './index.module.scss'
import React from 'react'
import { inclusions } from '../../constants'
import Image from 'next/image'

export default function WhyUs() {
  return (
    <section className={classes.container}>
      <div>
        <h2>Why Choose Us?</h2>
      </div>
      <ul className={classes.inclusions}>
        {inclusions.map(inclusion => (
          <li key={inclusion.title} className={classes.item}>
            <Image
              src={inclusion.icon}
              alt={inclusion.title}
              width={200}
              height={200}
              className={classes.icon}
            />

            <h5 className={classes.title}>{inclusion.title}</h5>
            <p className={classes.content}>{inclusion.description}</p>
          </li>
        ))}
      </ul>
    </section>
  )
}
