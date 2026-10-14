import { CONTACT } from './site.js'
import { getCategory } from './galleries.js'

export function waLink(message) {
  if (!message) return CONTACT.whatsapp
  return `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`
}

const message = (thing) => `I'm interested in ${thing}. I would like more information.`

export function messageForPath(pathname) {
  const parts = (pathname || '/').split('/').filter(Boolean)

  if (parts[0] === 'table-decorations') {
    return message('your table decorations')
  }

  if (parts[0] === 'bouquet' || parts[0] === 'decoration') {
    const type = parts[0]
    const label = type === 'bouquet' ? 'balloon bouquets' : 'balloon decorations'
    const result = parts[1] ? getCategory(type, parts[1]) : null
    if (result) return message(`${result.category.title} ${label}`)
    return message(`your ${label}`)
  }

  return message('your balloon bouquets and decorations')
}
