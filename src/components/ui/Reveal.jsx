import { useInView } from '../../hooks/useInView.js'

export function Reveal({ as: Tag = 'div', delay = 0, y = 28, className = '', children, ...props }) {
  const [ref, inView] = useInView({ once: true, threshold: 0.2, initial: false })

  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? 'reveal-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}s`, '--reveal-y': `${y}px` }}
      {...props}
    >
      {children}
    </Tag>
  )
}
