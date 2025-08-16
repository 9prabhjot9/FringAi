import React from 'react'
import Image from 'next/image'

function ImageList({ chat }) {
  return (
    <div className="flex flex-wrap gap-3">
      {chat?.searchResult?.map((item, index) => 
        item?.src ? (
          <Image
            key={index}
            src={item.src}
            alt={item?.title || 'Image'}
            width={200}
            height={200}
            className="rounded-lg mt-6 object-cover"
          />
        ) : null
      )}
    </div>
  )
}

export default ImageList