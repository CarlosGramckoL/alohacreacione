import {
  Baby,
  Cake,
  Flower2,
  Gem,
  Gift,
  GraduationCap,
  Heart,
  PartyPopper,
  Sparkles,
  Sun,
} from 'lucide-react'

const ICONS = {
  heart: Heart,
  gem: Gem,
  cake: Cake,
  flower: Flower2,
  sun: Sun,
  gift: Gift,
  baby: Baby,
  cap: GraduationCap,
  sparkles: Sparkles,
  party: PartyPopper,
}

export function ThemeIcon({ name, className = '', ...props }) {
  const Icon = ICONS[name] || Sparkles
  return <Icon aria-hidden="true" className={className} {...props} />
}
