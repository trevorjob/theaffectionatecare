"use client";

import { useState, useRef, useEffect } from "react";
import { X, Lock, AlertCircle, Download } from "lucide-react";

type Status = "idle" | "loading" | "error";

interface TimesheetDownloadProps {
  className?: string;
  children: React.ReactNode;
}

export default function TimesheetDownload({ className, children }: TimesheetDownloadProps) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setPassword("");
      setStatus("idle");
      setErrorMsg("");
    }
  }, [open]);

  // Trap focus and close on Escape
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/timesheet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.status === 401) {
        setStatus("error");
        setErrorMsg("Incorrect password. Please try again.");
        setPassword("");
        inputRef.current?.focus();
        return;
      }

      if (!res.ok) {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again.");
        return;
      }

      // Trigger browser download from the blob
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "TACS-Staff-Timesheet.pdf";
      link.click();
      URL.revokeObjectURL(url);
      setOpen(false);
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <>
      <button type="button" className={className} onClick={() => setOpen(true)}>
        {children}
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="timesheet-dialog-title"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-ink-900/40 backdrop-blur-sm"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />

          {/* Panel */}
          <div
            ref={dialogRef}
            className="relative z-10 w-full max-w-sm bg-white rounded-2xl shadow-2xl p-8"
          >
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className="absolute top-4 right-4 p-1.5 rounded-lg text-ink-400 hover:text-ink-700 hover:bg-sand-100 transition-colors duration-200"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-sage-100 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5 text-sage-600" aria-hidden="true" />
              </div>
              <div>
                <h2 id="timesheet-dialog-title" className="font-display text-lg text-ink-900 leading-tight">
                  Staff access only
                </h2>
                <p className="font-body text-xs text-ink-400 mt-0.5">
                  Enter your staff password to download
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label
                  htmlFor="timesheet-password"
                  className="font-body text-sm font-medium text-ink-600"
                >
                  Password
                </label>
                <input
                  ref={inputRef}
                  id="timesheet-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  className="w-full px-4 py-3 rounded-xl border border-sand-200 bg-white font-body text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-[box-shadow,border-color] duration-200"
                  placeholder="Enter password"
                  aria-describedby={status === "error" ? "timesheet-error" : undefined}
                  aria-invalid={status === "error" ? "true" : undefined}
                />
                {status === "error" && (
                  <p
                    id="timesheet-error"
                    role="alert"
                    className="flex items-center gap-1.5 font-body text-xs text-red-600"
                  >
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    {errorMsg}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "loading" || !password.trim()}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
              >
                {status === "loading" ? (
                  <>
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Verifying…
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" aria-hidden="true" />
                    Download Timesheet
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
