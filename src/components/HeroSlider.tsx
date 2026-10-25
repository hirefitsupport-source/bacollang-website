"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { getDict } from "@/lib/dictionaries";
import { localize, type Locale } from "@/lib/i18n";
import { ButtonLink } from "./ui";

export type HeroSlide = {
  src: string;
  alt: string;
  heading: string;
  text: string;
  position: string;
  // Show the whole photo on the right over a blurred copy, instead of cropping it to fill.
  contain?: boolean;
};

const INTERVAL = 6500;

export function HeroSlider({ lang, slides }: { lang: Locale; slides: HeroSlide[] }) {
  const d = getDict(lang);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);

  const go = useCallback((n: number) => setIndex((n + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => go(index + 1), INTERVAL);
    return () => clearTimeout(t);
  }, [index, playing, go]);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={d.hero.carousel}
      className="relative isolate h-[540px] overflow-hidden bg-brand-dark md:h-[560px]"
      onFocus={() => setPlaying(false)}
    >
      {slides.map((s, i) => (
        <div
          key={s.src}
          role="group"
          aria-roledescription="slide"
          aria-label={d.hero.slideOf(i + 1, slides.length)}
          aria-hidden={i !== index}
          className={`absolute inset-0 transition-opacity duration-700 ${i === index ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          {s.contain ? (
            <>
              <Image src={s.src} alt="" fill sizes="50vw" className="scale-110 object-cover blur-2xl brightness-75" aria-hidden />
              <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="(min-width:768px) 60vw, 100vw" className="object-cover object-[center_25%] md:object-contain md:object-right" />
            </>
          ) : (
            <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" className={`object-cover ${s.position}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/70 to-brand-dark/20" />
          <div className="relative mx-auto flex h-full max-w-7xl items-center px-4 pb-16 sm:px-6">
            <div className={`max-w-2xl text-white ${i === index ? "hero-animate" : "opacity-0"}`}>
              <p className="mb-4 inline-block rounded bg-accent px-3 py-1 text-xs font-semibold tracking-wider uppercase">
                {d.hero.label}
              </p>
              {i === 0 ? (
                <h1 className="text-4xl font-bold text-white md:text-6xl">{s.heading}</h1>
              ) : (
                <p className="font-display text-4xl font-bold text-white md:text-6xl">{s.heading}</p>
              )}
              {s.text && <p className="mt-5 text-lg text-white/90 md:text-xl">{s.text}</p>}
              <div className="mt-8 flex flex-wrap gap-3">
                <ButtonLink href={localize(lang, "/courses")} tabIndex={i === index ? 0 : -1}>{d.hero.exploreCourses}</ButtonLink>
                <ButtonLink href={localize(lang, "/apply")} variant="ghost" tabIndex={i === index ? 0 : -1}>{d.applyNow}</ButtonLink>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="absolute inset-x-0 bottom-6 z-10 md:bottom-8">
        <div className="mx-auto flex max-w-7xl items-center justify-end gap-3 px-4 sm:px-6">
          <button type="button" onClick={() => go(index - 1)} aria-label={d.hero.prev} className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => setPlaying((p) => !p)} aria-label={playing ? d.hero.pause : d.hero.play} className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30">
            {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </button>
          <button type="button" onClick={() => go(index + 1)} aria-label={d.hero.next} className="grid h-10 w-10 place-items-center rounded-full bg-white/15 text-white hover:bg-white/30">
            <ChevronRight className="h-5 w-5" />
          </button>
          <div className="ml-2 flex gap-2">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => go(i)}
                aria-label={d.hero.goTo(i + 1)}
                aria-current={i === index}
                className={`h-2.5 rounded-full transition-all ${i === index ? "w-8 bg-accent" : "w-2.5 bg-white/60 hover:bg-white"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
