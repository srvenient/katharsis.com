export default function EditProduct() {
  return (
    <div className="relative flex flex-col gap-10 ml-10 mt-30 z-30 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-wide">Modifica un nuevo producto</h1>
          <p className="text-sm text-neutral-400">
            Cambia los detalles clave y actualiza la información de tu producto en solo unos pasos.
          </p>
        </div>
        <button
          className="bg-blue-600 py-2.5 px-4.5 rounded-xl text-sm cursor-pointer"
        >
          Guardar
        </button>
      </div>
      <form className="grid grid-cols-7 grid-rows-7 gap-6">
        <div className="col-span-3 row-span-4">
          1
        </div>
        <div className="col-span-3 row-span-3 col-start-1 row-start-5">
          2
        </div>
        <div
          className="flex flex-col col-span-4 row-span-3 col-start-4 row-start-1
           bg-[linear-gradient(to_right,rgba(6,11,40,0.94)_19.41%,rgba(10,14,35,0.49)_76.65%)]
           h-[425px] rounded-3xl p-6 text-white
          "
        >
          <h1 className="text-xl font-bold tracking-wide">
            Información del producto
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 rounded-xl text-white max-w-4xl mt-4">
            <div>
              <label className="block text-xs font-bold mb-2">Nombre</label>
              <input
                type="text"
                className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-2">Peso</label>
              <input
                type="number"
                className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 outline-none"
              />
            </div>

            <div className="flex flex-row gap-6">
              <div className="w-1/2">
                <label className="block text-xs font-bold mb-2">Colección</label>
                <input
                  type="text"
                  className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 outline-none"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-xs font-bold mb-2">Precio</label>
                <input
                  type="text"
                  className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 outline-none"
                />
              </div>
            </div>

            <div className="w-1/2">
              <label className="block text-xs font-bold mb-2">Cantidad</label>
              <input
                type="number"
                className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5  py-2 outline-none"
              />
            </div>

            <div className="flex flex-row gap-6 h-full md:col-span-2">
              <div className="w-1/2 h-full flex flex-col">
                <label className="block text-xs font-bold mb-2">
                  Descripción <span className="text-neutral-400">(optional)</span>
                </label>
                <textarea
                  className="flex-1 bg-[#0f1535] border border-white/30 rounded-2xl px-2.5  py-2 outline-none resize-none"
                  placeholder="Escribe una breve descripción del producto..."
                />
              </div>

              <div className="w-1/2 h-full flex flex-col justify-between gap-7">
                <div>
                  <label className="block text-xs font-bold mb-2">Categoría</label>
                  <select className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 text-sm text-neutral-400">
                    <option>Ropa</option>
                    <option>Accesorios</option>
                    <option>Muebles</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-2">Color</label>
                  <select className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-2.5 py-2 text-sm text-neutral-400">
                    <option>Negro</option>
                    <option>Blanco</option>
                    <option>Gris</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-4 row-span-2 col-start-4 row-start-4">5</div>
        <div className="col-span-4 row-span-2 col-start-4 row-start-6">6</div>
      </form>
    </div>
  );
}