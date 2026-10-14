import { Link } from 'react-router-dom'
import { GALLERY_TYPES } from '../../data/galleries.js'

export function CategoryNav({ typeKey, activeSlug, className = '' }) {
  const type = GALLERY_TYPES[typeKey]
  if (!type) return null

  return (
    <nav aria-label={`${type.label} categories`}>
      <ul className={`no-scrollbar flex gap-2 overflow-x-auto ${className}`}>
        {type.categories.map((category) => {
          const active = category.slug === activeSlug
          return (
            <li key={category.slug} className="shrink-0">
              <Link
                to={`/${typeKey}/${category.slug}`}
                aria-current={active ? 'page' : undefined}
                className={`inline-block whitespace-nowrap rounded-full border-2 border-navy px-4 py-2 text-[13px] font-extrabold text-navy transition-colors duration-200 hover:bg-navy hover:text-white ${
                  active ? 'bg-yellow' : 'bg-white'
                }`}
              >
                {category.title}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
