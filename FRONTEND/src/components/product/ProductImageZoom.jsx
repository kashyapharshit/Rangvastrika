import { useState } from "react";

export default function ProductImageZoom({ src, alt }) {
  const [zoom, setZoom] = useState(false);

  return (
    <img
      className={`rounded-2xl border border-amber-900/10 cursor-zoom-in transition-transform duration-300 ${
        zoom ? "zoomed scale-150 cursor-zoom-out" : "scale-100"
      }`}
      src={src || "https://placehold.co/800x600?text=Product"}
      alt={alt}
      onClick={() => setZoom((current) => !current)}
    />
  );
}