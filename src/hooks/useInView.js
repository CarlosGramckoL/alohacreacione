import { useEffect, useRef, useState } from 'react'

export function useInView({ threshold = 0.25, once = true, initial } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(() =>
    initial !== undefined ? initial : typeof IntersectionObserver === 'undefined',
  )

  useEffect(() => {
    const node = ref.current
    if (!node || typeof IntersectionObserver === 'undefined') return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold, once])

  return [ref, inView]
}
