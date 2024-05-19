//copilot generated code

import { useState } from 'react';

export default function ImageCarousel({ images }: { images: string[] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((currentImageIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-64 self-center">
      <img src={images[currentImageIndex]} alt="" className="w-full h-64 object-cover" />
      <button
        onClick={prevImage}
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-r-md"
      >
        {"<"}
      </button>
      <button
        onClick={nextImage}
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-l-md"
      >
        {">"}
      </button>
    </div>
  );
}