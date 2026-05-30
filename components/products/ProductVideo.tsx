import { toYouTubeEmbedUrl } from "@/utils/youtube";

interface ProductVideoProps {
  youtubeUrl?: string;
  productName: string;
}

export function ProductVideo({ youtubeUrl, productName }: ProductVideoProps) {
  const embed = youtubeUrl ? toYouTubeEmbedUrl(youtubeUrl) : null;
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
          referrerPolicy="strict-origin-when-cross-origin"
          className="h-full w-full"
        />
      </div>
    </section>
  );
}
