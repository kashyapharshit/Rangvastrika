import { useState } from "react";

export default function ProductImageZoom({ src, images = [], alt }) {
  const imgList = (images && images.length > 0) ? images : (src ? [src] : []);
  const [selected, setSelected] = useState(0);
  const [zoom, setZoom] = useState(false);

  const mainSrc = imgList[selected] || "https://placehold.co/800x600?text=Product";

  return (
    <div className="product-image-zoom flex flex-col items-center md:items-start gap-4">
      <img
        className={`w-full rounded-2xl border border-amber-900/10 cursor-zoom-in transition-transform duration-300 ${zoom ? "zoomed scale-150 cursor-zoom-out" : "scale-100"}`}
        src={mainSrc}
        alt={alt}
        onClick={() => setZoom((current) => !current)}
        style={{ maxWidth: "100%", objectFit: "cover" }}
      />

      {imgList.length > 1 && (
        <div className="w-full flex gap-2 overflow-x-auto pb-1">
          {imgList.map((s, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => { setSelected(idx); setZoom(false); }}
              className={`shrink-0 rounded overflow-hidden border touch-target ${selected === idx ? "border-amber-700" : "border-amber-900/10"}`}
            >
              <img src={s} alt={`thumb-${idx}`} className="w-20 h-20 object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
