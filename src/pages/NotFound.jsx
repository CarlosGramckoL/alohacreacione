import { PageHeader } from '../components/gallery/PageHeader.jsx'
import { ButtonLink } from '../components/ui/Button.jsx'
import { Seo } from '../components/seo/Seo.jsx'

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page not found | Aloha Creaciones"
        description="The page you are looking for does not exist. Browse our balloon bouquets and event decorations in Miami."
        path="/404"
        noindex
      />
      <PageHeader
        label="404"
        title="That page floated away."
        description="The link you followed does not exist. Head back home to keep browsing our bouquets and decorations."
      >
        <div className="mt-9">
          <ButtonLink to="/" variant="navy">
            Back to home
          </ButtonLink>
        </div>
      </PageHeader>
    </>
  )
}
