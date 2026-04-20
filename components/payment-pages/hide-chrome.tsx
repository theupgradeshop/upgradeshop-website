interface HideChromeProps {
  hideHeader: boolean;
  hideFooter: boolean;
}

export function HideChrome({ hideHeader, hideFooter }: HideChromeProps) {
  const rules = [
    hideHeader ? "#site-header { display: none !important; }" : "",
    hideFooter ? "#site-footer { display: none !important; }" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (!rules) return null;

  return <style>{rules}</style>;
}
