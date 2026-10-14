const dotColors = ['bg-pink', 'bg-yellow', 'bg-mint', 'bg-navy']

export function SectionHeading({ label, title, description, align = 'left', size = 'lg', id }) {
  const center = align === 'center'
  const titleSize = size === 'lg' ? 'text-[clamp(2.25rem,5vw,3.75rem)]' : 'text-[clamp(1.85rem,3.5vw,2.75rem)]'

  return (
    <div
      className={`flex max-w-2xl flex-col ${center ? 'mx-auto items-center text-center' : 'items-start text-left'}`}
    >
      {label ? (
        <span className="mb-4 inline-flex items-center gap-2.5 rounded-full border-2 border-navy/20 bg-white px-4 py-1.5 text-[13px] font-extrabold uppercase tracking-[0.12em] text-navy">
          <span aria-hidden="true" className="flex gap-1">
            {dotColors.map((color) => (
              <span key={color} className={`h-2 w-2 rounded-full ${color}`} />
            ))}
          </span>
          {label}
        </span>
      ) : null}
      <h2 id={id} className={titleSize}>
        {title}
      </h2>
      {description ? (
        <p className="mt-5 max-w-xl text-[17px] leading-relaxed text-ink-soft">{description}</p>
      ) : null}
    </div>
  )
}
