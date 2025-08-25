import React from "react";

const UploadCard = ({
  uploadAndCaption,
  busy,
  error,
  file,
  onFile,
  options,
  setOptions,
}) => {
  return (
    <section className='rounded-2xl border bg-white shadow-sm p-5'>
      <div className='flex items-start justify-between mb-3'>
        <h3 className='font-medium'>Upload Image</h3>
      </div>

      {/* File upload */}
      <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50'>
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt='Selected Preview'
            className='object-contain max-h-40'
          />
        ) : (
          <div className='flex flex-col items-center justify-center'>
            <span className='text-sm text-gray-600'>
              Click to upload or drag & drop
            </span>
            <span className='text-xs text-gray-500'>PNG, JPG or JPEG</span>
          </div>
        )}
        <input
          type='file'
          accept='image/*'
          onChange={onFile}
          className='hidden'
        />
      </label>

      {/* Options */}
      <div className='mt-4 space-y-3'>
        {/* Language */}
        <div>
          <label className='text-sm font-medium block mb-1'>Language</label>
          <select
            value={options.language}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, language: e.target.value }))
            }
            className='w-full rounded-lg border px-2 py-1 cursor-pointer'
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
          <label className='text-sm font-medium block mb-1'>Mood</label>
          <select
            value={options.mood}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, mood: e.target.value }))
            }
            className='w-full rounded-lg border px-2 py-1 cursor-pointer'
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
          <label className='text-sm font-medium block mb-1'>Tone</label>
          <select
            value={options.tone}
            onChange={(e) =>
              setOptions((prev) => ({ ...prev, tone: e.target.value }))
            }
            className='w-full rounded-lg border px-2 py-1 cursor-pointer'
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
        <div className='flex items-center space-x-4'>
          <label className='flex items-center space-x-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={options.emojis}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, emojis: e.target.checked }))
              }
              className='cursor-pointer'
            />
            <span>Include Emojis</span>
          </label>

          <label className='flex items-center space-x-2 cursor-pointer'>
            <input
              type='checkbox'
              checked={options.hashtags}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, hashtags: e.target.checked }))
              }
              className='cursor-pointer'
            />
            <span>Include Hashtags</span>
          </label>
        </div>
      </div>

      {/* Button */}
      <button
        onClick={uploadAndCaption}
        disabled={!file || busy}
        className='mt-4 w-full cursor-pointer disabled:cursor-not-allowed rounded-xl bg-gray-900 text-white py-2.5 hover:opacity-90 disabled:opacity-50'
      >
        {busy ? "Generating..." : "Upload & Generate Caption"}
      </button>

      {/* Error */}
      {error && (
        <div className='mt-3 rounded-xl border bg-red-50 px-3 py-2 text-sm text-red-700'>
          {error}
        </div>
      )}
    </section>
  );
};

export default UploadCard;
