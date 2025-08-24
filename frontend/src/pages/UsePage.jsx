import { useState, useMemo } from "react";
import api from "../config/api";
import ResultCard from "../components/ResultCard";

export default function UsePage() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null); // { caption, image }
  const [error, setError] = useState(null);



  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setResult(null);
    setError(null);
    setFile(f);
  };

  const uploadAndCaption = async () => {
    if (!file) return;
    setBusy(true);
    setError(null);
    setResult(null);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const { data } = await api.post("/api", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFile(null)
      setResult(data);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Failed to upload or caption";
      setError(message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <main className='min-h-[calc(100vh-56px)] bg-gray-50'>
      <div className='mx-auto max-w-5xl px-4 py-8'>
        <div className='mb-6'>
          <h2 className='text-2xl font-semibold'>Create a caption</h2>
          <p className='text-gray-600'>
            Upload an image and let{" "}
            <span className='font-medium'>captionair ai</span> do the rest.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          {/* Upload card */}
          <section className='rounded-2xl border bg-white shadow-sm p-5'>
            <div className='flex items-start justify-between mb-3'>
              <h3 className='font-medium'>Upload Image</h3>
            </div>

            <label className='flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-xl cursor-pointer hover:bg-gray-50'>
              {file ? (
                <img
                  src={URL.createObjectURL(file)} // ✅ directly show selected file locally
                  alt='Selected Preview'
                  className='object-contain max-h-40'
                />
              ) : (
                <div className='flex flex-col items-center justify-center'>
                  <span className='text-sm text-gray-600'>
                    Click to upload or drag & drop
                  </span>
                  <span className='text-xs text-gray-500'>
                    PNG, JPG or JPEG
                  </span>
                </div>
              )}
              <input
                type='file'
                accept='image/*'
                onChange={onFile}
                className='hidden'
              />
            </label>

            <button
              onClick={uploadAndCaption}
              disabled={!file || busy}
              className='mt-4 w-full disabled:cursor-not-allowed rounded-xl bg-gray-900 text-white py-2.5 hover:opacity-90 disabled:opacity-50'
            >
              {busy ? "Generating..." : "Upload & Generate Caption"}
            </button>

            {error && (
              <div className='mt-3 rounded-xl border bg-red-50 px-3 py-2 text-sm text-red-700'>
                {error}
              </div>
            )}
          </section>

          {/* Result card */}
          <ResultCard result={result} />
        </div>
      </div>
    </main>
  );
}
