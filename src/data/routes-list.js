export const SITE_URL = 'https://alohacreaciones.com'

export const BOUQUET_SLUGS = [
  'valentine',
  'anniversary',
  'birthday',
  'mothers-day',
  'fathers-day',
  'gender-reveal',
  'graduation',
  'welcome-baby',
]

export const DECORATION_SLUGS = [
  'baby-shower',
  'anniversary',
  'wedding',
  'communion',
  'birthday',
  'gender-reveal',
  'graduation',
  'holiday',
]

export const SITE_ROUTES = [
  '/',
  '/bouquet',
  '/decoration',
  '/table-decorations',
  ...BOUQUET_SLUGS.map((slug) => `/bouquet/${slug}`),
  ...DECORATION_SLUGS.map((slug) => `/decoration/${slug}`),
]
