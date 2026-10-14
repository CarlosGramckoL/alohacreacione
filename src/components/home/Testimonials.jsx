import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Container } from '../ui/Container.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Stars } from '../ui/Stars.jsx'
import { TESTIMONIALS } from '../../data/site.js'

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' })
  const [selected, setSelected] = useState(0)

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const node = emblaApi.rootNode()

    let startX = 0
    let dragged = false

    const onPointerDown = (event) => {
      startX = event.clientX
      dragged = false
    }
    const onPointerMove = (event) => {
      if (Math.abs(event.clientX - startX) > 8) dragged = true
    }
    const onClick = (event) => {
      if (dragged) return
      const rect = node.getBoundingClientRect()
      const ratio = (event.clientX - rect.left) / rect.width
      if (ratio < 0.16) {
        emblaApi.scrollPrev()
      } else if (ratio > 0.84) {
        emblaApi.scrollNext()
      }
    }

    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointermove', onPointerMove)
    node.addEventListener('click', onClick)

    return () => {
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointermove', onPointerMove)
      node.removeEventListener('click', onClick)
    }
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let id
    if (!reduce) id = setInterval(() => emblaApi.scrollNext(), 8000)

    return () => {
      if (id) clearInterval(id)
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])

  const controlClass =
    'flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white text-ink transition-transform hover:-translate-y-1 hover:bg-yellow'

  return (
    <section id="opinions" className="cv-auto scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading label="Kind words" title="What our clients say." />
          <div className="flex gap-2">
            <button type="button" onClick={scrollPrev} aria-label="Previous review" className={controlClass}>
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button type="button" onClick={scrollNext} aria-label="Next review" className={controlClass}>
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mt-12">
          <div
            className="overflow-hidden py-2 [mask-image:linear-gradient(to_right,black,black_86%,transparent)]"
            ref={emblaRef}
          >
            <div className="-mx-3 flex">
              {TESTIMONIALS.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="flex-[0_0_88%] px-3 sm:flex-[0_0_58%] lg:flex-[0_0_40%]"
                >
                  <figure className="flex h-full flex-col rounded-blob border-2 border-ink bg-pink-tint p-8 transition-colors duration-300 hover:bg-white hover:shadow-[6px_6px_0_0_var(--color-pink)]">
                    <Quote aria-hidden="true" className="h-8 w-8 fill-pink text-pink" />
                    <blockquote className="mt-4 flex-1 text-[16px] leading-relaxed text-ink">
                      &ldquo;{testimonial.text}&rdquo;
                    </blockquote>
                    <div className="mt-5">
                      <Stars />
                    </div>
                    <figcaption className="mt-5 flex items-center gap-3 border-t-2 border-dashed border-ink/20 pt-5">
                      <img
                        src={testimonial.image}
                        alt=""
                        loading="lazy"
                        className="h-12 w-12 rounded-full border-2 border-ink object-cover"
                      />
                      <span className="font-display text-lg font-extrabold text-ink">
                        {testimonial.name}
                      </span>
                    </figcaption>
                  </figure>
                </div>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-24 backdrop-blur-[7px] [mask-image:linear-gradient(to_left,black_25%,transparent)] sm:w-36"
          />
        </div>

        <div className="mt-8 flex gap-2">
          {TESTIMONIALS.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              aria-label={`Go to review ${index + 1}`}
              aria-current={selected === index}
              className={`h-2.5 rounded-full transition-all ${
                selected === index ? 'w-10 bg-pink' : 'w-2.5 bg-ink/20 hover:bg-ink/40'
              }`}
            />
          ))}
        </div>
      </Container>
    </section>
  )
}
