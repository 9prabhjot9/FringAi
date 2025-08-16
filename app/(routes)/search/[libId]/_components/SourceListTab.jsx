import React from 'react'

function SourceListTab({ chat }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 w-50 sm:w-150 md:w-230 ">
      {chat?.searchResult?.map((item, index) => {
        const faviconUrl = `https://www.google.com/s2/favicons?sz=64&domain_url=${item.link}`

        return (
          <div
            key={index}
            onClick={() => window.open(item.link, '_blank')}
            className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-lg shadow hover:shadow-md transition cursor-pointer"
          >
            {/* Favicon */}
            <img
              src={faviconUrl}
              alt={item.displayLink}
              className="w-4 h-4"
            />

            {/* Source text */}
            <span className="text-sm text-blue-800 hover:underline">
              {item.displayLink}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default SourceListTab