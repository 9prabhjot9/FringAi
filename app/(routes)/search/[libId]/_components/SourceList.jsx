import React from 'react'

function SourceList({ searchResult }) {
  return (
    <div className="flex flex-wrap gap-2">
      {searchResult?.slice(0, 4).map((item, index) => {
        const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${item.link}`;

        return (
          <div
            key={index}
            onClick={() => window.open(item.link, '_blank')}
            className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-lg shadow hover:shadow-md transition cursor-pointer line-clamp-4 "
          >
            {/* Favicon */}
            <img
              src={faviconUrl}
              alt={item.displayLink}
              className="w-4 h-4"
            />

            {/* Texts */}
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">{item.displayLink}</span>
              <span className="text-sm font-medium line-clamp-1">
                {item.snippet}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  )
}

export default SourceList