import { Navigate, useParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { PageHeader } from '../components/gallery/PageHeader.jsx'
import { CategoryNav } from '../components/gallery/CategoryNav.jsx'
import { Breadcrumbs } from '../components/gallery/Breadcrumbs.jsx'
import { GalleryGrid } from '../components/gallery/GalleryGrid.jsx'
import { ThemeIcon } from '../components/gallery/ThemeIcon.jsx'
import { ContactSection } from '../components/home/ContactSection.jsx'
import { Container } from '../components/ui/Container.jsx'
import { ButtonLink } from '../components/ui/Button.jsx'
import { WhatsAppIcon } from '../components/ui/BrandIcons.jsx'
import { Seo } from '../components/seo/Seo.jsx'
import { ACCENTS, getCategory, getCategoryImages } from '../data/galleries.js'
import { breadcrumbJsonLd, serviceJsonLd } from '../data/structured-data.js'
import { SITE_URL } from '../data/routes-list.js'
import { useWhatsAppLink } from '../hooks/useWhatsApp.js'

export default function Gallery() {
  const { type, slug } = useParams()
  const result = getCategory(type, slug)
  const whatsappHref = useWhatsAppLink()

  if (!result) return <Navigate to="/" replace />

  const { type: typeData, category } = result
  const images = getCategoryImages(type, category)
  const accent = ACCENTS[category.accent] || ACCENTS.pink
  const noun = typeData.key === 'bouquet' ? 'bouquets' : 'decorations'
  const path = `/${type}/${slug}`

  return (
    <>
      <Seo
        title={`${category.title} — ${typeData.label} in Miami | Aloha Creaciones`}
        description={`${category.tagline}. ${category.description}`}
        path={path}
        type="article"
        image={`${SITE_URL}/og/${type}-${slug}.jpg`}
        imageAlt={`${category.title} balloon ${noun} by Aloha Creaciones in Miami`}
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: typeData.label, path: `/${type}` },
            { name: category.title, path },
          ]),
          serviceJsonLd({
            name: `${category.title} ${noun}`,
            description: category.description,
            path,
          }),
        ]}
      />

      <PageHeader
        label={category.tagline}
        title={category.title}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: typeData.label, path: `/${type}` },
              { name: category.title, path },
            ]}
          />
        }
      />

      <div className="sticky top-[var(--nav-h,64px)] z-40 border-b-2 border-ink bg-white">
        <CategoryNav typeKey={type} activeSlug={category.slug} className="scroll-pad py-3" />
      </div>

      <section className="bg-white py-12 sm:py-16">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start">
            <div className="order-1">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-pink px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink">
                    Gallery
                  </span>
                  <h2 className="mt-4 text-[clamp(1.6rem,3.2vw,2.4rem)] text-navy">
                    {category.title} photos
                  </h2>
                </div>
                <p className="text-[15px] font-semibold text-ink-soft">
                  {images.length} photos · tap any picture to view it full size
                </p>
              </div>

              <div className="mt-8">
                <GalleryGrid
                  images={images}
                  title={category.title}
                  altPrefix={`${category.title} balloon ${noun} in Miami`}
                />
              </div>
            </div>

            <aside className="order-2 flex flex-col gap-5 lg:sticky lg:top-[calc(var(--nav-h,64px)+5rem)] lg:max-h-[calc(100vh-8rem)] lg:self-start lg:overflow-y-auto">
              <div
                className="rounded-blob border-2 border-ink p-5"
                style={{ backgroundColor: accent.soft }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink"
                    style={{ backgroundColor: accent.hex }}
                  >
                    <ThemeIcon name={category.icon} className="h-5 w-5 text-ink" />
                  </span>
                  <h2 className="text-lg text-navy">
                    {category.title} {noun}
                  </h2>
                </div>

                <p className="mt-3 text-[14px] leading-relaxed text-ink">{category.description}</p>

                <ul className="mt-4 space-y-2">
                  {category.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[14px] font-semibold text-ink"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 h-4 w-4 shrink-0"
                        style={{ color: accent.hex }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="rounded-blob border-2 border-ink p-5"
                style={{ backgroundColor: accent.hex }}
              >
                <h3 className="text-lg text-navy">Perfect for</h3>
                <p className="mt-2 text-[14px] font-semibold leading-relaxed text-ink">
                  {category.perfectFor}
                </p>
                <p className="mt-5 text-[14px] font-extrabold text-ink">Want this exact look?</p>
                <ButtonLink
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="navy"
                  className="mt-3 w-full"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Book on WhatsApp
                </ButtonLink>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  )
}
