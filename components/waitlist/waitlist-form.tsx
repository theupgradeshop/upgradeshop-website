"use client";

import { useState, useMemo } from "react";
import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib";
import { countries, getFlagEmoji } from "./country-data";

const waitlistSchema = z.object({
  email: z.email("Please enter a valid email"),
  countryCode: z.string().min(1, "Select a country"),
  phone: z.string().min(5, "Please enter your phone number"),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistFormProps {
  className?: string;
  variant?: "light" | "dark";
}

export function WaitlistForm({ className, variant = "light" }: WaitlistFormProps) {
  const t = useTranslations("waitlist");
  const locale = useLocale();
  const [isSuccess, setIsSuccess] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const defaultCountryCode = locale === "he" ? countries.find(c => c.iso === "IL")?.dialCode ?? "" : "";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      countryCode: defaultCountryCode,
    },
  });

  const sortedCountries = useMemo(() => {
    if (locale === "he") {
      const israel = countries.find((c) => c.iso === "IL");
      const rest = countries.filter((c) => c.iso !== "IL");
      return israel ? [israel, ...rest] : rest;
    }
    return countries;
  }, [locale]);

  const onSubmit = async (data: WaitlistFormData) => {
    setServerError(null);
    try {
      const waId = data.countryCode + data.phone.replace(/^0+/, "");
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          phone: waId,
          language: locale,
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        setServerError(err.error || t("errorGeneric"));
        return;
      }

      setIsSuccess(true);
    } catch {
      setServerError(t("errorGeneric"));
    }
  };

  const isDark = variant === "dark";

  if (isSuccess) {
    return (
      <div className={cn("text-center py-6", className)}>
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/20 mb-4">
          <Check className="h-6 w-6 text-gold" />
        </div>
        <h3
          className={cn(
            "text-xl font-display font-normal mb-2",
            isDark ? "text-primary-foreground" : "text-foreground"
          )}
        >
          {t("successTitle")}
        </h3>
        <p
          className={cn(
            "text-base",
            isDark ? "text-primary-foreground/80" : "text-foreground/70"
          )}
        >
          {t("successMessage")}
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("w-full max-w-md mx-auto", className)}
    >
      <div className="flex flex-col gap-3">
        {/* Email */}
        <div>
          <Input
            type="email"
            placeholder={t("emailPlaceholder")}
            className={cn(
              "h-12 rounded-xl text-base",
              isDark
                ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                : "bg-background border-border"
            )}
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone: country code + number */}
        <div className="flex gap-2">
          <div className="w-[130px] shrink-0">
            <select
              className={cn(
                "h-12 w-full rounded-xl border px-3 text-sm",
                isDark
                  ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground"
                  : "bg-background border-border text-foreground"
              )}
              {...register("countryCode")}
            >
              <option value="">{t("countryCode")}</option>
              {sortedCountries.map((c) => (
                <option key={c.iso} value={c.dialCode}>
                  {getFlagEmoji(c.iso)} +{c.dialCode}
                </option>
              ))}
            </select>
            {errors.countryCode && (
              <p className="text-red-500 text-xs mt-1">
                {errors.countryCode.message}
              </p>
            )}
          </div>
          <div className="flex-1">
            <Input
              type="tel"
              placeholder={t("phonePlaceholder")}
              className={cn(
                "h-12 rounded-xl text-base",
                isDark
                  ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/40"
                  : "bg-background border-border"
              )}
              {...register("phone")}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          disabled={isSubmitting}
          size="lg"
          className="bg-gold hover:bg-gold-dark text-foreground font-medium h-12 rounded-xl shadow-lg shadow-gold/20 hover:shadow-xl hover:shadow-gold/30 transition-all duration-300 w-full text-base"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("submitting")}
            </>
          ) : (
            <>
              {t("submit")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </>
          )}
        </Button>
      </div>

      {serverError && (
        <p className="text-red-500 text-sm text-center mt-2">{serverError}</p>
      )}
    </form>
  );
}
