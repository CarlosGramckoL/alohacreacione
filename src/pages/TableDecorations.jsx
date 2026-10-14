import { PageHeader } from '../components/gallery/PageHeader.jsx'
import { Breadcrumbs } from '../components/gallery/Breadcrumbs.jsx'
import { GalleryGrid } from '../components/gallery/GalleryGrid.jsx'
import { ContactSection } from '../components/home/ContactSection.jsx'
import { Container } from '../components/ui/Container.jsx'
import { Seo } from '../components/seo/Seo.jsx'
import { TABLE_DECORATIONS } from '../data/galleries.js'
import { breadcrumbJsonLd, serviceJsonLd } from '../data/structured-data.js'
import { SITE_URL } from '../data/routes-list.js'

const PATH = '/table-decorations'
const DESCRIPTION =
  'Balloon garlands, runner styling and centrepieces that dress the table itself — perfect for baby showers, birthdays, weddings and dinner parties across Miami.'

export default function TableDecorations() {
  return (
    <>
      <Seo
        title="Table Decorations in Miami — Aloha Creaciones"
        description={DESCRIPTION}
        path={PATH}
        type="article"
        image={`${SITE_URL}/og/table-decorations.jpg`}
        imageAlt="Table decorations by Aloha Creaciones in Miami"
        jsonLd={[
          breadcrumbJsonLd([
            { name: 'Home', path: '/' },
            { name: 'Table decorations', path: PATH },
          ]),
          serviceJsonLd({
            name: 'Table decorations',
            description: DESCRIPTION,
            path: PATH,
          }),
        ]}
      />

      <PageHeader
        label="Also available"
        title="Table decorations"
        description={DESCRIPTION}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: 'Table decorations', path: PATH },
            ]}
          />
        }
      />

      <section className="bg-white py-16 sm:py-20">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-pink px-4 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.14em] text-ink">
                Gallery
              </span>
              <h2 className="mt-4 text-[clamp(1.85rem,3.5vw,2.75rem)] text-navy">
                Table styling ideas
              </h2>
            </div>
            <p className="text-[15px] font-semibold text-ink-soft">
              {TABLE_DECORATIONS.length} photos · tap any picture to view it full size
            </p>
          </div>

          <div className="mt-10">
            <GalleryGrid
              images={TABLE_DECORATIONS}
              title="Table decorations"
              altPrefix="Table decoration by Aloha Creaciones in Miami"
            />
          </div>
        </Container>
      </section>

      <ContactSection />
    </>
  )
}
