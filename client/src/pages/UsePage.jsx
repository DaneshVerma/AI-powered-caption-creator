import { useState } from "react";
import api from "../config/api";
import ResultCard from "../components/ResultCard";
import UploadCard from "../components/UploadCard";
import { FiZap } from "react-icons/fi";

export default function UsePage() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null); // { caption, media_url, media_type }
  const [error, setError] = useState(null);

  // caption options state
  const [options, setOptions] = useState({
    language: "english",
    mood: "casual",
    tone: "funny",
    emojis: true,
    hashtags: true,
  });

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

      // attach options to FormData
      Object.entries(options).forEach(([key, value]) => {
        fd.append(key, value);
      });

      const { data } = await api.post("/api/generate", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setFile(null);
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
    <main className='min-h-[calc(100vh-8rem)] bg-neo-cream'>
      <div className='mx-auto max-w-5xl px-4 py-10'>
        {/* Page header */}
        <div className='mb-8'>
          <span className='neo-badge bg-neo-cyan text-neo-black mb-3 inline-block'>
            Create
          </span>
          <h2 className='text-3xl font-heading font-bold text-neo-black flex items-center gap-2'>
            <FiZap className='text-neo-yellow' size={28} />
            Generate a caption
          </h2>
          <p className='text-neo-black/60 font-body mt-1'>
            Upload a photo or video and let{" "}
            <span className='font-heading font-semibold'>captionair</span> do
            its thing.
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
          {/* Upload card */}
          <UploadCard
            busy={busy}
            error={error}
            uploadAndCaption={uploadAndCaption}
            file={file}
            onFile={onFile}
            options={options}
            setOptions={setOptions}
          />

          {/* Result card */}
          <ResultCard result={result} />
        </div>
      </div>
    </main>
  );
}
