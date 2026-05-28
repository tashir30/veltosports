"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  label?: string;
  className?: string;
}

export function QRCodeDisplay({
  value,
  size = 128,
  label,
  className = "",
}: QRCodeDisplayProps) {
  const [dataUrl, setDataUrl] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    QRCode.toDataURL(value, {
      width: size,
      margin: 1,
      errorCorrectionLevel: "M",
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setDataUrl("");
      });

    return () => {
      cancelled = true;
    };
  }, [value, size]);

  if (!dataUrl) {
    return (
      <div
        className={`flex items-center justify-center rounded-lg bg-slate-100 ${className}`}
        style={{ width: size, height: size }}
        aria-hidden="true"
      />
    );
  }

  return (
    <figure className={`flex flex-col items-center gap-2 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={dataUrl}
        alt={label ? `QR code for ${label}` : "QR code"}
        width={size}
        height={size}
        className="rounded-lg border border-slate-200 bg-white p-1"
      />
      {label ? (
        <figcaption className="text-center text-xs text-slate-500">
          {label}
        </figcaption>
      ) : null}
    </figure>
  );
}
