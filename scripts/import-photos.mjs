import sharp from 'sharp'
import { readdir, rename, unlink, readFile } from 'node:fs/promises'
import { join } from 'node:path'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function unlinkRetry(path, attempts = 12) {
  for (let i = 0; i < attempts; i++) {
    try {
      await unlink(path)
      return
    } catch (error) {
      if (error.code !== 'EBUSY' && error.code !== 'EPERM') throw error
      await sleep(400)
    }
  }
  throw new Error(`Could not remove (locked): ${path}`)
}

async function renameRetry(from, to, attempts = 12) {
  for (let i = 0; i < attempts; i++) {
    try {
      await rename(from, to)
      return
    } catch (error) {
      if (error.code !== 'EBUSY' && error.code !== 'EPERM') throw error
      await sleep(400)
    }
  }
  throw new Error(`Could not rename (locked): ${from}`)
}

const ROOT = 'src/assets/img/works'

// folder -> { prefix, newExt, oldExt }
const FOLDERS = {
  'bouquet/bienvenidabebe': { prefix: 'bienbb', newExt: '.jpeg', oldExt: '.webp' },
  'bouquet/cumpleanos': { prefix: 'cumple', newExt: '.jpeg', oldExt: '.webp' },
  'bouquet/graduacion': { prefix: 'graduation', newExt: '.jpeg', oldExt: '.webp' },
  'decoration/aniversario': { prefix: 'aniver', newExt: '.jpeg', oldExt: '.jpg' },
  'decoration/babyshower': { prefix: 'babys', newExt: '.jpeg', oldExt: '.webp' },
  'decoration/comunionyconfirmacion': { prefix: 'comuni', newExt: '.jpeg', oldExt: '.webp' },
  'decoration/cumpleano': { prefix: 'cumple', newExt: '.jpeg', oldExt: '.webp' },
  'decoration/festivo': { prefix: 'festivo', newExt: '.jpeg', oldExt: '.webp' },
  'decoration/genderreveal': { prefix: 'genderr', newExt: '.jpeg', oldExt: '.webp' },
  'table-decoration': { prefix: 'table', newExt: '.jpeg', oldExt: null },
}

const natural = (a, b) =>
  a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })

const bracketNumber = (name) => {
  const m = name.match(/\((\d+)\)/)
  return m ? Number(m[1]) : 0
}

async function convertToWebp(src, dest) {
  const input = await readFile(src)
  await sharp(input)
    .rotate()
    .resize(1600, 1600, { fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(dest)
}

for (const [rel, cfg] of Object.entries(FOLDERS)) {
  const dir = join(ROOT, rel)
  const entries = await readdir(dir, { withFileTypes: true })
  const files = entries
    .filter((e) => e.isFile() && !e.name.startsWith('__'))
    .map((e) => e.name)

  const newFiles = files.filter((f) => f.toLowerCase().endsWith(cfg.newExt)).sort(natural)
  const oldFiles = cfg.oldExt
    ? files
        .filter((f) => f.toLowerCase().endsWith(cfg.oldExt))
        .sort((a, b) => bracketNumber(a) - bracketNumber(b) || natural(a, b))
    : []

  if (!newFiles.length) {
    console.log(`skip   ${rel} (no new files)`)
    continue
  }

  // 1. convert new files to temporary webp, remove originals
  const tmpNew = []
  for (let i = 0; i < newFiles.length; i++) {
    const tmp = join(dir, `__tmp_new_${String(i).padStart(3, '0')}.webp`)
    await convertToWebp(join(dir, newFiles[i]), tmp)
    await unlinkRetry(join(dir, newFiles[i]))
    tmpNew.push(tmp)
  }

  // 2. move old files to temporary names (converting .jpg old files)
  const tmpOld = []
  for (let i = 0; i < oldFiles.length; i++) {
    const tmp = join(dir, `__tmp_old_${String(i).padStart(3, '0')}.webp`)
    const from = join(dir, oldFiles[i])
    if (oldFiles[i].toLowerCase().endsWith('.webp')) {
      await renameRetry(from, tmp)
    } else {
      await convertToWebp(from, tmp)
      await unlinkRetry(from)
    }
    tmpOld.push(tmp)
  }

  // 3. assign final new-first numbering
  let n = 1
  for (const tmp of tmpNew) {
    await renameRetry(tmp, join(dir, `${cfg.prefix} (${n++}).webp`))
  }
  for (const tmp of tmpOld) {
    await renameRetry(tmp, join(dir, `${cfg.prefix} (${n++}).webp`))
  }

  console.log(
    `done   ${rel} -> ${newFiles.length} new, ${oldFiles.length} old, total ${n - 1}`,
  )
}

console.log('Migration complete.')
