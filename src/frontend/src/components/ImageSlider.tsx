import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

interface Slide {
  id: string;
  imageUrl: string;
  title: string;
  subtitle: string;
  isActive: boolean;
}

const DEFAULT_SLIDES: Slide[] = [
  {
    id: "1",
    imageUrl: "/assets/generated/hero-women-empowerment.dim_1200x500.jpg",
    title: "Empowering Women Through Self-Employment",
    subtitle: "Anshika Udhyog Group — Building a Stronger India",
    isActive: true,
  },
  {
    id: "2",
    imageUrl: "/assets/generated/hero-training.dim_1200x500.jpg",
    title: "Skill Development & Training Programs",
    subtitle: "Agarbatti, Candle, Soap, Tailoring, Computer & More",
    isActive: true,
  },
  {
    id: "3",
    imageUrl: "/assets/generated/hero-products.dim_1200x500.jpg",
    title: "Handmade Products — Quality You Can Trust",
    subtitle: "From Our Centers to Your Doorstep",
    isActive: true,
  },
];

interface ImageSliderProps {
  slides?: Slide[];
}

export default function ImageSlider({ slides: propSlides }: ImageSliderProps) {
  const slides = (propSlides || DEFAULT_SLIDES).filter((s) => s.isActive);
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(next, 4000);
    return () => clearInterval(timer);
  }, [next, slides.length]);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative w-full h-64 sm:h-80 md:h-96 overflow-hidden bg-green-900"
      data-ocid="slider.section"
    >
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            idx === current ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h2 className="font-display font-bold text-xl sm:text-2xl md:text-3xl drop-shadow">
              {slide.title}
            </h2>
            <p className="text-sm sm:text-base text-white/90 mt-1 drop-shadow">
              {slide.subtitle}
            </p>
          </div>
        </div>
      ))}

      {slides.length > 1 && (
        <>
          <button
            onClick={() =>
              setCurrent((current - 1 + slides.length) % slides.length)
            }
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white rounded-full p-2"
          >
            <ChevronRight size={20} />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrent(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === current ? "bg-white w-4" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
