import { Hero } from '../components/home/Hero.jsx'
import { Services } from '../components/home/Services.jsx'
import { CategoryGrid } from '../components/home/CategoryGrid.jsx'
import { TableDecorations } from '../components/home/TableDecorations.jsx'
import { Stats } from '../components/home/Stats.jsx'
import { TeamSection } from '../components/home/TeamSection.jsx'
import { Testimonials } from '../components/home/Testimonials.jsx'
import { ContactSection } from '../components/home/ContactSection.jsx'
import { Marquee } from '../components/ui/Marquee.jsx'
import { Seo } from '../components/seo/Seo.jsx'
import { localBusinessJsonLd, websiteJsonLd } from '../data/structured-data.js'
import { SITE_URL } from '../data/routes-list.js'

export default function Home() {
  return (
    <>
      <Seo
        title="Aloha Creaciones — Balloon Bouquets & Event Decor in Miami"
        description="Hand-built balloon bouquets, arches and event decorations delivered across Miami for birthdays, weddings, baby showers and every celebration."
        path="/"
        image={`${SITE_URL}/og/home.jpg`}
        imageAlt="Balloon decorations and bouquets by Aloha Creaciones in Miami"
        jsonLd={[localBusinessJsonLd(), websiteJsonLd()]}
      />
      <Hero />
      <Marquee />
      <Services />
      <CategoryGrid typeKey="bouquet" id="bouquet" tone="tint" />
      <CategoryGrid typeKey="decoration" id="decoration" tone="light" />
      <TableDecorations />
      <TeamSection />
      <Stats />
      <Testimonials />
      <ContactSection />
    </>
  )
}
