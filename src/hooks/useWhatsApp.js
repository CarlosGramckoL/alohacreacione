import { useLocation } from 'react-router-dom'
import { messageForPath, waLink } from '../data/whatsapp.js'

export function useWhatsAppLink() {
  const { pathname } = useLocation()
  return waLink(messageForPath(pathname))
}
