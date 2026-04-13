import { useState } from "react";
import { FiCopy, FiCheck, FiImage, FiVideo } from "react-icons/fi";

const ResultCard = ({ result }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (result?.caption) {
      await navigator.clipboard.writeText(result.caption);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const isVideo = result?.media_type === "video";

  return (
    <section className='neo-card p-5'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-heading font-bold text-lg'>Result</h3>
        {result && (
          <span
            className={`neo-badge ${
              isVideo ? "bg-neo-blue" : "bg-neo-peach"
            } text-neo-black`}
          >
            {isVideo ? (
              <span className='flex items-center gap-1'>
                <FiVideo size={12} /> Video
              </span>
            ) : (
              <span className='flex items-center gap-1'>
                <FiImage size={12} /> Image
              </span>
            )}
          </span>
        )}
      </div>

      {/* Empty state */}
      {!result && (
        <div className='h-44 neo-upload-zone flex flex-col items-center justify-center border-style-dashed text-center cursor-default hover:bg-neo-cream'>
          <div className='w-12 h-12 bg-neo-lavender border-[2.5px] border-neo-black rounded-xl flex items-center justify-center mb-3'>
            <FiImage size={20} />
          </div>
          <p className='text-sm font-heading font-medium text-neo-black/50'>
            Your caption & media will appear here
          </p>
        </div>
      )}

      {/* Result content */}
      {result && (
        <div className='space-y-4'>
          {/* Caption */}
          <div className='bg-neo-yellow/30 border-[2.5px] border-neo-black rounded-xl p-4 relative'>
            <p className='text-sm font-body text-neo-black leading-relaxed pr-16'>
              {result.caption}
            </p>
            <button
              onClick={handleCopy}
              className='neo-btn neo-btn-sm bg-neo-white text-neo-black absolute top-3 right-3 flex items-center gap-1'
            >
              {copied ? (
                <>
                  <FiCheck size={13} /> Done!
                </>
              ) : (
                <>
                  <FiCopy size={13} /> Copy
                </>
              )}
            </button>
          </div>

          {/* Media preview */}
          <div className='border-[2.5px] border-neo-black rounded-xl overflow-hidden bg-neo-cream'>
            {isVideo ? (
              <video
                src={result.media_url}
                controls
                playsInline
                className='w-full max-h-[360px] object-contain'
              />
            ) : (
              <img
                src={result.media_url || result.image}
                alt='Uploaded'
                className='w-full max-h-[360px] object-contain'
              />
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ResultCard;
