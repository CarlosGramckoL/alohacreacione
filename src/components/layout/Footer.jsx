import { Link } from 'react-router-dom'
import { Mail, MapPin, Clock } from 'lucide-react'
import { Container } from '../ui/Container.jsx'
import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons.jsx'
import { CONTACT, IMAGES } from '../../data/site.js'

const explore = [
  { label: 'Balloon Bouquets', to: '/bouquet' },
  { label: 'Balloon Decorations', to: '/decoration' },
  { label: 'Table decorations', to: '/table-decorations' },
  { label: 'Our team', to: '/#team' },
  { label: 'Contact us', to: '/#contact' },
]

const dots = ['#114E8A', '#FFD23F', '#2ED3C4', '#FF7A5C', '#FFFFFF']

const headingClass = 'text-[13px] font-extrabold uppercase tracking-[0.14em] text-ink'

export function Footer() {
  return (
    <footer className="bg-pink text-ink">
      <div aria-hidden="true" className="flex h-3 w-full">
        {Array.from({ length: 24 }).map((_, index) => (
          <span
            key={index}
            className="flex-1"
            style={{ backgroundColor: dots[index % dots.length] }}
          />
        ))}
      </div>

      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="inline-flex rounded-blob border-2 border-ink/20 bg-white p-3">
            <img src={IMAGES.logo} alt="Aloha Creaciones" className="h-16 w-auto" />
          </div>
          <p className="mt-5 max-w-xs text-[15px] font-semibold leading-relaxed text-ink/80">
            Balloon bouquets and event decorations, hand-built and delivered with love across Miami.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a
              href={CONTACT.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-navy text-white transition-transform hover:-translate-y-1 hover:bg-white hover:text-ink"
            >
              <InstagramIcon className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-yellow text-ink transition-transform hover:-translate-y-1 hover:bg-navy hover:text-white"
            >
              <WhatsAppIcon className="h-5 w-5" />
            </a>
            <a
              href={CONTACT.emailHref}
              aria-label="Email"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink transition-transform hover:-translate-y-1 hover:bg-navy hover:text-white"
            >
              <Mail aria-hidden="true" className="h-5 w-5" />
            </a>
          </div>
        </div>

        <div>
          <h3 className={headingClass}>Visit</h3>
          <ul className="mt-4 space-y-3 text-[15px] font-semibold text-ink/90">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
              <span>{CONTACT.address}</span>
            </li>
            <li className="flex items-start gap-3">
              <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
              <span>{CONTACT.hours}</span>
            </li>
          </ul>
        </div>

        <div>
          <h3 className={headingClass}>Explore</h3>
          <ul className="mt-4 space-y-3 text-[15px] font-semibold text-ink/90">
            {explore.map((item) => (
              <li key={item.label}>
                <Link to={item.to} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className={headingClass}>Get in touch</h3>
          <ul className="mt-4 space-y-3 text-[15px] font-semibold text-ink/90">
            <li>
              <a href={CONTACT.emailHref} className="break-all transition-colors hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            <li>
              <a href={CONTACT.phoneHref} className="transition-colors hover:text-white">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={CONTACT.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-white"
              >
                {CONTACT.instagramHandle}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-ink/15">
        <Container className="py-6">
          <p className="text-center text-xs font-semibold text-ink/70">
            © {new Date().getFullYear()} Aloha Creaciones. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  )
}
