const ALLOWED_YOUTUBE_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "youtu.be",
  "www.youtube-nocookie.com",
  "youtube-nocookie.com",
]);

const VIDEO_ID_PATTERN = /^[a-zA-Z0-9_-]{11}$/;

function extractVideoId(url: URL): string | null {
  if (url.hostname === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0];
    return VIDEO_ID_PATTERN.test(id) ? id : null;
  }

  if (url.pathname === "/watch") {
    const id = url.searchParams.get("v") ?? "";
    return VIDEO_ID_PATTERN.test(id) ? id : null;
  }

  const embedMatch = url.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{11})$/);
  if (embedMatch?.[1]) {
    return embedMatch[1];
  }

  return null;
}

/**
 * Returns a strict YouTube embed URL or null if the input is not a valid YouTube link.
 */
export function toYouTubeEmbedUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed || trimmed.length > 500) return null;

  let parsed: URL;
  try {
    parsed = new URL(trimmed);
  } catch {
    return null;
  }

  if (parsed.protocol !== "https:") return null;
  if (!ALLOWED_YOUTUBE_HOSTS.has(parsed.hostname)) return null;

  const videoId = extractVideoId(parsed);
  if (!videoId) return null;

  return `https://www.youtube.com/embed/${videoId}`;
}
