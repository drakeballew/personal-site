import React from 'react'

interface Image {
  src: string
  alt: string
}

interface ImageGalleryProps {
  images: Image[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ images }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((image, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
          <img src={image.src} alt={image.alt} className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  )
}

export default ImageGallery