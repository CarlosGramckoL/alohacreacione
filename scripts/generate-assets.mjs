import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const IMG = 'src/assets/img'
const WORKS = `${IMG}/works`
const PUBLIC = 'public'
const FAVICON = `${PUBLIC}/newfavicon.png`

const TRANSPARENT = { r: 0, g: 0, b: 0, alpha: 0 }
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

await mkdir(PUBLIC, { recursive: true })
await mkdir(`${PUBLIC}/og`, { recursive: true })

async function writeIcon(size, background, dest) {
  const inner = Math.round(size * (size <= 48 ? 0.96 : 0.84))
  const resized = await sharp(FAVICON)
    .resize(inner, inner, { fit: 'contain', background })
    .png()
    .toBuffer()
  const { width, height } = await sharp(resized).metadata()
  const padX = Math.round((size - width) / 2)
  const padY = Math.round((size - height) / 2)
  await sharp(resized)
    .extend({
      top: padY,
      bottom: size - height - padY,
      left: padX,
      right: size - width - padX,
      background,
    })
    .png({ compressionLevel: 9 })
    .toFile(dest)
}

await writeIcon(180, WHITE, `${PUBLIC}/apple-touch-icon.png`)
await writeIcon(192, TRANSPARENT, `${PUBLIC}/icon-192.png`)
await writeIcon(512, TRANSPARENT, `${PUBLIC}/icon-512.png`)
await writeIcon(32, TRANSPARENT, `${PUBLIC}/favicon-32.png`)

const og = (src, dest) =>
  sharp(src)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest)

async function firstImage(dir) {
  const files = (await readdir(dir))
    .filter((f) => /\.(webp|jpe?g|png)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
  if (!files.length) throw new Error(`No images in ${dir}`)
  return join(dir, files[0])
}

const GROUPS = {
  bouquet: [
    ['valentine', 'valentine'],
    ['anniversary', 'aniversario'],
    ['birthday', 'cumpleanos'],
    ['mothers-day', 'diamadre'],
    ['fathers-day', 'diapapa'],
    ['gender-reveal', 'genderreveal'],
    ['graduation', 'graduacion'],
    ['welcome-baby', 'bienvenidabebe'],
  ],
  decoration: [
    ['baby-shower', 'babyshower'],
    ['anniversary', 'aniversario'],
    ['wedding', 'boda'],
    ['communion', 'comunionyconfirmacion'],
    ['birthday', 'cumpleano'],
    ['gender-reveal', 'genderreveal'],
    ['graduation', 'graduacion'],
    ['holiday', 'festivo'],
  ],
}

for (const [type, cats] of Object.entries(GROUPS)) {
  for (const [slug, folder] of cats) {
    const src = await firstImage(`${WORKS}/${type}/${folder}`)
    await og(src, `${PUBLIC}/og/${type}-${slug}.jpg`)
  }
}

await og(await firstImage(`${WORKS}/bouquet/valentine`), `${PUBLIC}/og/bouquet.jpg`)
await og(await firstImage(`${WORKS}/decoration/babyshower`), `${PUBLIC}/og/decoration.jpg`)
await og(await firstImage(`${WORKS}/table-decoration`), `${PUBLIC}/og/table-decorations.jpg`)
await og(`${IMG}/banner.webp`, `${PUBLIC}/og/home.jpg`)

console.log('Generated icons (from newfavicon.png) + 20 OG images in public/og/')
