'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'

import { User } from '../../../payload/payload-types'
import { Emails } from 'resend/build/src/emails/emails'
import { type } from 'os'

// eslint-disable-next-line no-unused-vars
type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<void>

type ForgotPassword = (args: { email: string }) => Promise<void> // eslint-disable-line no-unused-vars

type Create = (args: {
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
}) => Promise<void> // eslint-disable-line no-unused-vars

type Login = (args: { email: string; password: string }) => Promise<User> // eslint-disable-line no-unused-vars

type Logout = () => Promise<void>

type Refresh = () => Promise<void>

type AuthContext = {
  user?: User | null
  setUser: (user: User | null) => void // eslint-disable-line no-unused-vars
  logout: Logout
  login: Login
  create: Create
  resetPassword: ResetPassword
  forgotPassword: ForgotPassword
  refresh: Refresh
  status: undefined | 'loggedOut' | 'loggedIn'
}

const Context = createContext({} as AuthContext)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>()

  // used to track the single event of logging in or logging out
  // useful for `useEffect` hooks that should only run once
  const [status, setStatus] = useState<undefined | 'loggedOut' | 'loggedIn'>()
  const create = useCallback<Create>(async args => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/create`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
          password: args.password,
          passwordConfirm: args.passwordConfirm,
          name: args.name,
          businessName: args.businessName,
          position: args.position,
          phoneNumber: args.phoneNumber,
          ABN: args.ABN,
          ACN: args.ACN,
          address_1: args.address_1,
          address_2: args.address_2,
          state: args.state,
          suburb: args.suburb,
          postcode: args.postcode,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(data?.loginUser?.user)
        setStatus('loggedIn')
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const login = useCallback<Login>(async args => {
    try {
      // const resBackend = await fetch(
      //   `${process.env.NEXT_PUBLIC_EE_SUPPLY_SERVER_URL}/api/users/login/`,
      //   {
      //     method: 'POST',
      //     credentials: 'include',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //     body: JSON.stringify({
      //       email: args.email,
      //       password: args.password,
      //     }),
      //   },
      // )

      // if (resBackend.ok) {
      //   const response = await resBackend.json()
      //   if (response.status != 200) throw new Error(response.msg)

      const resFrontend = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
          password: args.password,
        }),
      })

      if (resFrontend.ok) {
        const { user, errors } = await resFrontend.json()
        if (errors) throw new Error(errors[0].message)
        setUser(user)
        setStatus('loggedIn')
        return user
      }
      // } else {
      //   const response = await resBackend.json()
      //   throw new Error(response.detail)
      // }

      throw new Error('Invalid login')
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const logout = useCallback<Logout>(async () => {
    try {
      // const resBackend = await fetch(
      //   `${process.env.NEXT_PUBLIC_EE_SUPPLY_SERVER_URL}/api/users/logout/`,
      //   {
      //     method: 'POST',
      //     credentials: 'include',
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // )

      // if (resBackend.ok) {
      //   const response = await resBackend.json()
      //   if (response.status != 200) throw new Error(response.msg)

      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        setUser(null)
        setStatus('loggedOut')
      } else {
        throw new Error('An error occurred while attempting to logout.')
      }
      // }
    } catch (e) {
      throw new Error('An error occurred while attempting to logout.')
    }
  }, [])

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/me`, {
          method: 'GET',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        if (res.ok) {
          const { user: meUser } = await res.json()
          setUser(meUser || null)
          setStatus(meUser ? 'loggedIn' : undefined)
        } else {
          throw new Error('An error occurred while fetching your account.')
        }
      } catch (e) {
        setUser(null)
        throw new Error('An error occurred while fetching your account.')
      }
    }

    fetchMe()
  }, [])

  const forgotPassword = useCallback<ForgotPassword>(async args => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/forgot-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: args.email,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(data?.loginUser?.user)
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const resetPassword = useCallback<ResetPassword>(async args => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/reset-password`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: args.password,
          passwordConfirm: args.passwordConfirm,
          token: args.token,
        }),
      })

      if (res.ok) {
        const { data, errors } = await res.json()
        if (errors) throw new Error(errors[0].message)
        setUser(data?.loginUser?.user)
        setStatus(data?.loginUser?.user ? 'loggedIn' : undefined)
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  const refresh = useCallback<Refresh>(async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_EE_SUPPLY_SERVER_URL}/api/users/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (res.ok) {
        const response = await res.json()
      } else {
        throw new Error('Invalid login')
      }
    } catch (e) {
      throw new Error('An error occurred while attempting to login.')
    }
  }, [])

  function setCookie(name, value, days) {
    let expires = ''
    if (days) {
      const date = new Date()
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
      expires = '; expires=' + date.toUTCString()
    }
    document.cookie = name + '=' + (value || '') + expires + '; path=/; Secure; SameSite=Strict'
  }

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        create,
        resetPassword,
        forgotPassword,
        refresh,
        status,
      }}
    >
      {children}
    </Context.Provider>
  )
}

type UseAuth<T = User> = () => AuthContext // eslint-disable-line no-unused-vars

export const useAuth: UseAuth = () => useContext(Context)
