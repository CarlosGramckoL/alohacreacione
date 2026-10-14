import { Balloon } from './Balloon.jsx'

const PRESETS = {
  right: [
    { color: '#E93F7E', size: 86, style: { top: '1%', right: '1%' }, delay: '0s' },
    { color: '#2ED3C4', size: 62, style: { top: '19%', right: '13%' }, delay: '1.1s' },
    { color: '#FFD23F', size: 54, style: { top: '38%', right: '1%' }, delay: '0.5s' },
    { color: '#FF7A5C', size: 46, style: { top: '57%', right: '15%' }, delay: '1.8s' },
    { color: '#B98CFF', size: 42, style: { top: '76%', right: '2%' }, delay: '2.3s' },
    { color: '#114E8A', size: 36, style: { top: '48%', left: '1%' }, delay: '1.5s' },
  ],
  header: [
    { color: '#E93F7E', size: 52, style: { top: '8%', right: '2%' }, delay: '0s' },
    { color: '#FFD23F', size: 34, style: { top: '52%', right: '10%' }, delay: '1.2s' },
    { color: '#2ED3C4', size: 42, style: { top: '22%', right: '15%' }, delay: '0.6s' },
    { color: '#FF7A5C', size: 28, style: { top: '76%', right: '3%' }, delay: '1.9s' },
    { color: '#114E8A', size: 30, style: { top: '40%', right: '24%' }, delay: '1.4s' },
  ],
  left: [
    { color: '#E93F7E', size: 82, style: { top: '4%', left: '2%' }, delay: '0s' },
    { color: '#FFD23F', size: 54, style: { top: '38%', left: '12%' }, delay: '1.2s' },
    { color: '#2ED3C4', size: 64, style: { top: '16%', left: '24%' }, delay: '0.7s' },
    { color: '#FF7A5C', size: 44, style: { top: '60%', left: '3%' }, delay: '2s' },
    { color: '#114E8A', size: 40, style: { top: '76%', left: '20%' }, delay: '1.5s' },
  ],
}

export function BalloonDoodles({ items, side = 'left', className = '' }) {
  const balloons = items || PRESETS[side] || PRESETS.left

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {balloons.map((item, index) => (
        <div
          key={index}
          className="absolute animate-float"
          style={{ ...item.style, animationDelay: item.delay }}
        >
          <Balloon color={item.color} size={item.size} />
        </div>
      ))}
    </div>
  )
}
