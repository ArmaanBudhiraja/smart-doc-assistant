"use client";

import { useState, useCallback } from "react";
import { Upload, FileText, X, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { uploadPDF } from "../lib/api";
import "../globals.css";

interface PDFUploaderProps {
  onUploaded?: (fileName: string, charCount: number) => void;
  currentFile?: string | null;
  onClear?: () => void;
}

export const PDFUploader = ({
  onUploaded,
  currentFile,
  onClear,
}: PDFUploaderProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);

      if (file.type !== "application/pdf") {
        setError("Please upload a PDF file");
        return;
      }

      if (file.size > 10 * 1024 * 1024) {
        setError("File size must be less than 10MB");
        return;
      }

      setProcessing(true);
      try {
        const res = await uploadPDF(file);
        onUploaded?.(file.name, res.chars);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to upload PDF"
        );
      } finally {
        setProcessing(false);
      }
    },
    [onUploaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  /* ================= FILE LOADED STATE ================= */

  if (currentFile) {
    return (
      <div className="rounded-xl border bg-card p-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-500/15 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <p className="font-medium">{currentFile}</p>
              <p className="text-sm text-muted-foreground">
                Ready for questions
              </p>
            </div>
          </div>

          {onClear && (
            <button
              onClick={onClear}
              className="p-2 rounded-lg hover:bg-muted transition"
              aria-label="Remove file"
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>
          )}
        </div>
      </div>
    );
  }

  /* ================= UPLOAD STATE ================= */

  return (
    <div className="upload-box">
      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={cn("upload-label",
          isDragOver
            ? "border-primary bg-primary/5 scale-[1.02]"
            : "border-border hover:border-primary/50",
          processing && "pointer-events-none opacity-70"
        )}
      >
        <input
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          className="input-file"
          disabled={processing}
        />

        <div className="flex flex-col items-center gap-4">
          <div
            className={cn(
              "w-20 h-20 rounded-2xl flex items-center justify-center",
              isDragOver ? "bg-primary/20" : "bg-secondary"
            )}
          >
            {processing ? (
              <Loader2 className="loader-image" />
            ) : (
              <Upload className="upload-image" />
            )}
          </div>

          <div className="label-text-box">
            <p className="label-heading-text">
              {processing
                ? "Uploading PDF..."
                : isDragOver
                ? "Drop your PDF here"
                : "Upload your PDF"}
            </p>
            <p className="label-description-text">
              Drag & drop or click to browse
            </p>
          </div>

          <div className="size-info-box">
            <FileText className="size-icon" />
            <span className="size-text">PDF up to 10MB</span>
          </div>
        </div>
      </label>

      {error && (
        <div className="mt-4 p-4 rounded-lg border border-red-500/20 bg-red-500/10 text-red-500 text-sm">
          {error}
        </div>
      )}
    </div>
  );
};
