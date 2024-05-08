'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'
import { RegisterInput } from '../../../_components/Input/RegisterInput'
import { StateSelectInput } from '../../../_components/Input/StateSelectInput'

import ReCAPTCHA from 'react-google-recaptcha'

type FormData = {
  name: string
  email: string
  code: string
  businessName: string
  phone: string
  ABN: string
  ACN: string
  address_1: string
  address_2: string
  state: string
  suburb: string
  postcode: string
  password: string
  passwordConfirm: string
}

const CreateAccountForm: React.FC = () => {
  const searchParams = useSearchParams()
  const allParams = searchParams.toString() ? `?${searchParams.toString()}` : ''
  const { login } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [countdown, setCountdown] = useState(null)
  const [codeSent, setCodeSent] = useState(false)
  const [entityName, setEntityName] = useState('')
  const [acn, setAcn] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEntityName(e.target.value)
  }

  const startCountdown = async () => {
    try {
      const timer = setInterval(() => {
        setCodeSent(true)
        setCountdown(prev => {
          if (prev === null) {
            return 60
          }
          if (prev === 0) {
            clearInterval(timer)
            return null
          }
          return prev - 1
        })
      }, 1000)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EE_SUPPLY_SERVER_URL}/api/users/sendVCode`,
        {
          method: 'POST',
          body: JSON.stringify({ email: watch('email') }),
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        setError('There was an error sending the code. Please try again.')
        return
      }
    } catch (error) {
      setError('There was an error sending the code. Please try again.')
    }
  }

  const verifyABN = async () => {
    resetVerify()
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_EE_SUPPLY_SERVER_URL}/api/abn/abn/${watch('ABN')}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      if (!response.ok) {
        setError('The ABN provided is invalid. Please try again.')
        return
      }
      const data = await response.json()
      if (data.EntityName && data.EntityName !== '') {
        // setEntityName(data.EntityName)
        setValue('businessName', data.EntityName)
      } else {
        setError('The ABN provided does not relate to a entity.')
      }
      if (data.Acn && data.Acn !== '') {
        setValue('ACN', data.Acn)
        // setAcn(data.Acn)
      }
    } catch (error) {
      setError('The ABN provided is invalid. Please try again.')
    }
  }

  function resetVerify() {
    setError(null)
    setEntityName('')
    setAcn('')
  }

  const onSubmit = useCallback(
    async (data: FormData) => {
      // const responseBackend = await fetch(
      //   `${process.env.NEXT_PUBLIC_EE_SUPPLY_SERVER_URL}/api/users/register`,
      //   {
      //     method: 'POST',
      //     body: JSON.stringify(data),
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // )

      // if (!responseBackend.ok) {
      //   const message = 'There was an error creating the account.'
      //   setError(message)
      //   return
      // }

      // const resp = await responseBackend.json()
      // if (resp.status !== 200) {
      //   setError(resp.msg)
      //   return
      // }

      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error creating the account.'
        setError(message)
        return
      }

      const redirect = searchParams.get('redirect')

      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        await login(data)
        clearTimeout(timer)
        if (redirect) router.push(redirect as string)
        else router.push(`/`)
        window.location.href = '/'
      } catch (_) {
        clearTimeout(timer)
        setError('There was an error with the credentials provided. Please try again.')
      }
    },
    [login, router, searchParams],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} className={classes.message} />
      <RegisterInput
        name="name"
        label="Full name (First name and surname)"
        required
        register={register}
        error={errors.name}
        type="text"
      />
      <RegisterInput
        name="email"
        label="Email"
        required
        register={register}
        error={errors.email}
        type="email"
        btnDisabled={countdown !== null}
        onClick={startCountdown}
        countdown={countdown}
      />

      <RegisterInput
        name="code"
        label="Verification Code"
        required
        disabled={!codeSent}
        placeholder={!codeSent ? 'Please enter your email to receive a code' : 'Enter code'}
        register={register}
        error={errors.email}
        type="text"
      />

      <RegisterInput
        name="phoneNumber"
        label="Phone Number"
        required
        register={register}
        error={errors.phone}
        type="text"
        placeholder="e.g. 0411222333"
      />

      <RegisterInput
        name="ABN"
        label="ABN"
        required
        register={register}
        error={errors.ABN}
        type="text"
        placeholder="e.g. 12123123123"
        onClick={verifyABN}
      />

      <RegisterInput
        name="ACN"
        label="ACN"
        register={register}
        error={errors.ACN}
        type="text"
        placeholder="e.g. 123123123"
      />

      <RegisterInput
        name="businessName"
        label="Business Name"
        required
        disabled
        register={register}
        error={errors.businessName}
        type="text"
        placeholder="Enter ABN to fetch verified business name"
      />

      <RegisterInput
        name="position"
        label="Position/Title"
        register={register}
        error={errors.name}
        type="text"
        placeholder="Your position at the Organisation"
      />

      <RegisterInput
        name="address_1"
        label="Adress Line 1"
        required
        register={register}
        error={errors.address_1}
        type="text"
        placeholder="Street address, P.O. box, company name, c/o"
      />

      <RegisterInput
        name="address_2"
        label="Adress Line 2"
        register={register}
        error={errors.address_2}
        type="text"
        placeholder="Apt, suite, unit, building, floor, etc."
      />

      <RegisterInput
        name="state"
        label="State"
        required
        register={register}
        error={errors.state}
        type="text"
        placeholder="State"
      />
      <RegisterInput
        name="suburb"
        label="Suburb"
        required
        register={register}
        error={errors.suburb}
        type="text"
        placeholder="Suburb"
      />
      <RegisterInput
        name="postcode"
        label="Postcode"
        required
        register={register}
        error={errors.postcode}
        type="text"
        placeholder="PostCode"
      />

      {/* <StateSelectInput /> */}

      <RegisterInput
        name="password"
        type="password"
        label="Password"
        required
        register={register}
        hint={
          'Password must contain at least one lowercase letter, one uppercase letter, and one digit, with a length of 8 - 16 characters.'
        }
        error={errors.password}
      />
      <RegisterInput
        name="passwordConfirm"
        type="password"
        label="Confirm Password"
        required
        register={register}
        validate={value => value === password.current || 'The passwords do not match'}
        error={errors.passwordConfirm}
      />
      {/* <ReCAPTCHA
        ref={useRef()}
        sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        onChange={value => console.log(value)}
      /> */}
      <Button
        type="submit"
        label={loading ? 'Processing' : 'Sign up'}
        disabled={loading}
        appearance="primary"
        className={classes.submit}
      />
      <div>
        {'Already have an account? '}
        <Link href={`/login${allParams}`}>Login</Link>
      </div>
    </form>
  )
}

export default CreateAccountForm
