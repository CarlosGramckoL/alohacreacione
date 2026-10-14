import { Link } from 'react-router-dom'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-extrabold tracking-tight transition-transform duration-200 hover:-translate-y-0.5 active:translate-y-0'

const variants = {
  primary: 'bg-pink text-ink hover:bg-yellow',
  yellow: 'bg-yellow text-ink hover:bg-coral',
  mint: 'bg-mint text-ink hover:bg-yellow',
  navy: 'bg-navy text-white hover:bg-navy-deep',
  ink: 'bg-ink text-white hover:bg-pink',
  outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
  outlineLight: 'border-2 border-white text-white hover:bg-white hover:text-ink',
}

function classesFor(variant, className) {
  return `${base} ${variants[variant] || variants.primary} ${className}`
}

export function Button({ variant = 'primary', className = '', children, ...props }) {
  return (
    <button className={classesFor(variant, className)} {...props}>
      {children}
    </button>
  )
}

export function ButtonLink({ to, href, variant = 'primary', className = '', children, ...props }) {
  if (to) {
    return (
      <Link to={to} className={classesFor(variant, className)} {...props}>
        {children}
      </Link>
    )
  }
  return (
    <a className={classesFor(variant, className)} href={href} {...props}>
      {children}
    </a>
  )
}
