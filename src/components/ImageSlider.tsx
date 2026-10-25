"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { getDict } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";

type Slide = { src: string; alt: string; position?: string };

// Plays continuously, cross-fading from one photo to the next.
export function ImageSlider({ lang, slides, interval = 5000, sizes }: { lang: Locale; slides: Slide[]; interval?: number; sizes: string }) {
  const d = getDict(lang);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setIndex((i) => (i + 1) % slides.length), interval);
    return () => clearTimeout(t);
  }, [index, interval, slides.length]);

  return (
    <div aria-roledescription="carousel" aria-label={d.photos.carousel} className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-brand-dark shadow-xl">
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          <Image
            src={s.src}
            alt={s.alt}
            fill
            sizes={sizes}
            className={`object-cover ${s.position ?? "object-center"}`}
          />
        </div>
      ))}
      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={d.photos.show(i + 1)}
            aria-current={i === index}
            className={`h-2.5 rounded-full shadow transition-all duration-500 ${i === index ? "w-8 bg-accent" : "w-2.5 bg-white/80 hover:bg-white"}`}
          />
        ))}
      </div>
    </div>
  );
}
