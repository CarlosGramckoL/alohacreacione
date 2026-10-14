import { Mail, MapPin, Clock, ArrowUpRight } from 'lucide-react'
import { Container } from '../ui/Container.jsx'
import { SectionHeading } from '../ui/SectionHeading.jsx'
import { Reveal } from '../ui/Reveal.jsx'
import { InstagramIcon, WhatsAppIcon } from '../ui/BrandIcons.jsx'
import { CONTACT } from '../../data/site.js'
import { useWhatsAppLink } from '../../hooks/useWhatsApp.js'

export function ContactSection() {
  const whatsappHref = useWhatsAppLink()

  const actions = [
    {
      title: 'WhatsApp',
      value: CONTACT.phoneDisplay,
      href: whatsappHref,
      icon: WhatsAppIcon,
      external: true,
      className: 'bg-pink hover:bg-yellow',
    },
    {
      title: 'Email',
      value: CONTACT.email,
      href: CONTACT.emailHref,
      icon: Mail,
      external: false,
      className: 'bg-yellow hover:bg-coral',
    },
    {
      title: 'Instagram',
      value: CONTACT.instagramHandle,
      href: CONTACT.instagram,
      icon: InstagramIcon,
      external: true,
      className: 'bg-mint hover:bg-lilac',
    },
  ]

  return (
    <section id="contact" className="cv-auto scroll-mt-24 bg-pink-tint py-20 sm:py-28">
      <Container>
        <SectionHeading
          label="Say hello"
          title="Let&rsquo;s plan your celebration."
          description="Tell us the date, the place and the mood. Message us on the channel you like best and we take it from there."
          align="center"
        />

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {actions.map((action, index) => {
            const Icon = action.icon
            return (
              <Reveal key={action.title} delay={index * 0.1}>
                <a
                  href={action.href}
                  {...(action.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className={`flex h-full flex-col justify-between rounded-blob border-2 border-ink p-8 transition-transform duration-300 hover:-translate-y-2 ${action.className}`}
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-white">
                      <Icon className="h-6 w-6 text-ink" />
                    </span>
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-6 w-6 text-ink transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                  <div className="mt-12">
                    <p className="font-display text-3xl font-extrabold text-navy">{action.title}</p>
                    <p className="mt-1 break-all text-[15px] font-bold text-ink">{action.value}</p>
                  </div>
                </a>
              </Reveal>
            )
          })}
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-x-10 gap-y-3 text-[15px] font-bold text-ink">
          <span className="inline-flex items-center gap-2">
            <MapPin aria-hidden="true" className="h-4 w-4 text-pink" />
            {CONTACT.address}
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock aria-hidden="true" className="h-4 w-4 text-pink" />
            {CONTACT.hours}
          </span>
        </div>
      </Container>
    </section>
  )
}
