'use client';

import gsap from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import React, {useEffect} from "react";
import Lenis from 'lenis';
import Button from "@/app/components/ui/button/Button";
import {useRouter} from "next/navigation";
import Header from "@/app/components/header/Header";

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
      const orbMaxScale = 1;


      const orbTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: orbRef.current,
          start: 'top top',
          end: '+=1000',
          scrub: true,
          pin: false,
          pinSpacing: false,
          onLeave: () => {
            const footer = document.querySelector('footer');
            if (footer) {
              lenis.scrollTo(footer, { offset: -50 });
            }
          }
        }
      });

      orbTimeline.to(orbRef.current, {
        scale: 1 + orbMaxScale * 2,
        ease: 'power2.out',
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
    <>
      <Header/>
      <main className="flex flex-col w-full overflow-hidden text-white">
        <div ref={bgRef} className="relative w-full h-[100vh]">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            <div
              className="absolute inset-0 w-full h-full bg-[url('/hero-globe.svg')] bg-cover bg-no-repeat opacity-25 z-0 pointer-events-none"
            />
            <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <div
                ref={orbRef}
                className="absolute inset-0 w-full h-full bg-[url('/hero-orb.svg')] bg-contain bg-center bg-no-repeat blur-2xl will-change-transform"
              />
              <div className="absolute inset-0 w-full h-full noise-overlay opacity-20"/>
            </div>


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
                  <span className="text-base">Iniciar sesión</span>
                </Button>
              </div>
              <p
                className="absolute text-neutral-400 text-xs md:text-base tracking-wide text-center text-balance leading-5 max-w-lg translate-y-70">
                Katharsis convierte la gestión de inventarios en una tarea sencilla y rápida. Con Katharsis, los
                pequeños
                negocios optimizan su stock, reducen costos y mejoran la productividad sin complicaciones.
              </p>
            </section>

            <section
              ref={section2Ref}
              className="absolute inset-0 z-10 w-full px-4 py-20 flex items-center justify-center opacity-0"
            >
              <div
                className="w-11/12 max-w-3xl md:max-w-6xl flex flex-col md:flex-row justify-between items-center gap-10"
              >
                <h2
                  className="text-2xl md:text-5xl font-medium text-balance md:text-left leading-tight max-w-md md:-translate-y-45"
                >
                  Katharsis, el aliado inteligente para tu inventario.
                </h2>
                <p
                  className="text-xl md:text-3xl leading-6.5 md:leading-10 text-right text-balance md:text-left max-w-lg translate-y-25 md:translate-y-45 md:translate-x-20"
                >
                  La solución ideal para pequeñas/medianas empresas que necesitan gestionar su inventario de forma
                  eficiente, reducir costos y mejorar su productividad.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
