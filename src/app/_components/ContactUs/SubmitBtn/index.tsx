import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import classes from './index.module.scss'

export default function SubmitBtn() {
  const { pending } = useFormStatus()

  return (
    <button type="submit" className={classes.submitBtn} disabled={pending}>
      {pending ? (
        <div className={classes.submit}></div>
      ) : (
        <>
          Submit <FaPaperPlane className={classes.fa} />{' '}
        </>
      )}
    </button>
  )
}
