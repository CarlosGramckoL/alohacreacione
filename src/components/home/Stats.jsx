import { Container } from '../ui/Container.jsx'
import { BalloonDoodles } from '../ui/BalloonDoodles.jsx'
import { RisingBalloons } from '../ui/RisingBalloons.jsx'
import { useCountUp } from '../../hooks/useCountUp.js'
import { STATS } from '../../data/site.js'

const doodles = [
  { color: '#FFD23F', size: 38, style: { top: '10%', left: '2%' }, delay: '0s' },
  { color: '#2ED3C4', size: 28, style: { bottom: '12%', left: '4%' }, delay: '1.6s' },
  { color: '#FF7A5C', size: 32, style: { top: '14%', right: '2%' }, delay: '0.8s' },
  { color: '#114E8A', size: 26, style: { bottom: '14%', right: '4%' }, delay: '2.2s' },
]

function Stat({ value, suffix, label }) {
  const [ref, current, counting] = useCountUp(value)
  return (
    <div ref={ref} className="text-center">
      <p
        className={`font-display text-[clamp(4rem,11vw,7.5rem)] font-extrabold leading-[0.9] text-white transition-transform duration-500 ${
          counting ? 'scale-105' : 'scale-100'
        }`}
      >
        {current}
        <span className="text-white/90">{suffix}</span>
      </p>
      <p className="mt-6 inline-flex items-center gap-2 rounded-full border-2 border-ink bg-yellow px-6 py-2.5 text-[16px] font-extrabold text-ink">
        <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-ink" />
        {label}
      </p>
    </div>
  )
}

export function Stats() {
  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-pink">
      <RisingBalloons />
      <BalloonDoodles items={doodles} className="hidden sm:block" />
      <Container className="relative grid grid-cols-2 gap-10 py-20 sm:py-28">
        {STATS.map((stat) => (
          <Stat key={stat.label} {...stat} />
        ))}
      </Container>
    </section>
  )
}
