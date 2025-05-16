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

  const orbRef = React.useRef<HTMLDivElement>(null);

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

    if (orbRef.current) {
      ScrollTrigger.create({
        trigger: orbRef.current,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          gsap.to(orbRef.current, {
            scale: 1 + progress * 3,
            ease: 'power2.out',
          });
        }
      });
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: bgRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
          pinSpacing: true,
        }
      });

      timeline
        .fromTo(section1Ref.current, {opacity: 1}, {opacity: 0, ease: "none", duration: 1})
        .fromTo(section2Ref.current, {opacity: 0}, {opacity: 1, ease: "none", duration: 1});
    });

    return () => {
      ctx.revert();
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return (
    <main className="flex flex-col w-full overflow-hidden text-white">
      <div ref={bgRef} className="relative w-full h-[100vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <div ref={orbRef}
               className="absolute inset-0 w-full h-full bg-[url('/hero-orb.svg')] bg-contain bg-center bg-no-repeat z-0 blur-2xl pointer-events-none"/>
          <div className="absolute inset-0 w-full noise-overlay pointer-events-none opacity-20 z-0"/>

          <section
            ref={section1Ref}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center w-full text-center px-4"
          >
            <h1 className="absolute text-6xl md:text-7xl font-medium leading-18">
              Un Click.<br/>
              Y Respiras.
            </h1>
            <div className="mt-100">
              <Button onClick={() => router.push('/sign-in')}>
                Comenzar ahora
              </Button>
            </div>
          </section>

          <section
            ref={section2Ref}
            className="absolute inset-0 z-10 w-full px-4 py-20 flex items-center justify-center opacity-0"
          >
            <div className="w-11/12 max-w-6xl flex flex-col md:flex-row justify-between items-center gap-10">
              <h2
                className="text-6xl md:text-5xl font-medium text-center text-balance md:text-left leading-tight max-w-md -translate-y-45"
              >
                Katharsis, el aliado inteligente para tu inventario.
              </h2>
              <p
                className="text-xl md:text-3xl leading-10 text-center text-balance md:text-left max-w-lg translate-y-45 translate-x-20"
              >
                La solución ideal para pequeñas/medianas empresas que necesitan gestionar su inventario de forma
                eficiente, reducir costos y mejorar su productividad.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
