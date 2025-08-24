import React, { useState } from "react";

const ResultCard = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result?.caption) {
      await navigator.clipboard.writeText(result.caption);
      setCopied(true);

      // reset back after 2s
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div>
      <section className='rounded-2xl border bg-white shadow-sm p-5'>
        <h3 className='font-medium mb-3'>Result</h3>

        {!result && (
          <div className='text-sm text-gray-600'>
            Caption and hosted image will appear here after processing.
          </div>
        )}

        {result && (
          <div className='space-y-4'>
            <div className='rounded-xl border bg-gray-50 px-3 py-2 flex justify-between items-start'>
              <p className='text-sm text-gray-800 leading-relaxed pr-3'>
                {result.caption}
              </p>
              <button
                onClick={handleCopy}
                className='text-xs bg-gray-200 cursor-pointer border hover:bg-gray-300 px-2 py-1 rounded-md'
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </div>
            <figure className='rounded-xl border bg-gray-50 p-2'>
              <img
                src={result.image}
                alt='Uploaded'
                className='w-full max-h-[360px] object-contain rounded-lg'
              />
            </figure>
          </div>
        )}
      </section>
    </div>
  );
};

export default ResultCard;
