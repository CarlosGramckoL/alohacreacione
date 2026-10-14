import { useEffect, useState } from 'react'
import { ArrowRight, Mail, MapPin, Star } from 'lucide-react'
import { Container } from '../ui/Container.jsx'
import { ButtonLink } from '../ui/Button.jsx'
import { BalloonDoodles } from '../ui/BalloonDoodles.jsx'
import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons.jsx'
import { HERO_SLIDES, CONTACT } from '../../data/site.js'
import { useWhatsAppLink } from '../../hooks/useWhatsApp.js'

const SLIDE_MS = 6000

const MOBILE_BALLOONS = [
  { color: '#E93F7E', size: 44, style: { top: '3%', right: '4%' }, delay: '0s' },
  { color: '#2ED3C4', size: 30, style: { top: '44%', right: '7%' }, delay: '1.2s' },
  { color: '#FFD23F', size: 34, style: { top: '38%', left: '4%' }, delay: '0.6s' },
]

function PopText({ text, id }) {
  return (
    <>
      {text.split(' ').map((word, index) => (
        <span
          key={`${id}-${index}`}
          className="mr-[0.28em] inline-block animate-pop-word"
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          {word}
        </span>
      ))}
    </>
  )
}

export function Hero() {
  const [{ index, prev }, setSlide] = useState({ index: 0, prev: -1 })
  const whatsappHref = useWhatsAppLink()

  useEffect(() => {
    const id = setInterval(
      () => setSlide((state) => ({ index: (state.index + 1) % HERO_SLIDES.length, prev: state.index })),
      SLIDE_MS,
    )
    return () => clearInterval(id)
  }, [])

  const show = (next) => setSlide((state) => ({ index: next, prev: state.index }))
  const active = HERO_SLIDES[index]
  const outgoing = prev >= 0 && prev !== index ? HERO_SLIDES[prev] : null

  return (
    <section className="relative overflow-hidden bg-pink-tint">
      <div className="mx-auto w-full max-w-[1440px]">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
        <div className="order-2 flex flex-col justify-center lg:order-1">
          <Container className="py-5 sm:py-12 lg:py-24">
            <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-white px-3.5 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink sm:px-4 sm:py-2 sm:text-[13px]">
              <Star aria-hidden="true" className="h-3.5 w-3.5 fill-yellow text-yellow" />
              Miami balloon studio
            </span>

            <h1 className="mt-4 min-h-[4.75rem] text-[clamp(2rem,7vw,4.75rem)] sm:mt-7 sm:min-h-[7rem] lg:min-h-[9.75rem]">
              <PopText text={active.title} id={String(index)} />
            </h1>

            <p className="mt-2 min-h-[3.75rem] max-w-xl text-[16px] leading-relaxed text-ink-soft sm:mt-5 sm:min-h-[5.6rem] sm:text-[21px] lg:min-h-[4.4rem]">
              {active.text}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3 sm:mt-8">
              <ButtonLink
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Book on WhatsApp
              </ButtonLink>
              <ButtonLink to="/bouquet" variant="navy">
                See our work
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </ButtonLink>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[14px] font-semibold text-ink sm:mt-9 sm:gap-x-6 sm:gap-y-3 sm:text-[15px]">
              <span className="inline-flex items-center gap-2">
                <MapPin aria-hidden="true" className="h-4 w-4 text-pink" />
                {CONTACT.address}
              </span>
              <span className="flex items-center gap-3">
                <a
                  href={CONTACT.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform hover:-translate-y-1"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href={CONTACT.emailHref}
                  aria-label="Email"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-ink transition-transform hover:-translate-y-1"
                >
                  <Mail aria-hidden="true" className="h-4 w-4" />
                </a>
              </span>
            </div>
          </Container>
        </div>

        <div className="relative order-1 lg:order-2 lg:min-h-[740px]">
          <BalloonDoodles items={MOBILE_BALLOONS} className="z-30 sm:hidden" />
          <BalloonDoodles side="right" className="z-30 hidden sm:block" />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-4 translate-x-2 translate-y-2 rounded-[28px] bg-yellow sm:inset-8 sm:translate-x-4 sm:translate-y-4 sm:rounded-[46px] sm:rounded-tr-[130px]"
          />

          <div className="relative m-4 h-[clamp(180px,36svh,400px)] overflow-hidden rounded-[28px] border-4 border-ink bg-white sm:m-8 sm:h-auto sm:aspect-[4/3] sm:rounded-[46px] sm:rounded-tr-[130px] lg:absolute lg:inset-8 lg:h-auto lg:aspect-auto">
            {outgoing ? (
              <img
                key={`prev-${prev}`}
                src={outgoing.image.src}
                srcSet={outgoing.image.srcset}
                sizes="(min-width: 1024px) 50vw, 100vw"
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover"
              />
            ) : null}

            <img
              key={index}
              src={active.image.src}
              srcSet={active.image.srcset}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={active.eyebrow}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full animate-hero-in object-cover"
            />

            <div className="absolute bottom-5 right-5 z-20 w-[30%] rotate-[7deg] overflow-hidden rounded-[18px] border-4 border-ink bg-white shadow-xl">
              <img
                src={HERO_SLIDES[(index + 1) % HERO_SLIDES.length].image.src}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="aspect-square w-full object-cover"
              />
            </div>

            <div className="absolute left-5 top-5 z-20 rotate-[9deg] rounded-full border-2 border-ink bg-mint px-4 py-2 text-[13px] font-extrabold text-ink">
              Delivery all over Miami
            </div>

            <div className="absolute bottom-5 left-5 z-20 w-[56%] max-w-[320px]">
              <div className="flex items-center gap-3 rounded-full border-2 border-ink bg-white/95 px-4 py-2.5">
                {HERO_SLIDES.map((slide, slideIndex) => (
                  <button
                    key={slide.title}
                    type="button"
                    onClick={() => show(slideIndex)}
                    aria-label={`Show slide ${slideIndex + 1}`}
                    aria-current={slideIndex === index}
                    className={`h-2.5 shrink-0 rounded-full transition-all ${
                      slideIndex === index ? 'w-8 bg-pink' : 'w-2.5 bg-ink/25 hover:bg-ink/50'
                    }`}
                  />
                ))}
                <span className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-ink/15">
                  <span
                    key={index}
                    className="absolute inset-y-0 left-0 w-full origin-left animate-progress rounded-full bg-pink"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </section>
  )
}
