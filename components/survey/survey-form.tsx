"use client";

import { useRef, useState, type FormEvent } from "react";
import { Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { SurveyFormConfig, SurveyFormField } from "@/lib/survey-form";

interface SurveyFormProps {
  config: SurveyFormConfig;
  /** From `?email=`: the answers attach to the same CRM contact as the waitlist signup. */
  initialEmail?: string;
  language: string;
}

const GENERIC_ERROR = "Something went wrong. Please try again.";
const AUTOCOMPLETE: Record<string, string> = { name: "name", email: "email", phone: "tel" };

/** Checkbox groups are sent as the ", "-joined selection, like every Forms-module form. */
function toggle(value: string, option: string): string {
  const picked = value ? value.split(", ").filter(Boolean) : [];
  return (picked.includes(option) ? picked.filter((p) => p !== option) : [...picked, option]).join(", ");
}

export function SurveyForm({ config, initialEmail, language }: SurveyFormProps) {
  const fields = config.fields;
  const [values, setValues] = useState<Record<string, string>>(() => {
    const out: Record<string, string> = {};
    for (const f of fields) if (f.defaultValue) out[f.key] = f.defaultValue;
    if (initialEmail) out.email = initialEmail;
    return out;
  });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [missing, setMissing] = useState<string | null>(null);
  const loadTime = useRef(Date.now());
  const honeypot = useRef("");

  const set = (key: string, v: string) => {
    setValues((prev) => ({ ...prev, [key]: v }));
    if (missing === key) setMissing(null);
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;
    const firstMissing = fields.find((f) => f.required && !(values[f.key] ?? "").trim());
    if (firstMissing) {
      setMissing(firstMissing.key);
      document.getElementById(`survey-${firstMissing.key}`)?.focus();
      return;
    }
    const formData: Record<string, string> = {};
    for (const f of fields) {
      const v = (values[f.key] ?? "").trim();
      if (v) formData[f.key] = v;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/form-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form_data: formData,
          config_id: config.formId,
          page_title: "Survey",
          language,
          honeypot_field: honeypot.current,
          submission_time: loadTime.current,
        }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="text-center py-6" role="status">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 mb-4">
          <Check className="h-6 w-6 text-gold" />
        </div>
        <p className="text-lg text-foreground">{config.successMessage}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        onChange={(e) => (honeypot.current = e.target.value)}
        className="absolute -left-[9999px] h-px w-px opacity-0"
      />
      {fields.map((f) => (
        <Question key={f.key} field={f} value={values[f.key] ?? ""} onChange={(v) => set(f.key, v)} invalid={missing === f.key} busy={status === "sending"} />
      ))}
      <Button
        type="submit"
        disabled={status === "sending"}
        size="lg"
        className="bg-gold hover:bg-gold-dark text-foreground font-medium h-12 rounded-xl shadow-lg shadow-gold/20 w-full text-base"
      >
        {status === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : config.submitButtonText || "Send"}
      </Button>
      {status === "error" && (
        <p className="text-red-500 text-sm text-center" role="alert">
          {config.errorMessage || GENERIC_ERROR}
        </p>
      )}
    </form>
  );
}

function Question({ field, value, onChange, invalid, busy }: { field: SurveyFormField; value: string; onChange: (v: string) => void; invalid: boolean; busy: boolean }) {
  const id = `survey-${field.key}`;
  const helpId = field.helpText ? `${id}-help` : undefined;
  const options = field.options ?? [];
  const isGroup = field.type === "radio" || field.type === "checkbox";
  const control = (() => {
    if (field.type === "textarea") {
      return (
        <textarea id={id} rows={4} value={value} disabled={busy} placeholder={field.placeholder} onChange={(e) => onChange(e.target.value)} aria-describedby={helpId} className="w-full rounded-xl border border-border bg-background px-3 py-2 text-base" />
      );
    }
    if (isGroup) {
      const picked = value.split(", ");
      return (
        <div className="space-y-2" role={field.type === "radio" ? "radiogroup" : "group"} aria-labelledby={`${id}-label`}>
          {options.map((opt) => (
            <label key={opt} className="flex items-start gap-3 text-base cursor-pointer">
              <input
                type={field.type}
                name={id}
                checked={field.type === "radio" ? value === opt : picked.includes(opt)}
                disabled={busy}
                onChange={() => onChange(field.type === "radio" ? opt : toggle(value, opt))}
                className="mt-1.5"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      );
    }
    if (field.type === "dropdown") {
      return (
        <select id={id} value={value} disabled={busy} onChange={(e) => onChange(e.target.value)} className="h-12 w-full rounded-xl border border-border bg-background px-3 text-base">
          <option value="" />
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      );
    }
    const type = ["email", "tel", "number", "url", "date"].includes(field.type) ? field.type : "text";
    return (
      <Input
        id={id}
        type={type}
        dir={type === "email" || type === "tel" || type === "number" ? "ltr" : undefined}
        inputMode={type === "number" ? "decimal" : undefined}
        min={type === "number" ? field.min : undefined}
        max={type === "number" ? field.max : undefined}
        autoComplete={AUTOCOMPLETE[field.key]}
        value={value}
        disabled={busy}
        placeholder={field.placeholder}
        aria-describedby={helpId}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 rounded-xl text-base bg-background border-border"
      />
    );
  })();
  return (
    <div>
      {isGroup ? (
        <p id={`${id}-label`} className="font-medium mb-2">{field.label}{field.required ? " *" : ""}</p>
      ) : (
        <label htmlFor={id} className="block font-medium mb-2">{field.label}{field.required ? " *" : ""}</label>
      )}
      {field.helpText && <p id={helpId} className="text-sm text-foreground/60 mb-2">{field.helpText}</p>}
      {control}
      {invalid && <p className="text-red-500 text-xs mt-1" role="alert">This question needs an answer.</p>}
    </div>
  );
}
