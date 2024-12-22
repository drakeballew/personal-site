import React from 'react'

interface Media {
  src: string
  alt: string
  type: 'image' | 'video'
}

interface ImageGalleryProps {
  media: Media[]
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ media = [] }) => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {media.map((item, index) => (
        <div key={index} className="overflow-hidden rounded-lg shadow-lg">
          {item.type === 'image' ? (
            <img src={item.src} alt={item.alt} className="w-full h-full object-cover" />
          ) : item.type === 'video' ? (
            <video
              controls
              className="w-full h-auto object-cover"
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : null}
        </div>
      ))}
    </div>
  )
}

export default ImageGallery