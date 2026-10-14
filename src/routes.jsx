import { Layout } from './components/layout/Layout.jsx'
import Home from './pages/Home.jsx'
import GalleryIndex from './pages/GalleryIndex.jsx'
import Gallery from './pages/Gallery.jsx'
import TableDecorations from './pages/TableDecorations.jsx'
import NotFound from './pages/NotFound.jsx'

export const routes = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'table-decorations', element: <TableDecorations /> },
      { path: ':type', element: <GalleryIndex /> },
      { path: ':type/:slug', element: <Gallery /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
