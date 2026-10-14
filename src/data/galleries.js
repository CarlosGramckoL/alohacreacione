import { toImage } from './image.js'

const bouquetFiles = import.meta.glob('../assets/img/works/bouquet/*/*.{webp,jpg,jpeg,png}', {
  eager: true,
  query: '?w=480;768;1080&format=webp&quality=72&as=img',
  import: 'default',
})
const decorationFiles = import.meta.glob(
  '../assets/img/works/decoration/*/*.{webp,jpg,jpeg,png}',
  {
    eager: true,
    query: '?w=480;768;1080&format=webp&quality=72&as=img',
    import: 'default',
  },
)
const bouquetThumbs = import.meta.glob('../assets/img/thumb/bouquet/*.{webp,jpg,png}', {
  eager: true,
  query: '?w=320;480;640&format=webp&quality=74&as=img',
  import: 'default',
})
const decorationThumbs = import.meta.glob('../assets/img/thumb/decoration/*.{webp,jpg,png}', {
  eager: true,
  query: '?w=320;480;640&format=webp&quality=74&as=img',
  import: 'default',
})
const tableDecorationFiles = import.meta.glob(
  '../assets/img/works/table-decoration/*.{webp,jpg,jpeg,png}',
  {
    eager: true,
    query: '?w=480;768;1080&format=webp&quality=72&as=img',
    import: 'default',
  },
)

function numericKey(name) {
  const match = name.match(/\((\d+)\)/)
  return match ? Number(match[1]) : 0
}

function groupByFolder(modules) {
  const groups = {}
  for (const [path, url] of Object.entries(modules)) {
    const parts = path.split('/')
    const folder = parts[parts.length - 2]
    const name = parts[parts.length - 1]
    ;(groups[folder] ||= []).push({ ...toImage(url), name })
  }
  for (const folder of Object.keys(groups)) {
    groups[folder].sort(
      (a, b) => numericKey(a.name) - numericKey(b.name) || a.name.localeCompare(b.name),
    )
  }
  return groups
}

function byBasename(modules) {
  const map = {}
  for (const [path, url] of Object.entries(modules)) {
    map[path.split('/').pop()] = toImage(url)
  }
  return map
}

const bouquetWorks = groupByFolder(bouquetFiles)
const decorationWorks = groupByFolder(decorationFiles)
const bouquetThumbMap = byBasename(bouquetThumbs)
const decorationThumbMap = byBasename(decorationThumbs)

export const TABLE_DECORATIONS = Object.entries(tableDecorationFiles)
  .map(([path, url]) => ({ ...toImage(url), name: path.split('/').pop() }))
  .sort((a, b) => numericKey(a.name) - numericKey(b.name) || a.name.localeCompare(b.name))

export const ACCENTS = {
  pink: { hex: '#E93F7E', soft: '#FDECF3' },
  yellow: { hex: '#FFD23F', soft: '#FFF7DC' },
  mint: { hex: '#2ED3C4', soft: '#E4FAF8' },
  coral: { hex: '#FF7A5C', soft: '#FFEDE8' },
  lilac: { hex: '#B98CFF', soft: '#F3ECFF' },
}

export const GALLERY_TYPES = {
  bouquet: {
    key: 'bouquet',
    label: 'Balloon Bouquets',
    tagline: 'Balloons Bouquet',
    description:
      'Bursting with joy and colour. Every bouquet is hand-built and delivered ready to display — for birthdays, anniversaries and every day worth celebrating.',
    works: bouquetWorks,
    thumbs: bouquetThumbMap,
    categories: [
      {
        slug: 'valentine',
        folder: 'valentine',
        title: "Valentine's Day",
        thumb: 'valentineb.webp',
        icon: 'heart',
        accent: 'pink',
        tagline: 'Romantic bouquets for the one you love',
        description:
          'Heart-shaped bouquets, soft pinks and reds, and arrangements made to say it without words. Built around the feeling you want to create.',
        includes: [
          'Heart-shaped and love-themed bouquets',
          'Red, pink and pastel colour palettes',
          'Delivery timed to your celebration',
        ],
        perfectFor: "Valentine's Day, anniversaries, date nights and proposals",
      },
      {
        slug: 'anniversary',
        folder: 'aniversario',
        title: 'Anniversary',
        thumb: 'ann.webp',
        icon: 'gem',
        accent: 'coral',
        tagline: 'Milestone moments, beautifully arranged',
        description:
          'Elegant bouquets that mark the years together — refined colours, metallic accents and custom numbers for your milestone.',
        includes: [
          'Custom number and milestone balloons',
          'Elegant gold, silver and rose palettes',
          'Gift-ready presentation',
        ],
        perfectFor: 'Anniversaries, milestones and romantic surprises',
      },
      {
        slug: 'birthday',
        folder: 'cumpleanos',
        title: 'Birthday',
        thumb: 'hpb.webp',
        icon: 'cake',
        accent: 'yellow',
        tagline: 'The birthday upgrade everyone photographs',
        description:
          'Bright, fun bouquets with age numbers, character themes and colour schemes that match the rest of the party.',
        includes: [
          'Age number and name personalisation',
          'Themed colours to match your party',
          'Delivery timed to the celebration',
        ],
        perfectFor: 'Birthdays for kids, teens and grown-ups',
      },
      {
        slug: 'mothers-day',
        folder: 'diamadre',
        title: "Mother's Day",
        thumb: 'motherb.webp',
        icon: 'flower',
        accent: 'pink',
        tagline: 'For the one who deserves the biggest smile',
        description:
          'Soft, warm bouquets that mix balloons and florals — a gift that keeps shining long after cut flowers fade.',
        includes: [
          'Balloon and floral combinations',
          'Warm pastel and floral palettes',
          "Delivery on Mother's Day weekend",
        ],
        perfectFor: "Mother's Day, grandmothers and new mums",
      },
      {
        slug: 'fathers-day',
        folder: 'diapapa',
        title: "Father's Day",
        thumb: 'fatherb.webp',
        icon: 'sun',
        accent: 'mint',
        tagline: 'Bold bouquets for the best dad',
        description:
          'Strong colours, sporty themes and custom messages — a gift that feels personal without being predictable.',
        includes: [
          'Sport, hobby and custom themes',
          'Bold blues, greens and neutrals',
          'Optional treats and add-ons',
        ],
        perfectFor: "Father's Day, birthdays and thank-you gifts",
      },
      {
        slug: 'gender-reveal',
        folder: 'genderreveal',
        title: 'Gender Reveal',
        thumb: 'gender.webp',
        icon: 'gift',
        accent: 'lilac',
        tagline: 'The moment before the moment',
        description:
          'Reveal bouquets in blue, pink or a mix — designed for the photo, the reaction and the announcement.',
        includes: [
          'Pink, blue or neutral colour stories',
          'Reveal-ready arrangements',
          'Coordinated party styling',
        ],
        perfectFor: 'Gender reveals and baby announcements',
      },
      {
        slug: 'graduation',
        folder: 'graduacion',
        title: 'Graduation',
        thumb: 'gradb.webp',
        icon: 'cap',
        accent: 'yellow',
        tagline: 'Celebrate the finish line',
        description:
          'School-colour bouquets with caps, numbers and congratulations — built for the photos right after the ceremony.',
        includes: [
          'Custom school colours and year',
          'Graduation cap and number balloons',
          'Delivery to home or venue',
        ],
        perfectFor: 'Graduations, promotions and achievements',
      },
      {
        slug: 'welcome-baby',
        folder: 'bienvenidabebe',
        title: 'Welcome Baby',
        thumb: 'welcomeb.webp',
        icon: 'baby',
        accent: 'mint',
        tagline: 'A sweet welcome for a tiny human',
        description:
          'Gentle pastels, plush accents and soft shapes — a gift that doubles as decoration for the nursery.',
        includes: [
          'Soft pastel and neutral palettes',
          'Plush and keepsake add-ons',
          'Home and hospital delivery',
        ],
        perfectFor: 'New babies, baby showers and hospital visits',
      },
    ],
  },
  decoration: {
    key: 'decoration',
    label: 'Balloon Decorations',
    tagline: 'Balloons Decorations',
    description:
      'Elevating events with balloon elegance. Explore installations that add a touch of enchantment to any occasion, then picture them in your own space.',
    works: decorationWorks,
    thumbs: decorationThumbMap,
    categories: [
      {
        slug: 'baby-shower',
        folder: 'babyshower',
        title: 'Baby Shower',
        thumb: 'babyshower.webp',
        icon: 'baby',
        accent: 'lilac',
        tagline: 'A soft, photo-ready baby shower',
        description:
          'Arches, garlands and table styling in the palette you choose — from soft neutrals to fully themed setups.',
        includes: [
          'Balloon arches and garlands',
          'Table and dessert styling',
          'On-site install and teardown',
        ],
        perfectFor: 'Baby showers and gender reveal parties',
      },
      {
        slug: 'anniversary',
        folder: 'aniversario',
        title: 'Anniversary',
        thumb: 'ann.webp',
        icon: 'gem',
        accent: 'coral',
        tagline: 'Romantic setups for milestone nights',
        description:
          'Warm palettes, metallic accents and statement walls that turn dinner at home into a real occasion.',
        includes: [
          'Statement walls and backdrops',
          'Romantic colour palettes',
          'Custom numbers and signage',
        ],
        perfectFor: 'Anniversaries, proposals and romantic dinners',
      },
      {
        slug: 'wedding',
        folder: 'boda',
        title: 'Wedding',
        thumb: 'wedding.webp',
        icon: 'heart',
        accent: 'pink',
        tagline: 'Delicate details for the big day',
        description:
          'Elegant installations, aisle styling and photo backdrops that work with your florals, dress and venue.',
        includes: [
          'Ceremony and reception styling',
          'Photo backdrops and arches',
          'Palette matched to your florals',
        ],
        perfectFor: 'Weddings, rehearsals and engagement parties',
      },
      {
        slug: 'communion',
        folder: 'comunionyconfirmacion',
        title: 'Communion, Confirmation & Baptism',
        thumb: 'comunion.webp',
        icon: 'sparkles',
        accent: 'mint',
        tagline: 'Thoughtful styling for a meaningful day',
        description:
          'Refined, family-friendly decoration for communions, confirmations and baptisms — elegant without being over the top.',
        includes: [
          'Elegant pastel arrangements',
          'Name and date personalisation',
          'Full setup before the event',
        ],
        perfectFor: 'Communions, confirmations and baptisms',
      },
      {
        slug: 'birthday',
        folder: 'cumpleano',
        title: 'Birthday',
        thumb: 'birthday.webp',
        icon: 'cake',
        accent: 'yellow',
        tagline: 'Party rooms that get photographed',
        description:
          'Full birthday styling — arches, number displays, dessert tables and backdrops in your theme colours.',
        includes: [
          'Number and name balloon displays',
          'Dessert and gift table styling',
          'Theme matched to your party',
        ],
        perfectFor: 'Kids birthdays, teens and adult parties',
      },
      {
        slug: 'gender-reveal',
        folder: 'genderreveal',
        title: 'Gender Reveal',
        thumb: 'gender.webp',
        icon: 'gift',
        accent: 'lilac',
        tagline: 'The setup that makes the reveal land',
        description:
          'Pink-or-blue arches, reveal walls and photo corners designed around the big moment.',
        includes: [
          'Reveal arches and colour walls',
          'Photo corner styling',
          'Full install and teardown',
        ],
        perfectFor: 'Gender reveals and announcement parties',
      },
      {
        slug: 'graduation',
        folder: 'graduacion',
        title: 'Graduation',
        thumb: 'graduate.webp',
        icon: 'cap',
        accent: 'coral',
        tagline: 'Graduation backdrops worth the photos',
        description:
          'School-colour walls, photo corners and signage for the party after the ceremony.',
        includes: [
          'Custom school colour displays',
          'Photo backdrops and signage',
          'Home or venue install',
        ],
        perfectFor: 'Graduation parties and achievement celebrations',
      },
      {
        slug: 'holiday',
        folder: 'festivo',
        title: 'Holiday',
        thumb: 'holidays.webp',
        icon: 'party',
        accent: 'coral',
        tagline: 'Festive installs for the whole season',
        description:
          'Seasonal balloon decor for homes, offices and events — cheerful, colourful and made to last the season.',
        includes: [
          'Seasonal arches and garlands',
          'Home, office and venue installs',
          'Themed colour palettes',
        ],
        perfectFor: 'Christmas, holidays and seasonal events',
      },
    ],
  },
}

export function galleryTypeList() {
  return Object.values(GALLERY_TYPES)
}

export function getCategoryThumb(typeKey, category) {
  const type = GALLERY_TYPES[typeKey]
  return type.thumbs[category.thumb]
}

export function getCategoryImages(typeKey, category) {
  const type = GALLERY_TYPES[typeKey]
  return type.works[category.folder] || []
}

export function getCategory(typeKey, slug) {
  const type = GALLERY_TYPES[typeKey]
  if (!type) return null
  const category = type.categories.find((item) => item.slug === slug)
  if (!category) return null
  return { type, category }
}

export const CATEGORY_GROUPS = [
  {
    key: 'bouquet',
    title: 'Balloon Bouquets',
    description: GALLERY_TYPES.bouquet.description,
    categories: GALLERY_TYPES.bouquet.categories,
    thumbMap: bouquetThumbMap,
    works: bouquetWorks,
  },
  {
    key: 'decoration',
    title: 'Balloon Decorations',
    description: GALLERY_TYPES.decoration.description,
    categories: GALLERY_TYPES.decoration.categories,
    thumbMap: decorationThumbMap,
    works: decorationWorks,
  },
]
