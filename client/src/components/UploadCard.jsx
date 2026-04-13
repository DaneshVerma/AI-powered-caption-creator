import { FiUpload, FiImage, FiVideo, FiZap } from "react-icons/fi";

const UploadCard = ({
  uploadAndCaption,
  busy,
  error,
  file,
  onFile,
  options,
  setOptions,
}) => {
  const isVideo = file?.type?.startsWith("video/");

  return (
    <section className='neo-card p-5'>
      {/* Header */}
      <div className='flex items-center justify-between mb-4'>
        <h3 className='font-heading font-bold text-lg flex items-center gap-2'>
          <FiUpload size={18} />
          Upload Media
        </h3>
        {file && (
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

      {/* File upload zone */}
      <label className='neo-upload-zone flex flex-col items-center justify-center w-full h-44 cursor-pointer overflow-hidden'>
        {file ? (
          isVideo ? (
            <video
              src={URL.createObjectURL(file)}
              className='object-contain max-h-44 rounded-xl'
              muted
              playsInline
            />
          ) : (
            <img
              src={URL.createObjectURL(file)}
              alt='Selected Preview'
              className='object-contain max-h-44 rounded-xl'
            />
          )
        ) : (
          <div className='flex flex-col items-center justify-center text-center px-4'>
            <div className='w-12 h-12 bg-neo-yellow border-[2.5px] border-neo-black rounded-xl flex items-center justify-center mb-3'>
              <FiUpload size={20} />
            </div>
            <span className='text-sm font-heading font-semibold text-neo-black'>
              Click to upload or drag & drop
            </span>
            <span className='text-xs text-neo-black/50 font-body mt-1'>
              PNG, JPG, WebP, GIF, MP4, WebM, MOV
            </span>
          </div>
        )}
        <input
          type='file'
          accept='image/*,video/*'
          onChange={onFile}
          className='hidden'
        />
      </label>

      {/* Options */}
      <div className='mt-5 space-y-3'>
        {/* Language */}
        <div>
          <label className='text-sm font-heading font-semibold block mb-1.5'>
            Language
          </label>
          <select
            value={options.language}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, language: e.target.value }))
            }
            className='neo-select'
          >
            <option value='Hinglish'>Hinglish</option>
            <option value='English'>English</option>
            <option value='Hindi'>Hindi</option>
            <option value='Urdu'>Urdu</option>
            <option value='Punjabi'>Punjabi</option>
            <option value='Bangla'>Bangla</option>
            <option value='Tamil'>Tamil</option>
            <option value='Telugu'>Telugu</option>
            <option value='Gujarati'>Gujarati</option>
            <option value='Marathi'>Marathi</option>
          </select>
        </div>

        {/* Mood */}
        <div>
          <label className='text-sm font-heading font-semibold block mb-1.5'>
            Mood
          </label>
          <select
            value={options.mood}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, mood: e.target.value }))
            }
            className='neo-select'
          >
            <option value='casual'>Casual</option>
            <option value='sarcastic'>Sarcastic</option>
            <option value='romantic'>Romantic</option>
            <option value='inspirational'>Inspirational</option>
            <option value='trending'>Trending</option>
            <option value='emotional'>Emotional</option>
            <option value='aesthetic'>Aesthetic</option>
            <option value='witty'>Witty</option>
            <option value='storytelling'>Storytelling</option>
            <option value='informative'>Informative</option>
          </select>
        </div>

        {/* Tone */}
        <div>
          <label className='text-sm font-heading font-semibold block mb-1.5'>
            Tone
          </label>
          <select
            value={options.tone}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, tone: e.target.value }))
            }
            className='neo-select'
          >
            <option value='friendly'>Friendly</option>
            <option value='professional'>Professional</option>
            <option value='formal'>Formal</option>
            <option value='casual'>Casual</option>
            <option value='engaging'>Engaging</option>
            <option value='serious'>Serious</option>
            <option value='polite'>Polite</option>
            <option value='direct'>Direct</option>
            <option value='authoritative'>Authoritative</option>
            <option value='optimistic'>Optimistic</option>
          </select>
        </div>

        {/* Toggles */}
        <div className='flex items-center gap-5 pt-1'>
          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={options.emojis}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, emojis: e.target.checked }))
              }
              className='neo-checkbox'
            />
            <span className='text-sm font-heading font-medium'>Emojis</span>
          </label>

          <label className='flex items-center gap-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={options.hashtags}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, hashtags: e.target.checked }))
              }
              className='neo-checkbox'
            />
            <span className='text-sm font-heading font-medium'>Hashtags</span>
          </label>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={uploadAndCaption}
        disabled={!file || busy}
        className='neo-btn neo-btn-primary w-full mt-5 flex items-center justify-center gap-2'
      >
        {busy ? (
          <>
            <span className='inline-block w-4 h-4 border-2 border-neo-black border-t-transparent rounded-full animate-spin' />
            Generating...
          </>
        ) : (
          <>
            <FiZap size={16} />
            Generate Caption
          </>
        )}
      </button>

      {/* Error */}
      {error && (
        <div className='mt-3 neo-badge bg-neo-red/15 text-neo-red text-sm w-full text-center py-2'>
          {error}
        </div>
      )}
    </section>
  );
};

export default UploadCard;
