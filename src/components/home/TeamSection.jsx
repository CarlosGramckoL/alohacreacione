import { InstagramIcon } from '../ui/BrandIcons.jsx'
import { Container } from '../ui/Container.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { ButtonLink } from '../ui/Button.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { TEAM, CONTACT } from '../../data/site.js'

export function TeamSection() {
  return (
    <section id="team" className="cv-auto scroll-mt-24 bg-pink-tint py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-md">
            <span
              aria-hidden="true"
              className="absolute -left-4 -top-4 h-full w-full rounded-blob bg-yellow"
            />
            <img
              src={TEAM.image}
              alt={`${TEAM.name}, ${TEAM.role}`}
              loading="lazy"
              className="relative w-full h-auto rounded-blob border-2 border-ink"
            />
            <span className="absolute -right-3 bottom-8 rotate-[-7deg] rounded-full border-2 border-ink bg-white px-5 py-2.5 text-[13px] font-extrabold text-ink">
              Nice to meet you!
            </span>
          </Reveal>

          <div>
            <SectionHeading label="Meet the maker" title="The hands behind every balloon." />
            <p className="mt-6 max-w-lg text-[17px] leading-relaxed text-ink-soft">{TEAM.text}</p>
            <p className="mt-6 inline-flex rounded-full border-2 border-ink bg-mint px-5 py-2 text-[15px] font-extrabold text-ink">
              {TEAM.role}
            </p>
            <div className="mt-8">
              <ButtonLink
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                variant="navy"
              >
                <InstagramIcon className="h-4 w-4" />
                Follow on Instagram
              </ButtonLink>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
