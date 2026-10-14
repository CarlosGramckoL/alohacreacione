import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { Container } from '../ui/Container.jsx'
import { WhatsAppIcon } from '../ui/BrandIcons.jsx'
import { ButtonLink } from '../ui/Button.jsx'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll.js'
import { CONTACT, IMAGES } from '../../data/site.js'

const links = [
  { label: 'Services', to: '/#services' },
  { label: 'Bouquets', to: '/bouquet' },
  { label: 'Decorations', to: '/decoration' },
  { label: 'Team', to: '/#team' },
  { label: 'Contact', to: '/#contact' },
]

function isActive(link, location) {
  if (link.to.startsWith('/#') || link.to === '/') {
    return location.pathname === '/' && location.hash === link.to.slice(1)
  }
  return location.pathname.startsWith(link.to)
}

export function Navbar() {
  const location = useLocation()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastY = useRef(0)

  useLockBodyScroll(open)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 12)
      if (!open) {
        if (y > lastY.current + 6 && y > 120) setHidden(true)
        else if (y < lastY.current - 6 || y <= 120) setHidden(false)
      }
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [open])

  useEffect(() => {
    document.documentElement.style.setProperty('--nav-h', hidden ? '0px' : '64px')
  }, [hidden])

  const isHidden = hidden && !open

  const toggleMenu = () => {
    setOpen((value) => !value)
    setHidden(false)
  }

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-transform duration-300 ease-out ${
        isHidden ? '-translate-y-full overflow-hidden' : 'translate-y-0'
      } ${scrolled ? 'shadow-[0_4px_0_0_var(--color-yellow)]' : ''}`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          to="/"
          aria-label="Aloha Creaciones — home"
          className="relative block h-16 w-[148px] shrink-0 sm:w-[150px]"
        >
          <img
            src={IMAGES.logo}
            alt="Aloha Creaciones"
            className="absolute left-0 top-0 h-auto w-full select-none p-1.5"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className={`rounded-full px-4 py-2 text-[15px] font-bold transition-colors ${
                isActive(link, location) ? 'bg-yellow text-navy' : 'text-navy hover:bg-navy-soft'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden sm:block">
          <ButtonLink
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            <WhatsAppIcon className="h-4 w-4" />
            Book on WhatsApp
          </ButtonLink>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={CONTACT.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Book on WhatsApp"
            className="flex h-11 w-11 items-center justify-center rounded-full bg-pink text-ink transition-colors hover:bg-yellow sm:hidden"
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>

          <button
            type="button"
            onClick={toggleMenu}
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full bg-pink text-ink hover:bg-yellow lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span className="relative block h-6 w-6">
              <Menu
                aria-hidden="true"
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  open ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'
                }`}
              />
              <X
                aria-hidden="true"
                className={`absolute inset-0 h-6 w-6 transition-all duration-300 ${
                  open ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
                }`}
              />
            </span>
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        aria-hidden={!open}
        inert={!open}
        className={`absolute left-0 right-0 top-full grid transition-[grid-template-rows] duration-300 ease-out lg:hidden ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="border-b-2 border-ink bg-white shadow-xl">
            <Container
              className={`flex flex-col gap-2 py-5 transition-all duration-300 ${
                open ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
              }`}
            >
              {links.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-lg font-bold ${
                    isActive(link, location) ? 'bg-yellow text-navy' : 'text-navy'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <ButtonLink
                href={CONTACT.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                className="mt-3"
                onClick={() => setOpen(false)}
              >
                <WhatsAppIcon className="h-4 w-4" />
                Book on WhatsApp
              </ButtonLink>
            </Container>
          </div>
        </div>
      </div>
    </header>
  )
}
