import { useState } from "react";
import api from "../config/api";
import ResultCard from "../components/ResultCard";
import UploadCard from "../components/UploadCard";

export default function UsePage() {
  const [file, setFile] = useState(null);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null); // { caption, image }
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

      const { data } = await api.post("/api", fd, {
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
    <main className="min-h-[calc(90vh-56px)] bg-gray-50">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Create a caption</h2>
          <p className="text-gray-600">
            Upload an image and let{" "}
            <span className="font-medium">captionair ai</span> do the rest.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
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
