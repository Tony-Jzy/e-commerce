import React from 'react'
import { FieldValues, UseFormRegister, Validate } from 'react-hook-form'

import classes from './index.module.scss'
import { Button } from '../../../_components/Button'
import e from 'express'

type Props = {
  name: string
  label: string
  register: UseFormRegister<FieldValues & any>
  required?: boolean
  error: any
  value?: string
  type?: 'text' | 'number' | 'password' | 'email'
  validate?: (value: string) => boolean | string
  disabled?: boolean
  btnDisabled?: boolean
  placeholder?: string
  onClick?: () => Promise<void>
  onInputChange?: (value: string) => void
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  countdown?: string
  hint?: string
}

export const RegisterInput: React.FC<Props> = ({
  name,
  label,
  required,
  register,
  error,
  value,
  type = 'text',
  validate,
  disabled,
  btnDisabled,
  placeholder,
  onClick,
  onInputChange,
  handleChange,
  countdown,
  hint,
}) => {
  return (
    <div className={classes.inputWrap}>
      <label htmlFor="name" className={classes.label}>
        {label}
        {required ? <span className={classes.asterisk}>&nbsp;*</span> : ''}
      </label>
      <label className={classes.label}>
        {hint ? <span className={classes.hint}>{hint}</span> : ''}
      </label>
      <div className={classes.inputContainer}>
        <input
          className={[classes.input, error && classes.error, disabled && classes.disabled]
            .filter(Boolean)
            .join(' ')}
          {...{ type }}
          {...register(name, {
            required,
            validate,
            ...(type === 'email'
              ? {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Please enter a valid email',
                  },
                }
              : {}),
          })}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="nope"
          value={value}
          onChange={e =>
            onInputChange ? onInputChange(e.target.value) : handleChange ? handleChange(e) : null
          }
        />
        {name == 'email' && (
          <Button
            type="button"
            label={countdown ? countdown : 'Send Code'}
            appearance="primary"
            disabled={btnDisabled}
            className={classes.sendCode}
            onClick={onClick}
          />
        )}
        {name == 'ABN' && (
          <Button
            type="button"
            label={'Verify'}
            appearance="primary"
            disabled={btnDisabled}
            className={classes.sendCode}
            onClick={onClick}
          />
        )}
      </div>
      {error && (
        <div className={classes.errorMessage}>
          {!error?.message && error?.type === 'required'
            ? 'This field is required'
            : error?.message}
        </div>
      )}
    </div>
  )
}
