import { useRef, useState } from "react";
import { UploadCloud, FileCheck2, X } from "lucide-react";

export default function FileDropzone({
  label,
  hint = "JPG, PNG up to 5MB",
  accept = "image/png,image/jpeg",
  file,
  onChange,
  className = "",
}) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = (files) => {
    if (files && files[0]) onChange?.(files[0]);
  };

  return (
    <div className={className}>
      {label && <p className="mb-1.5 text-[12.5px] font-semibold text-neutral-700">{label}</p>}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          handleFiles(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition ${
          dragOver ? "border-blue-400 bg-blue-50/60" : "border-neutral-200 bg-neutral-50/40"
        }`}
      >
        {file ? (
          <>
            <FileCheck2 className="h-8 w-8 text-emerald-500" />
            <p className="mt-2 text-[13px] font-semibold text-neutral-800">{file.name}</p>
            <button
              type="button"
              onClick={() => onChange?.(null)}
              className="mt-2 flex items-center gap-1 text-[12px] font-medium text-red-500 hover:underline"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          </>
        ) : (
          <>
            <UploadCloud className="h-8 w-8 text-blue-500" />
            <p className="mt-2 text-[13px] font-medium text-neutral-600">
              Drag &amp; drop your file here
            </p>
            <p className="text-[12.5px] text-neutral-400">
              or{" "}
              <button
                type="button"
                onClick={() => inputRef.current?.click()}
                className="font-semibold text-blue-600 hover:underline"
              >
                click to browse
              </button>
            </p>
            <p className="mt-1.5 text-[11px] text-neutral-400">{hint}</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>
    </div>
  );
}
