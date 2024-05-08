'use client'

import React from 'react'
import classes from './index.module.scss'
import { sendEmail } from '../../_utilities/sendMail'
import toast from 'react-hot-toast'
import SubmitBtn from './SubmitBtn'
import Image from 'next/image'
import { useSectionInView } from '../../_utilities/hooks'

export default function ContactUs() {
  const { ref } = useSectionInView('Contact')

  return (
    <section id="contact" ref={ref} className={classes.contactUs}>
      <div>
        <h2>Contact Us</h2>
        <p>
          If you have any enquiries regarding your orders or products, feel free to contact us by
          email{' '}
          <a className="underline" href="mailto:example@gmail.com">
            info@eesupply.com.au
          </a>
          , phone, or fill out the form below.{' '}
        </p>
      </div>

      <div className={classes.contactCard}>
        <div className={classes.contactImage}>
          <Image
            src="/logo-big-black.png"
            width={60}
            height={60}
            alt="logo"
            className={classes.image}
          />
        </div>
        <div className={classes.contactInfo}>
          <p>
            <span className={classes.fontBold}>Phone:</span> (04) 1285-3961
          </p>
          <p>
            <span className={classes.fontBold}>Mobile:</span>
          </p>
          <p>
            <span className={classes.fontBold}>Email:</span> info@eesupply.com.au
          </p>
        </div>
      </div>

      <form
        className={classes.contactForm}
        action={async formData => {
          const { data, error } = await sendEmail(formData)

          if (error) {
            toast.error(error)
            return
          }

          toast.success('Email sent successfully!')
        }}
      >
        <div className={classes.inputRow}>
          <div className={classes.inputItem}>
            <label className={classes.label}>
              First name:<span className={classes.required}>*</span>
            </label>
            <input
              className={classes.nameInput}
              name="senderFirstName"
              type="text"
              required
              maxLength={50}
              placeholder="Your first name"
            />
          </div>
          <div className={classes.inputItem}>
            <label className={classes.label}>
              Last name:<span className={classes.required}>*</span>
            </label>
            <input
              className={classes.nameInput}
              name="senderLastName"
              type="text"
              required
              maxLength={50}
              placeholder="Your last name"
            />
          </div>
        </div>

        <div className={classes.inputRow}>
          <div className={classes.inputItem}>
            <label className={classes.label}>
              Email:<span className={classes.required}>*</span>
            </label>
            <input
              className={classes.nameInput}
              name="senderEmail"
              type="email"
              required
              maxLength={50}
              placeholder="Your Email"
            />
          </div>
          <div className={classes.inputItem}>
            <label className={classes.label}>
              Phone:<span className={classes.required}>*</span>
            </label>
            <input
              className={classes.nameInput}
              name="senderPhone"
              type="text"
              required
              maxLength={20}
              placeholder="Last name"
            />
          </div>
        </div>

        <label className={classes.label}>
          Message:<span className={classes.required}>*</span>
        </label>

        <textarea
          className={classes.message}
          name="message"
          placeholder="Your message"
          required
          maxLength={5000}
        />
        <SubmitBtn />
      </form>
    </section>
  )
}
