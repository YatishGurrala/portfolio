"use client";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const url = typeof window === "undefined" ? "" : window.location.href;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const secondaryStyle = {
    backgroundColor: "var(--button-secondary-bg)",
    color: "var(--button-secondary-fg)",
    borderColor: "var(--button-secondary-border)",
  };

  const copyLink = async () => {
    if (!url) {
      return;
    }

    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors hover:brightness-95 dark:hover:brightness-110"
        style={secondaryStyle}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
      >
        Share on LinkedIn
      </a>
      <a
        className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors hover:brightness-95 dark:hover:brightness-110"
        style={secondaryStyle}
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
      >
        Share on X
      </a>
      <button
        type="button"
        className="inline-flex items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold transition-colors hover:brightness-95 dark:hover:brightness-110"
        style={secondaryStyle}
        onClick={copyLink}
      >
        Copy link
      </button>
    </div>
  );
}
