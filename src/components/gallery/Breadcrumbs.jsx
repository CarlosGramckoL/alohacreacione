import { Link } from 'react-router-dom'

export function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-[13px] font-semibold">
        {items.map((item, index) => {
          const last = index === items.length - 1
          return (
            <li key={item.path} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="text-navy">
                  {item.name}
                </span>
              ) : (
                <Link to={item.path} className="text-ink-soft transition-colors hover:text-navy">
                  {item.name}
                </Link>
              )}
              {!last ? (
                <span aria-hidden="true" className="text-ink-soft">
                  /
                </span>
              ) : null}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
