import { Container } from '../ui/Container.jsx'
import { BalloonDoodles } from '../ui/BalloonDoodles.jsx'

export function PageHeader({ label, title, description, breadcrumbs, children }) {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-pink-tint">
      <BalloonDoodles side="header" className="hidden md:block" />
      <Container className="relative py-14 sm:py-16">
        {breadcrumbs ? <div className="mb-6">{breadcrumbs}</div> : null}
        <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-4 py-2 text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink">
          {label}
        </span>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] text-navy">{title}</h1>
        {description ? (
          <p className="mt-5 max-w-2xl text-[17px] leading-relaxed text-ink-soft">{description}</p>
        ) : null}
        {children}
      </Container>
    </section>
  )
}
