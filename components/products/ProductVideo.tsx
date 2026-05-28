interface ProductVideoProps {
  youtubeUrl?: string;
  productName: string;
}

function toEmbedUrl(url: string): string | null {
  const trimmed = url.trim();
  if (!trimmed) return null;

  if (trimmed.includes("youtube.com/embed/")) {
    return trimmed;
  }

  const watchMatch = trimmed.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );
  if (watchMatch?.[1]) {
    return `https://www.youtube.com/embed/${watchMatch[1]}`;
  }

  return null;
}

export function ProductVideo({ youtubeUrl, productName }: ProductVideoProps) {
  const embed = youtubeUrl ? toEmbedUrl(youtubeUrl) : null;
  if (!embed) return null;

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold text-slate-900">Flying Video</h2>
      <div className="mt-4 aspect-video overflow-hidden rounded-2xl bg-slate-900">
        <iframe
          src={embed}
          title={`${productName} flying video`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
