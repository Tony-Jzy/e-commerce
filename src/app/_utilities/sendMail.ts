'use server'

import React from 'react'
import { Resend } from 'resend'
import ContactFormEmail from '../constants/email'

const resend = new Resend(process.env.RESEND_API_KEY)

export const sendEmail = async (formData: FormData) => {
  const senderEmail = formData.get('senderEmail')
  const message = formData.get('message')
  const senderFirstName = formData.get('senderFirstName')
  const senderLastName = formData.get('senderLastName')
  const senderPhone = String(formData.get('senderPhone'))

  // simple server-side validation
  if (!validateString(senderEmail, 500)) {
    return {
      error: 'Invalid sender email',
    }
  }
  if (!validateString(senderFirstName, 500)) {
    return {
      error: 'Invalid sender email',
    }
  }
  if (!validateString(senderLastName, 500)) {
    return {
      error: 'Invalid sender email',
    }
  }
  if (!validateString(senderPhone, 500)) {
    return {
      error: 'Invalid sender email',
    }
  }
  if (!validateString(message, 5000)) {
    return {
      error: 'Invalid message',
    }
  }

  let data
  try {
    data = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: 'info@eesupply.com.au',
      subject: 'Message from contact form by ' + senderFirstName + ' ' + senderLastName,
      reply_to: senderEmail,
      react: React.createElement(ContactFormEmail, {
        senderFirstName: senderFirstName,
        senderLastName: senderLastName,
        senderPhone: senderPhone,
        message: message,
        senderEmail: senderEmail,
      }),
    })
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    }
  }

  return {
    data,
  }
}

const validateString = (value: unknown, maxLength: number): value is string => {
  if (!value || typeof value !== 'string' || value.length > maxLength) {
    return false
  }

  return true
}

const getErrorMessage = (error: unknown): string => {
  let message: string

  // if (error instanceof Error) {
  //   message = error.message
  // } else if (error && typeof error === 'object' && 'message' in error) {
  //   message = String(error.message)
  // } else if (typeof error === 'string') {
  //   message = error
  // } else {
  message = 'Something went wrong'
  // }

  return message
}
