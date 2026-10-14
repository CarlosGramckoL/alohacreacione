import { Balloon } from './Balloon.jsx'

const BALLOONS = [
  { color: '#FFD23F', size: 46, left: '3%', delay: '0s', duration: '15s' },
  { color: '#2ED3C4', size: 34, left: '11%', delay: '6.5s', duration: '18s' },
  { color: '#FFFFFF', size: 40, left: '20%', delay: '2.2s', duration: '16s' },
  { color: '#114E8A', size: 30, left: '29%', delay: '9.5s', duration: '19s' },
  { color: '#FFD23F', size: 36, left: '38%', delay: '4.4s', duration: '14s' },
  { color: '#2ED3C4', size: 44, left: '47%', delay: '11.5s', duration: '17s' },
  { color: '#FFFFFF', size: 28, left: '56%', delay: '1.1s', duration: '20s' },
  { color: '#114E8A', size: 38, left: '65%', delay: '7.8s', duration: '16s' },
  { color: '#FFD23F', size: 32, left: '74%', delay: '3.3s', duration: '15s' },
  { color: '#2ED3C4', size: 42, left: '83%', delay: '10.4s', duration: '18s' },
  { color: '#FFFFFF', size: 30, left: '91%', delay: '5.6s', duration: '14s' },
  { color: '#114E8A', size: 34, left: '97%', delay: '12.5s', duration: '19s' },
]

export function RisingBalloons({ className = '' }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {BALLOONS.map((item, index) => (
        <div
          key={index}
          className="absolute bottom-0 animate-rise"
          style={{
            left: item.left,
            animationDelay: item.delay,
            animationDuration: item.duration,
          }}
        >
          <Balloon color={item.color} size={item.size} />
        </div>
      ))}
    </div>
  )
}
