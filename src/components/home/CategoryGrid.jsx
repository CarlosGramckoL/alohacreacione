import { Link } from 'react-router-dom'
import { Container } from '../ui/Container.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { ButtonLink } from '../ui/Button.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { GALLERY_TYPES } from '../../data/galleries.js'

const labelColors = ['bg-white', 'bg-yellow', 'bg-mint', 'bg-navy-soft']

export function CategoryGrid({ typeKey, id, tone = 'light', showHeading = true }) {
  const type = GALLERY_TYPES[typeKey]
  const background = tone === 'tint' ? 'bg-pink-tint' : 'bg-white'

  return (
    <section
      id={id}
      className={`cv-auto scroll-mt-24 ${background} py-20 sm:py-28`}
      style={{ '--cv-size': '1400px' }}
    >
      <Container>
        {showHeading ? (
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              label="Browse the work"
              title={type.label}
              description={type.description}
            />
            <ButtonLink to={`/${typeKey}`} variant="outline">
              View all
            </ButtonLink>
          </div>
        ) : null}

        <div
          className={`columns-2 gap-5 sm:columns-3 lg:columns-4 ${
            showHeading ? 'mt-12' : ''
          }`}
        >
          {type.categories.map((category, index) => (
            <Reveal
              key={`${typeKey}-${category.slug}`}
              delay={(index % 4) * 0.06}
              className="mb-5 break-inside-avoid"
            >
              <Link
                to={`/${typeKey}/${category.slug}`}
                className="group relative block"
              >
                <img
                  src={type.thumbs[category.thumb].src}
                  srcSet={type.thumbs[category.thumb].srcset}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  width={type.thumbs[category.thumb].w}
                  height={type.thumbs[category.thumb].h}
                  alt={`${category.title} balloon decorations in Miami`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto rounded-[22px] border-2 border-ink transition-transform duration-300 group-hover:rotate-1 group-hover:scale-[1.02]"
                />
                <span
                  className={`absolute bottom-3 left-3 rounded-full border-2 border-ink px-4 py-1.5 text-[13px] font-extrabold text-ink ${
                    labelColors[index % labelColors.length]
                  }`}
                >
                  {category.title}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
