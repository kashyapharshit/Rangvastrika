import { useState } from 'react';

export default function ProductImageZoom({ src, alt }) {
  const [zoom, setZoom] = useState(false);

  return (
    <img
      className={zoom ? 'zoomed' : ''}
      src={src || 'https://placehold.co/800x600?text=Product'}
      alt={alt}
      onClick={() => setZoom((current) => !current)}
    />
  );
}
