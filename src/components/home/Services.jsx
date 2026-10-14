import { Phone, PenLine, Truck, ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { ButtonLink } from '../ui/Button.jsx'
import { SERVICES, CONTACT } from '../../data/site.js'
import { useWhatsAppLink } from '../../hooks/useWhatsApp.js'

const icons = {
  phone: Phone,
  pencil: PenLine,
  truck: Truck,
}

const steps = [
  { bg: '#E93F7E', label: 'Step one' },
  { bg: '#FFD23F', label: 'Step two' },
  { bg: '#2ED3C4', label: 'Step three' },
]

export function Services() {
  const whatsappHref = useWhatsAppLink()

  return (
    <section id="services" className="cv-auto scroll-mt-24 bg-white py-20 sm:py-28">
      <Container>
        <SectionHeading
          label="What we do"
          title="Three steps to a room that feels like a party."
          description="Tell us the occasion, we design the look, then we deliver and install it. You just show up and celebrate."
          align="center"
        />

        <div className="relative mt-16">
          <div
            aria-hidden="true"
            className="absolute left-[18%] right-[18%] top-[44px] hidden border-t-2 border-dashed border-ink/25 md:block"
          />

          <ol className="grid gap-12 md:grid-cols-3">
          {SERVICES.map((service, index) => {
            const Icon = icons[service.icon] || Phone
            const step = steps[index % steps.length]
            return (
              <Reveal
                as="li"
                key={service.title}
                delay={index * 0.12}
                className="relative flex flex-col items-center text-center"
              >
                <div className="relative">
                  <span
                    className="flex h-[88px] w-[88px] items-center justify-center rounded-full border-2 border-ink"
                    style={{ backgroundColor: step.bg }}
                  >
                    <Icon aria-hidden="true" className="h-9 w-9 text-ink" strokeWidth={2.25} />
                  </span>
                  <span className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-full border-2 border-ink bg-white font-display text-lg font-extrabold text-ink">
                    {index + 1}
                  </span>
                </div>

                <p className="mt-6 text-[12px] font-extrabold uppercase tracking-[0.16em] text-ink-soft">
                  {step.label}
                </p>
                <h3 className="mt-2 text-[26px]">{service.title}</h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink-soft">{service.text}</p>
              </Reveal>
            )
          })}
          </ol>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-x-5 gap-y-3 rounded-blob border-2 border-ink bg-pink-tint px-8 py-7">
          <p className="text-center text-[17px] font-bold text-ink">
            Not sure where to start? Tell us the date and we take it from there.
          </p>
          <ButtonLink
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="navy"
          >
            Start with a message
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
