"use client";

import { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

type SubmitStatus = "idle" | "submitting" | "success" | "error";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your full name (at least 2 characters).";
  }
  if (!values.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = "Please enter a message (at least 10 characters).";
  }
  return errors;
}

const INPUT_BASE =
  "w-full px-4 py-3 rounded-xl border bg-white font-body text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-[box-shadow,border-color] duration-250";

// ─── Component ────────────────────────────────────────────────────────────────

interface ContactFormProps {
  /**
   * Prefix for all field IDs — prevents duplicate-id issues when the form
   * appears on multiple pages (e.g. "home-" vs "" for the contact page).
   */
  idPrefix?: string;
  /** Number of rows for the message textarea. Defaults to 5. */
  messageRows?: number;
  /** Label for the submit button. Defaults to "Send Message". */
  submitLabel?: string;
}

export default function ContactForm({
  idPrefix = "",
  messageRows = 5,
  submitLabel = "Send Message",
}: ContactFormProps) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<
    Partial<Record<keyof FormValues, boolean>>
  >({});
  const [status, setStatus] = useState<SubmitStatus>("idle");

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormValues]) {
      setErrors((prev) => ({
        ...prev,
        ...validate({ ...values, [name]: value }),
      }));
    }
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, ...validate(values) }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched({ name: true, email: true, subject: true, message: true });
    const errs = validate(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus("submitting");
    // TODO: replace with real API call / server action
    await new Promise((resolve) => setTimeout(resolve, 1200));
    setStatus("success");
  }

  if (status === "success") {
    return (
      <div
        className="flex flex-col items-start gap-4 py-8"
        role="status"
        aria-live="polite"
      >
        <div className="w-12 h-12 rounded-2xl bg-sage-100 flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6 text-sage-600" aria-hidden="true" />
        </div>
        <div className="space-y-2">
          <h3 className="font-display text-xl text-ink-900">Message sent.</h3>
          <p className="font-body text-sm text-ink-500 leading-relaxed max-w-sm">
            Thank you for getting in touch. A member of our team will respond
            within one working day.
          </p>
        </div>
        <button
          type="button"
          className="font-body text-sm font-medium text-sage-600 hover:text-sage-700 transition-colors duration-250"
          onClick={() => {
            setStatus("idle");
            setValues({ name: "", email: "", subject: "", message: "" });
            setErrors({});
            setTouched({});
          }}
        >
          Send another message
        </button>
      </div>
    );
  }

  const p = idPrefix;

  return (
    <form
      className="space-y-4"
      noValidate
      onSubmit={handleSubmit}
      aria-label="Contact form"
    >
      {/* Required field legend */}
      <p className="font-body text-2xs text-ink-400">
        Fields marked <span aria-hidden="true">*</span>
        <span className="sr-only">with an asterisk</span> are required.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Name */}
        <div className="space-y-1.5">
          <label
            htmlFor={`${p}name`}
            className="font-body text-sm font-medium text-ink-600"
          >
            Full name{" "}
            <span className="text-sage-500" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={`${p}name`}
            name="name"
            type="text"
            required
            aria-required="true"
            aria-invalid={touched.name && !!errors.name ? "true" : undefined}
            aria-describedby={
              touched.name && errors.name ? `${p}name-error` : undefined
            }
            autoComplete="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={[
              INPUT_BASE,
              touched.name && errors.name
                ? "border-red-300 focus:ring-red-300"
                : "border-sand-200",
            ].join(" ")}
            placeholder="Jane Smith"
          />
          {touched.name && errors.name && (
            <p
              id={`${p}name-error`}
              role="alert"
              className="flex items-center gap-1.5 font-body text-2xs text-red-600"
            >
              <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label
            htmlFor={`${p}email`}
            className="font-body text-sm font-medium text-ink-600"
          >
            Email address{" "}
            <span className="text-sage-500" aria-hidden="true">
              *
            </span>
          </label>
          <input
            id={`${p}email`}
            name="email"
            type="email"
            required
            aria-required="true"
            aria-invalid={touched.email && !!errors.email ? "true" : undefined}
            aria-describedby={
              touched.email && errors.email ? `${p}email-error` : undefined
            }
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={[
              INPUT_BASE,
              touched.email && errors.email
                ? "border-red-300 focus:ring-red-300"
                : "border-sand-200",
            ].join(" ")}
            placeholder="jane@example.com"
          />
          {touched.email && errors.email && (
            <p
              id={`${p}email-error`}
              role="alert"
              className="flex items-center gap-1.5 font-body text-2xs text-red-600"
            >
              <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Subject */}
      <div className="space-y-1.5">
        <label
          htmlFor={`${p}subject`}
          className="font-body text-sm font-medium text-ink-600"
        >
          Subject
        </label>
        <select
          id={`${p}subject`}
          name="subject"
          value={values.subject}
          onChange={handleChange}
          className={`${INPUT_BASE} border-sand-200 appearance-none`}
        >
          <option value="">Select a subject…</option>
          <option value="general">General Enquiry</option>
          <option value="staffing">Staffing</option>
          <option value="join">Join the Team</option>
          <option value="other">Other</option>
        </select>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label
          htmlFor={`${p}message`}
          className="font-body text-sm font-medium text-ink-600"
        >
          Message{" "}
          <span className="text-sage-500" aria-hidden="true">
            *
          </span>
        </label>
        <textarea
          id={`${p}message`}
          name="message"
          required
          aria-required="true"
          aria-invalid={
            touched.message && !!errors.message ? "true" : undefined
          }
          aria-describedby={
            touched.message && errors.message
              ? `${p}message-error`
              : undefined
          }
          rows={messageRows}
          value={values.message}
          onChange={handleChange}
          onBlur={handleBlur}
          className={[
            INPUT_BASE,
            "resize-none",
            touched.message && errors.message
              ? "border-red-300 focus:ring-red-300"
              : "border-sand-200",
          ].join(" ")}
          placeholder="Tell us how we can help…"
        />
        {touched.message && errors.message && (
          <p
            id={`${p}message-error`}
            role="alert"
            className="flex items-center gap-1.5 font-body text-2xs text-red-600"
          >
            <AlertCircle className="w-3 h-3 shrink-0" aria-hidden="true" />
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none"
        aria-busy={status === "submitting"}
      >
        {status === "submitting" ? (
          <>
            <svg
              className="w-4 h-4 animate-spin"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Sending…
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
