import { useEffect, useRef } from 'react'

const usePrevious = <T>(prev: T) => {
  const prevRef = useRef<T>()

  useEffect(() => {
    prevRef.current = prev
  }, [prev])

  return prevRef.current
}

export default usePrevious
