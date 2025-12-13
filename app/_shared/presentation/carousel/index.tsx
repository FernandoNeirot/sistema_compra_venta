'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'

interface Image {
  url: string
  alt: string
  onClick?: () => void
}
interface Props {
  images?: Image[]
  type?: 'full' | 'small'
  heightLess?: number
}
const Carousel = ({ images, type, heightLess }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (!images || images.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [images])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? (images?.length || 1) - 1 : prevIndex - 1
    )
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === (images?.length || 1) - 1 ? 0 : prevIndex + 1
    )
  }

  return (
    <div className="relative w-full overflow-hidden" style={{ height: heightLess ? `calc(100vh - ${heightLess}px)` : '100vh' }}>
      {images && images.length > 0 && (
        <>
          {images.map((image, index) => (
            <Image
              key={index}
              src={image.url}
              alt={image.alt}
              fill
              onClick={image.onClick}
              priority={index === 0}
              style={{
                cursor: image.onClick ? 'pointer' : 'default',
                objectFit: 'cover'
              }}
              className={`absolute top-0 left-0 transition-opacity duration-500 ${index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
            />
          ))}
          {/* Navigation buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 z-10"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 z-10"
            aria-label="Next image"
          >
            →
          </button>
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full hover:bg-white ${index === currentIndex ? 'bg-white' : 'bg-white/50'
                  }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Carousel