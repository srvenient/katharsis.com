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

    if (section1Ref.current && section2Ref.current) {
      gsap.fromTo(
        section1Ref.current,
        { opacity: 1 },
        {
          opacity: 0,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        }
      );


      gsap.fromTo(
        section2Ref.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: section2Ref.current,
            start: 'top bottom',
            end: 'top top',
            scrub: true,
          },
        }
      );
    }
    return () => {
      ScrollTrigger.killAll();
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative flex items-center flex-col w-full overflow-hidden">
      <div
        ref={bgRef}
        className="fixed inset-0 h-full w-full bg-[url('/hero-orb.svg')] bg-contain bg-center bg-no-repeat z-0 blur-2xl"
      />
      <div
        className="fixed inset-0 w-full noise-overlay pointer-events-none opacity-20"
      />
      <section ref={section1Ref} className="fixed w-full h-screen z-10">
        <div className="flex flex-col items-center justify-center h-full space-y-10">
          <h1 className="text-7xl font-medium text-white text-center">
            Un Click.<br/>
            Y Respiras.
          </h1>
          <Button onClick={() => router.push('/sign-in')}>
            Comenzar ahora
          </Button>
        </div>
      </section>
      <section ref={section2Ref} className="relative w-full h-screen z-20">

      </section>
    </main>
  );
}