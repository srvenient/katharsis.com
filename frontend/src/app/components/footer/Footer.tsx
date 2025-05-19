import {PackageOpen} from "lucide-react";

export default function Footer() {
  return (
    <div className="flex items-center justify-center h-230 w-full font-special">
      <div>

      </div>
      <footer className="relative flex items-center justify-center h-full w-full overflow-hidden">
        <div className="text-white w-full py-10 px-4 mt-auto">
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-start gap-10 max-w-7xl mx-auto ">
            <div className="text-center md:text-left flex flex-col gap-12">
              <div className="flex flex-row justify-start items-center text-3xl font-bold gap-2">
                <PackageOpen size={42} strokeWidth={2} />
                Katharsis
              </div>
              <p className="text-sm text-gray-400">© 2025 Katharsis. All Rights Reserved.</p>
            </div>
            <div className="flex flex-col items-center md:items-end md:text-right gap-12">
              <div className="flex flex-wrap justify-center md:justify-end gap-6 text-[14px] ">
                <a href="#" className="hover:underline">X</a>
                <a href="#" className="hover:underline">Discord</a>
                <a href="#" className="hover:underline">YouTube</a>
                <a href="#" className="hover:underline">LinkedIn</a>
                <a href="#" className="hover:underline">Facebook</a>
              </div>
              <div className="mt-6 text-sm font-semibold text-gray-500 flex flex-wrap justify-center md:justify-end gap-4">
                <a href="#" className="hover:underline">Privacy Policy</a>
                <a href="#" className="hover:underline">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
        <div
          className="absolute -top-4/12 left-0 w-full h-full bg-[url('/hero-globe.svg')] bg-no-repeat bg-top bg-[length:100%] rotate-180"/>
        <div
          className="absolute top-0 left-0 inset-0 w-full h-full bg-[url('/Orb-Footer.svg')] bg-no-repeat bg-[position:0_100%] bg-[length:100%] "/>
        <div className="absolute inset-0 w-full noise-overlay pointer-events-none opacity-20"/>
      </footer>
    </div>
  )
}