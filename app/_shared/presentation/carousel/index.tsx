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
  return (
    <div className="relative w-full " style={{ height: heightLess ? `calc(100vh - ${heightLess}px)` : '100vh' }}>
      {
        images && images.length > 0 &&
        images.map((image, index) =>
          <Image
            key={index}
            src={image.url}
            alt={image.alt}
            width={type === 'full' ? 1200 : 600}
            height={type === 'full' ? 400 : 200}
            onClick={image.onClick}
            style={{ cursor: image.onClick ? 'pointer' : 'default', height: heightLess ? `calc(100vh - ${heightLess}px)` : '100vh' }}
            className="w-full object-cover"
          />
        )
      }
    </div>
  )
}

export default Carousel