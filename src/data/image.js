export function toImage(value) {
  if (!value) return { src: '', srcset: undefined }
  if (typeof value === 'string') {
    const entries = value
      .split(',')
      .map((entry) => entry.trim())
      .filter(Boolean)
    if (!entries.length) return { src: value, srcset: undefined }
    const last = entries[entries.length - 1]
    const src = last.split(/\s+/)[0]
    return { src, srcset: value }
  }
  return value
}
