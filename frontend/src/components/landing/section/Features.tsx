import Image from "next/image";

export default function Features() {
  return (
    <section className="relative min-h-svh w-full bg-white pt-32 pb-16 mt-55 ">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg
          className="relative block w-full h-[100px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C480,0 960,0 1440,80 L1440,0 L0,0 Z"
            fill="#f0f6fc"
          />
        </svg>
      </div>
      <div className="relative flex flex-col items-center space-y-6 text-center">
        <div className="-mt-50 shadow-xl rounded-xl border border-gray-200 bg-white p-6">
          <Image
            src="/placeholder.svg?height=600&width=800"
            alt="Dashboard de Inventario"
            width={400}
            height={100}
            className="w-200 h-130"
          />
        </div>
        <div className="flex flex-col justify-center space-y-6 mt-10">
          <h1 className="text-4xl leading-tight" style={{fontFamily: "var(--font-shantell-sans)"}}>Características</h1>
          <div className="border-b-2 border-theme-royal-purple w-30 mx-auto -mt-5"/>

        </div>
      </div>
    </section>
  )
}