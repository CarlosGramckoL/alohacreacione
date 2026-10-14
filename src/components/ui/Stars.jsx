import { Star } from 'lucide-react'

export function Stars({ count = 5 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: count }).map((_, index) => (
        <Star key={index} aria-hidden="true" className="h-4 w-4 fill-yellow text-yellow" />
      ))}
    </div>
  )
}
