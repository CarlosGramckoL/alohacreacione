const ITEMS = [
  'Bouquets',
  'Event décor',
  'Custom colours',
  'Miami delivery',
  'Arches & garlands',
  'Party styling',
]

const dotColors = ['#114E8A', '#FFD23F', '#2ED3C4']

export function Marquee({ items = ITEMS }) {
  const row = [...items, ...items]

  return (
    <div className="overflow-hidden border-y-2 border-ink bg-pink py-4">
      <div className="flex w-max animate-marquee">
        {row.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center gap-8 pr-8 whitespace-nowrap font-display text-2xl font-extrabold text-ink sm:text-3xl"
          >
            {item}
            <span aria-hidden="true" className="flex gap-1.5">
              {dotColors.map((color) => (
                <span key={color} className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: color }} />
              ))}
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
