import { lazy, Suspense, useState } from 'react'
import { Eye } from 'lucide-react'

const Lightbox = lazy(() => import('./LightboxLazy.jsx'))

const accents = ['border-ink', 'border-pink', 'border-mint', 'border-yellow', 'border-coral']

export function GalleryGrid({ images, title, altPrefix }) {
  const [index, setIndex] = useState(-1)

  if (!images.length) {
    return (
      <p className="rounded-blob border-2 border-ink bg-pink-tint p-10 text-center text-[17px] font-semibold text-ink">
        New photos are on the way. Message us on WhatsApp to see more of our work.
      </p>
    )
  }

  const slides = images.map((image) => ({ src: image.src }))
  const altBase = altPrefix || title

  return (
    <>
      <div className="columns-2 gap-4 sm:gap-6 lg:columns-3">
        {images.map((image, imageIndex) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setIndex(imageIndex)}
            aria-label={`Open ${altBase} photo ${imageIndex + 1}`}
            className="group relative mb-4 block w-full break-inside-avoid sm:mb-6"
          >
            <img
              src={image.src}
              srcSet={image.srcset}
              sizes="(min-width: 1024px) 28vw, 45vw"
              width={image.w}
              height={image.h}
              alt={`${altBase} — photo ${imageIndex + 1}`}
              loading="lazy"
              decoding="async"
              className={`w-full h-auto rounded-[18px] border-2 transition-transform duration-300 group-hover:rotate-1 group-hover:scale-[1.02] sm:rounded-[22px] ${
                accents[imageIndex % accents.length]
              }`}
            />
            <span className="absolute inset-0 flex items-center justify-center rounded-[22px] bg-transparent transition-colors group-hover:bg-ink/35">
              <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white text-ink opacity-0 transition-opacity group-hover:opacity-100">
                <Eye aria-hidden="true" className="h-5 w-5" />
              </span>
            </span>
          </button>
        ))}
      </div>

      {index >= 0 ? (
        <Suspense fallback={null}>
          <Lightbox
            open
            index={index}
            close={() => setIndex(-1)}
            slides={slides}
            controller={{ closeOnBackdropClick: true }}
          />
        </Suspense>
      ) : null}
    </>
  )
}
