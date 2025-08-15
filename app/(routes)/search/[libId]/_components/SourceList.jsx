import React from 'react';
import Image from 'next/image';

function SourceList({ searchResult }) {
  return (
    <div>
      {searchResult?.slice(0, 4).map((item, index) => {
        const sourceImg = item?.src;
        return (
          <div
            key={index}
            onClick={() => window.open(item.link, '_blank')}
            className="bg-amber-50 p-3 rounded-lg shadow hover:shadow-md transition cursor-pointer"
          >
            {sourceImg && (
              <div className="mb-2">
                <Image
                  src={sourceImg}
                  width={100}
                  height={100}
                  alt={item.displayLink || "source"}
                  className="rounded"
                />
              </div>
            )}
            <p className="text-sm leading-snug line-clamp-1">{item.snippet}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SourceList;