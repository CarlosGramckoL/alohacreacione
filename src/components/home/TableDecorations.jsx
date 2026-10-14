import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { ButtonLink } from '../ui/Button.jsx'
import { TABLE_DECORATIONS } from '../../data/galleries.js'

export function TableDecorations() {
  const preview = TABLE_DECORATIONS.slice(0, 3)

  return (
    <section className="cv-auto bg-white py-16 sm:py-20">
      <Container>
        <div className="rounded-blob border-2 border-ink bg-pink-tint p-8 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr] lg:items-center">
            <div>
              <SectionHeading
                label="Also available"
                title="Table decorations"
                description="Balloon garlands, runner styling and centrepieces that dress the table itself — the finishing touch for showers, birthdays and dinner parties."
                size="sm"
              />
              <div className="mt-8">
                <ButtonLink to="/table-decorations" variant="navy">
                  See table decorations
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </ButtonLink>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {preview.map((image) => (
                <Link
                  key={image.src}
                  to="/table-decorations"
                  className="group block overflow-hidden rounded-[20px] border-2 border-ink bg-white"
                >
                  <img
                    src={image.src}
                    srcSet={image.srcset}
                    sizes="(min-width: 1024px) 18vw, 30vw"
                    alt="Table decoration by Aloha Creaciones"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
