'use client';

import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import React, {useEffect} from "react";
import Lenis from 'lenis';
import Button from "@/app/components/ui/button/Button";
import {useRouter} from "next/navigation";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const router = useRouter();

  const bgRef = React.useRef<HTMLDivElement>(null);
  const section1Ref = React.useRef<HTMLDivElement>(null);
  const section2Ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.5 * t),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Zoom dinámico del background
    if (bgRef.current) {
      ScrollTrigger.create({
        trigger: bgRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(bgRef.current, {
            scale: 1 + (progress * 3),
            ease: 'power2.out',
          });
        }
      });
    }

    // Fade-out de la sección 1
    if (section1Ref.current && section2Ref.current) {
      gsap.fromTo(
        section1Ref.current,
        {
          opacity: 1
        },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top bottom',
            end: 'top center',
            scrub: true,
            pin: true,
          },
        }
      );
    }

    // Fade-in básico de section2 (una vez aparece en viewport)
    gsap.fromTo(
      section2Ref.current,
      {opacity: 0},
      {
        opacity: 1,
        scrollTrigger: {
          trigger: section2Ref.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
        duration: 1,
        ease: 'power2.out'
      }
    );


    return () => {
      ScrollTrigger.killAll();
      lenis.destroy();
    };
  }, []);

  return (
    <main className="flex flex-col w-full overflow-hidden bg-black text-white">
      <div className="relative w-full isolate">
        <div
          ref={bgRef}
          className="absolute inset-0 w-full h-dvh bg-[url('/hero-orb.svg')] bg-contain bg-center bg-no-repeat z-0 blur-2xl pointer-events-none"
        />
        <div className="absolute inset-0 w-full noise-overlay pointer-events-none opacity-20 z-0" />

        {/* Sección 1 */}
        <section
          ref={section1Ref}
          className="relative z-10 flex flex-col items-center justify-center h-screen w-full text-center px-4"
        >
          <h1 className="text-6xl md:text-7xl font-medium leading-tight">
            Un Click.<br />
            Y Respiras.
          </h1>
          <div className="mt-10">
            <Button onClick={() => router.push('/sign-in')}>Comenzar ahora</Button>
          </div>
        </section>

        {/* Sección 2 */}
        <section
          ref={section2Ref}
          className="relative z-10 w-full min-h-screen px-4 py-20 flex items-center justify-center"
        >
          <div className="w-11/12 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-10">
            <div className="text-4xl md:text-5xl font-medium text-center md:text-left leading-tight">
              Eco is the <br />
              stablelayer.
            </div>
            <div className="text-base md:text-lg leading-relaxed text-center md:text-left max-w-md">
              The Eco Network<sup>™</sup> is for apps that <br />
              use stablecoins or need stablecoin <br />
              liquidity...
            </div>
          </div>
        </section>
      </div>

      {/* Otras secciones SIN fondo */}
      <section className="w-full min-h-screen px-4 py-20 bg-neutral-50">
        <h2 className="text-3xl font-semibold text-center">Otra sección</h2>
        <p className="text-center mt-4 max-w-xl mx-auto">
          Aquí no hay fondo compartido.
        </p>
      </section>

    </main>
  );
}
