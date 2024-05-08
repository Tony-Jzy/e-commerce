'use client'
import { useEffect, useState } from 'react'
import classes from './index.module.scss'

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false)

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true)
    } else {
      setIsVisible(false)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  return (
    <div className={classes.scrollToTop}>
      {isVisible && (
        <button onClick={scrollToTop} className={classes.scrollTopButton}>
          ↑
        </button>
      )}
    </div>
  )
}

export default ScrollToTop
