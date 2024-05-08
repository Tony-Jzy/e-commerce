'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Input } from '../../../_components/Input'
import { Message } from '../../../_components/Message'
import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'
import { StateSelectInput } from '../../../_components/Input/StateSelectInput'

type FormData = {
  name: string
  email: string
  businessName: string
  position: string
  phoneNumber: string
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

const AccountForm: React.FC = () => {
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const { user, setUser } = useAuth()
  const [changePassword, setChangePassword] = useState(false)
  const [address, setAddress] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
    watch,
  } = useForm<FormData>()

  const password = useRef({})
  password.current = watch('password', '')

  const router = useRouter()

  const onSubmit = useCallback(
    async (data: FormData) => {
      if (user) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/${user.id}`, {
          // Make sure to include cookies with fetch
          credentials: 'include',
          method: 'PATCH',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (response.ok) {
          const json = await response.json()
          setUser(json.doc)
          setSuccess('Successfully updated account.')
          setError('')
          setChangePassword(false)
          reset({
            email: user.email,
            name: user.name,
            password: '',
            passwordConfirm: '',
            businessName: user.businessName,
            position: user.position,
            phoneNumber: user.phoneNumber,
            ABN: user.ABN,
            ACN: user.ACN,
            address_1: user.address_1,
            address_2: user.address_2,
            state: user.state,
            suburb: user.suburb,
            postcode: user.postcode,
          })
        } else {
          setError('There was a problem updating your account.')
        }
      }
    },
    [user, setUser, reset],
  )

  useEffect(() => {
    if (user === null) {
      router.push(
        `/login?error=${encodeURIComponent(
          'You must be logged in to view this page.',
        )}&redirect=${encodeURIComponent('/account')}`,
      )
    }

    // Once user is loaded, reset form to have default values
    if (user) {
      reset({
        email: user.email,
        name: user.name,
        password: '',
        passwordConfirm: '',
        businessName: user.businessName,
        position: user.position,
        phoneNumber: user.phoneNumber,
        ABN: user.ABN,
        ACN: user.ACN,
        address_1: user.address_1,
        address_2: user.address_2,
        state: user.state,
        suburb: user.suburb,
        postcode: user.postcode,
      })

      setAddress(user)
    }
  }, [user, router, reset, changePassword])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      <Message error={error} success={success} className={classes.message} />
      {!changePassword ? (
        <Fragment>
          <Input
            name="email"
            label="Email Address"
            required
            disabled
            register={register}
            error={errors.email}
            type="email"
          />
          <Input name="name" label="Name" required register={register} error={errors.name} />

          <Input
            name="phoneNumber"
            label="Phone Number"
            required
            register={register}
            error={errors.phoneNumber}
            type="text"
          />

          <Input
            name="position"
            label="Position/Title"
            register={register}
            error={errors.name}
            type="text"
          />
          <Input
            name="businessName"
            label="Business Name"
            required
            disabled
            register={register}
            error={errors.businessName}
            type="text"
          />

          <Input
            name="ABN"
            label="ABN"
            required
            disabled
            register={register}
            error={errors.ABN}
            type="text"
          />

          <Input
            name="ACN"
            label="ACN"
            disabled
            register={register}
            error={errors.ACN}
            type="text"
          />

          <Input
            name="address_1"
            label="Adress Line 1"
            required
            register={register}
            error={errors.address_1}
            type="text"
          />

          <Input
            name="address_2"
            label="Adress Line 2"
            register={register}
            error={errors.address_2}
            type="text"
          />

          <Input
            name="state"
            label="State"
            required
            register={register}
            error={errors.state}
            type="text"
          />

          <Input
            name="suburb"
            label="Suburb"
            required
            register={register}
            error={errors.suburb}
            type="text"
          />

          <Input
            name="postcode"
            label="Postcode"
            required
            register={register}
            error={errors.postcode}
            type="text"
          />

          {/* {address && (
            <StateSelectInput
              state={address.state}
              suburb={address.suburb}
              post_code={address.postcode}
            />
          )} */}

          <p>
            {'Change your account details below, or '}
            <button
              type="button"
              className={classes.changePassword}
              onClick={() => setChangePassword(!changePassword)}
            >
              click here
            </button>
            {' to change your password.'}
          </p>
        </Fragment>
      ) : (
        <Fragment>
          <p>
            {'Change your password below, or '}
            <button
              type="button"
              className={classes.changePassword}
              onClick={() => setChangePassword(!changePassword)}
            >
              cancel
            </button>
            .
          </p>
          <Input
            name="password"
            type="password"
            label="Password"
            required
            register={register}
            error={errors.password}
          />
          <Input
            name="passwordConfirm"
            type="password"
            label="Confirm Password"
            required
            register={register}
            validate={value => value === password.current || 'The passwords do not match'}
            error={errors.passwordConfirm}
          />
        </Fragment>
      )}
      <Button
        type="submit"
        label={isLoading ? 'Processing' : changePassword ? 'Change Password' : 'Update Account'}
        disabled={isLoading}
        appearance="primary"
        className={classes.submit}
      />
    </form>
  )
}

export default AccountForm
