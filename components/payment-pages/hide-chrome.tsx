"use client";

import { useEffect } from "react";

interface HideChromeProps {
  hideHeader: boolean;
  hideFooter: boolean;
}

export function HideChrome({ hideHeader, hideFooter }: HideChromeProps) {
  useEffect(() => {
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");

    if (header) header.style.display = hideHeader ? "none" : "";
    if (footer) footer.style.display = hideFooter ? "none" : "";

    return () => {
      if (header) header.style.display = "";
      if (footer) footer.style.display = "";
    };
  }, [hideHeader, hideFooter]);

  return null;
}
