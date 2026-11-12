"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Loader2, Mail } from "lucide-react";
import { personal } from "@/data/personal";
import { cn, easeOut, isValidEmail } from "@/lib/utils";

const initial = { name: "", email: "", subject: "", message: "", company: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) errors.email = "Please enter your email.";
  else if (!isValidEmail(values.email)) errors.email = "Please enter a valid email address.";
  if (!values.subject.trim()) errors.subject = "Please add a subject.";
  if (values.message.trim().length < 10) errors.message = "Please write at least a short message (10+ characters).";
  return errors;
}

function mailtoFor(values) {
  const subject = values.subject || "Hello from your portfolio";
  const body = `${values.message}\n\n${values.name}${values.email ? ` (${values.email})` : ""}`;
  return `mailto:${personal.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({ id, label, error, as = "input", className, ...props }) {
  const Tag = as;
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[13px] font-medium text-ink">
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-xl border bg-white px-4 text-[15px] text-ink placeholder:text-[#a8a8a8] transition-[border-color,box-shadow] duration-200 outline-none",
          "focus:border-ink focus:shadow-[0_0_0_3px_rgba(17,17,17,0.06)]",
          as === "textarea" ? "min-h-[150px] resize-y py-3.5 leading-relaxed" : "h-12",
          error ? "border-[#b42318]" : "border-line hover:border-[#d4d4d4]"
        )}
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-[13px] text-[#b42318]">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | loading | success | error | unconfigured
  const [serverError, setServerError] = useState("");
  const startedAt = useRef(0);
  const formRef = useRef(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length) {
      const first = Object.keys(found)[0];
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }

    setStatus("loading");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, startedAt: startedAt.current }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok && data.ok) {
        setStatus("success");
        setValues(initial);
        return;
      }
      if (data.configured === false) {
        setStatus("unconfigured");
        return;
      }
      setServerError(data.error || "Something went wrong.");
      setStatus("error");
    } catch {
      setServerError("Network error. Please check your connection.");
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: easeOut }}
        role="status"
        className="flex min-h-[420px] flex-col items-start justify-center rounded-2xl border border-line bg-white p-8 sm:p-10"
      >
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink text-white">
          <Check size={20} strokeWidth={2} aria-hidden="true" />
        </span>
        <h3 className="mt-6 text-[24px] font-semibold tracking-[-0.025em] text-ink">Message sent.</h3>
        <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-body">
          Thanks for reaching out. I&apos;ll reply to the email address you provided.
        </p>
        <button
          type="button"
          onClick={() => {
            startedAt.current = Date.now();
            setStatus("idle");
          }}
          className="mt-8 text-[14px] font-medium text-ink underline decoration-line underline-offset-4 hover:decoration-ink"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      noValidate
      aria-label="Contact form"
      className="rounded-2xl border border-line bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" placeholder="Your name" value={values.name} onChange={onChange} error={errors.name} maxLength={100} />
        <Field id="email" label="Email" type="email" autoComplete="email" placeholder="you@company.com" value={values.email} onChange={onChange} error={errors.email} maxLength={200} />
        <Field id="subject" label="Subject" placeholder="Project, role or question" value={values.subject} onChange={onChange} error={errors.subject} maxLength={150} className="sm:col-span-2" />
        <Field id="message" as="textarea" label="Message" placeholder="Tell me a little about what you have in mind." value={values.message} onChange={onChange} error={errors.message} maxLength={5000} className="sm:col-span-2" />
      </div>

      {/* Honeypot: hidden from people and assistive tech, often filled by bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" value={values.company} onChange={onChange} />
      </div>

      <AnimatePresence initial={false}>
        {(status === "error" || status === "unconfigured") && (
          <motion.div
            key={status}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
            className="overflow-hidden"
          >
            <div role="alert" className="mt-6 flex gap-3 rounded-xl border border-line bg-surface p-4 text-[14px] leading-relaxed text-[#444]">
              <AlertCircle size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-ink" aria-hidden="true" />
              <p>
                {status === "unconfigured"
                  ? "Direct sending isn't set up yet, so your message hasn't been sent. "
                  : `${serverError} `}
                <a href={mailtoFor(values)} className="font-medium text-ink underline underline-offset-4">
                  Open it in your email app instead
                </a>
                , your text will be filled in.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-7 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`mailto:${personal.email}`}
          className="inline-flex items-center gap-2 text-[14px] text-body transition-colors hover:text-ink"
        >
          <Mail size={15} strokeWidth={1.8} aria-hidden="true" />
          or email {personal.email}
        </a>
        <button
          type="submit"
          disabled={status === "loading"}
          className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-button px-6 text-[15px] font-medium text-white shadow-[0_1px_2px_rgba(0,0,0,0.12),0_6px_16px_-6px_rgba(0,0,0,0.35)] transition-[transform,background-color] duration-250 hover:-translate-y-px hover:bg-black disabled:opacity-70"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={17} className="animate-spin" aria-hidden="true" />
              Sending…
            </>
          ) : (
            <>
              Send message
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" className="transition-transform duration-250 group-hover:translate-x-1" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
