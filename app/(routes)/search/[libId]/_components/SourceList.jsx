import React from 'react'

function SourceList({searchResult}) {
  return (
    <div>
         
      {searchResult?.items?.slice(0,4).map((item, index) => {
    
        const sourceImg =
          item?.pagemap?.cse_thumbnail?.[0]?.src ||
          item?.pagemap?.cse_image?.[0]?.src;
        

        return (
          <div
            key={index}
            onClick={()=> window.open(item.link, '_blank')}
            className="bg-amber-50 p-3 rounded-lg shadow hover:shadow-md transition cursor-pointer "
          >
            {/* Thumbnail */}
            {sourceImg && (
              <div className="mb-2 ">
                <Image
                  src={sourceImg}
                  width={20}
                  height={20}
                  alt={item.displayLink}
                  className="rounded"
                />
              </div>
            )}

            {/* Description */}
            <p className="text-sm leading-snug line-clamp-1">
              {item.snippet}
            </p>
          </div>
        );
      })}
    </div>
  )
}

export default SourceList
