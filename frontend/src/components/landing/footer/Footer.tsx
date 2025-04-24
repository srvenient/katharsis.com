export default function Footer() {
  const word = "Katharsis";
  const repeatCount = 20;
  const words = Array.from({length: repeatCount}).map(() => word);

  return (
    <footer className="bg-theme-petrol-blue text-theme-white font-special">
      <div className="overflow-hidden py-4">
        <div className="flex w-max animate-marquee whitespace-nowrap text-[200px] font-bold">
          {
            words.map((word, index) => (
              <span key={index} className="mx-8">{word}</span>
            ))
          }
        </div>
      </div>
      <div>
        <div className="max-w-(--breakpoint-xl) mx-auto px-5 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-center md:text-left">
              <p className="text-sm text-gray-400">
                © 2025 Katharsis. Todos los derechos reservados.
              </p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-gray-900">Política de privacidad</a>
              <a href="#" className="text-gray-400 hover:text-gray-900">Términos de servicio</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}