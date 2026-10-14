import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes.jsx'
import './styles/index.css'

export const createRoot = ViteReactSSG({ routes })
