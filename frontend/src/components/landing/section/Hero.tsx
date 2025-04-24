import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex w-full mt-40">
      <div className="relative flex flex-col items-center max-w-(--breakpoint-xl) mx-auto px-6 py-16 lg:py-0">
        <h1 className="text-6xl font-medium text-center text-theme-midnight-black"
            style={{fontFamily: "var(--font-shantell-sans)"}}>
          ¡Por fin, un sistema de inventario que crece contigo!
        </h1>
        <p className="font-light text-2xl text-center text-theme-light-blue mt-10 max-w-4xl">
          En un mundo donde la eficiencia y organización son clave para el éxito, te presentamos un Sistema de Gestión
          de Inventario diseñado para optimizar el control de inventario, reducir costos y aumentar la productividad.
        </p>
        <div className="flex flex-row justify-center items-center mt-10 -gap-2 font-special font-semibold">
          <Link
            href="#"
            className="text-gray-200 border border-theme-midnight-black bg-theme-petrol-blue transition duration-600 hover:scale-105 px-4 py-3"
          >
            Empieza ahora. ¡Es genial!
          </Link>
          <Link href="#"
                className="ml-4 text-theme-midnight-black border border-theme-midnight-black bg-gray-100 transition duration-300 hover:scale-105 px-4 py-3">
            Demostración
          </Link>
        </div>
      </div>
    </section>
  )
}