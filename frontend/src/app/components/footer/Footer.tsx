import {PackageOpen} from "lucide-react";

export default function Footer() {
  const word = "Katharsis";
  const repeatCount = 20;
  const words = Array.from({length: repeatCount}).map(() => word);

  return (
    <div className="flex items-center justify-center h-[700px] md:h-[920px] lg:h-[820px] w-full font-special">
      <footer className="relative flex items-center justify-center h-full w-full overflow-hidden">
        <div
          className="absolute top-0 left-0 w-full h-full bg-[url('/hero-globe.svg')] bg-no-repeat bg-top bg-size-[100%] rotate-180 opacity-30 z-0 pointer-events-none"
        />
        <div
          className="absolute top-0 left-0 inset-0 w-full h-full bg-[url('/Orb-Footer.svg')] bg-no-repeat
          bg-position-[center_top_-18rem] sm:bg-position-[center_top_-18rem] lg:bg-position-[center_top_-20rem] 2xl:bg-position-[center_top_-72rem]
          bg-size-[1000px] sm:bg-size-[100%] md:bg-size-[100%] lg:bg-size-[110%] 2xl:bg-size-[103%]
          z-0 pointer-events-none"
        />
        <div className="absolute inset-0 w-full noise-overlay pointer-events-none opacity-10 "/>
        <div className="text-white w-full py-10 px-4 mt-auto">
          <div
            className="absolute top-4/12 left-0 z-20 flex animate-marquee whitespace-nowrap text-[100px] font-bold pointer-events-none">
            {
              words.map((word, i) => (
                <span key={i} className="mx-8">{word}</span>
              ))
            }
          </div>
          <div
            className="relative z-30 flex flex-col md:flex-row justify-between items-start md:items-start gap-10 max-w-7xl mx-auto"
          >
            <div className="text-center md:text-left flex flex-col gap-12">
              <div className="flex flex-row justify-start items-center text-3xl font-bold gap-2">
                <PackageOpen size={42} strokeWidth={2}/>
                Katharsis
              </div>
              <p className="text-sm text-gray-400">© 2025 Katharsis. All Rights Reserved.</p>
            </div>
            <div className="flex flex-col items-center md:items-end md:text-right gap-12">
              <div className="flex flex-wrap justify-center md:justify-end gap-6 text-[14px]">
                <a href="#" className="hover:underline">X</a>
                <a href="#" className="hover:underline">Discord</a>
                <a href="#" className="hover:underline">YouTube</a>
                <a href="#" className="hover:underline">LinkedIn</a>
                <a href="#" className="hover:underline">Facebook</a>
              </div>
              <div
                className="mt-6 text-sm font-semibold text-gray-500 flex flex-wrap justify-center md:justify-end gap-4"
              >
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}