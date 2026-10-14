import { useEffect, useState } from 'react'
import { useInView } from './useInView.js'

export function useCountUp(target, duration = 2200) {
  const [ref, inView] = useInView({ threshold: 0.15 })
  const [value, setValue] = useState(target)

  useEffect(() => {
    if (!inView) return

    let frame
    const start = performance.now()

    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, target, duration])

  return [ref, value, inView && value < target]
}
