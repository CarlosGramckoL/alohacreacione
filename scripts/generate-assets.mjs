import sharp from 'sharp'
import { mkdir, readdir } from 'node:fs/promises'
import { join } from 'node:path'

const IMG = 'src/assets/img'
const WORKS = `${IMG}/works`
const PUBLIC = 'public'

await mkdir(PUBLIC, { recursive: true })
await mkdir(`${PUBLIC}/og`, { recursive: true })

const logoOnWhite = (size) =>
  sharp(`${IMG}/logo.png`)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 255, g: 255, b: 255, alpha: 1 },
    })
    .png({ compressionLevel: 9 })

await logoOnWhite(180).toFile(`${PUBLIC}/apple-touch-icon.png`)
await logoOnWhite(192).toFile(`${PUBLIC}/icon-192.png`)
await logoOnWhite(512).toFile(`${PUBLIC}/icon-512.png`)
await logoOnWhite(32).toFile(`${PUBLIC}/favicon-32.png`)

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

console.log('Generated icons + 20 OG images in public/og/')
