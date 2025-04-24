import Hero from "@/components/landing/section/Hero";
import Features from "@/components/landing/section/Features";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main>
        <Hero/>
        <Features/>
      </main>
    </div>
  );
}
