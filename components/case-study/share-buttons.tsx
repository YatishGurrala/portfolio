"use client";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const url = typeof window === "undefined" ? "" : window.location.href;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copyLink = async () => {
    if (!url) {
      return;
    }

    await navigator.clipboard.writeText(url);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <a
        className="button-secondary"
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
      >
        Share on LinkedIn
      </a>
      <a
        className="button-secondary"
        href={`https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noreferrer"
      >
        Share on X
      </a>
      <button type="button" className="button-secondary" onClick={copyLink}>
        Copy link
      </button>
    </div>
  );
}
