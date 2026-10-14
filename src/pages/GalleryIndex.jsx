import { Navigate, useParams } from 'react-router-dom'
import { PageHeader } from '../components/gallery/PageHeader.jsx'
import { CategoryNav } from '../components/gallery/CategoryNav.jsx'
import { Breadcrumbs } from '../components/gallery/Breadcrumbs.jsx'
import { CategoryGrid } from '../components/home/CategoryGrid.jsx'
import { ContactSection } from '../components/home/ContactSection.jsx'
import { Seo } from '../components/seo/Seo.jsx'
import { GALLERY_TYPES } from '../data/galleries.js'
import { breadcrumbJsonLd } from '../data/structured-data.js'
import { SITE_URL } from '../data/routes-list.js'

export default function GalleryIndex() {
  const { type } = useParams()
  const typeData = GALLERY_TYPES[type]

  if (!typeData) return <Navigate to="/" replace />

  return (
    <>
      <Seo
        title={`${typeData.label} in Miami — Aloha Creaciones`}
        description={typeData.description}
        path={`/${type}`}
        image={`${SITE_URL}/og/${type}.jpg`}
        imageAlt={`${typeData.label} by Aloha Creaciones in Miami`}
        jsonLd={breadcrumbJsonLd([
          { name: 'Home', path: '/' },
          { name: typeData.label, path: `/${type}` },
        ])}
      />

      <PageHeader
        label="Browse the work"
        title={typeData.label}
        description={typeData.description}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { name: 'Home', path: '/' },
              { name: typeData.label, path: `/${type}` },
            ]}
          />
        }
      >
        <CategoryNav typeKey={type} />
      </PageHeader>

      <CategoryGrid typeKey={type} tone="light" showHeading={false} />

      <ContactSection />
    </>
  )
}
