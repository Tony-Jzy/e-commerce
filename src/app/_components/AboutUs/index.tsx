'use client'

import React from 'react'
import classes from './index.module.scss'
import Image from 'next/image'
import { useSectionInView } from '../../_utilities/hooks'

export default function AboutUs() {
  const { ref } = useSectionInView('AboutUs')

  return (
    <section id="about" ref={ref} className={classes.container}>
      <div>
        <h2>About Us</h2>
      </div>

      <div className={classes.imageContainer}>
        <Image
          src="/admin ui/hero/hero-5.jpg"
          width={960}
          height={600}
          alt="hero-5"
          className={classes.backImage}
        />
      </div>

      <div className={classes.introContainer}>
        <div className={classes.bigTextContainer}>
          <p>
            <span className={classes.fontBold}>EE Corporation</span> Operatingis a company dedicated
            to providing real estate building materials, wrapping film, and various fasteners.
          </p>
        </div>

        <div className={classes.imageContainer}>
          <Image
            src="/admin ui/hero/hero-7.jpg"
            width={960}
            height={600}
            alt="hero-7"
            className={classes.backImage}
          />
        </div>
        <div className={classes.textContainer}>
          <p>
            <strong>
              {' '}
              We are committed to providing customers with high-quality and reliable products and
              services.
            </strong>{' '}
            As your trusted partner, we not only offer a diverse selection of products but also
            prioritize quality control and customer satisfaction. Our team has extensive industry
            experience and can provide you with professional advice and solutions. Whether you are
            looking for real estate building materials, wrapping film, or fasteners, EE Corporation
            Operating will wholeheartedly serve you to meet your needs and create greater value for
            you.
          </p>
        </div>
      </div>

      <div className={classes.imageContainer}>
        <Image
          src="/admin ui/hero/hero-6.jpg"
          width={960}
          height={600}
          alt="hero-5"
          className={classes.backImage}
        />
      </div>
      <div className={classes.storyContainer}></div>
    </section>
  )
}
