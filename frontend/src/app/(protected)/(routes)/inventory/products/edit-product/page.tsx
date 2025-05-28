export default function EditProduct() {
  return (
      <div className="flex flex-col gap-10 px-6 py-10 ml-[240px] w-full max-w-5xl mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold tracking-wide text-white">
              Modifica un nuevo producto
            </h1>
            <p className="text-sm text-neutral-400">
              Cambia los detalles clave y actualiza la información de tu producto en solo unos pasos.
            </p>
          </div>
          <button className="bg-blue-600 py-2.5 px-6 rounded-xl text-sm text-white shadow-md hover:bg-blue-500 transition-all">
            Guardar
          </button>
        </div>

        <form className="bg-[linear-gradient(to_right,rgba(6,11,40,0.94)_19.41%,rgba(10,14,35,0.49)_76.65%)]
                      rounded-3xl p-8 text-white shadow-lg">
          <h1 className="text-xl font-bold tracking-wide mb-6">Información del producto</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold mb-2">Nombre</label>
              <input
                  type="text"
                  className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-2">Peso</label>
              <input
                  type="number"
                  className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-2">Colección</label>
              <input
                  type="text"
                  className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-2">Precio</label>
              <input
                  type="text"
                  className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-3 py-2 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold mb-2">Cantidad</label>
              <input
                  type="number"
                  className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-3 py-2 outline-none"
              />
            </div>

            <div className="md:col-span-2 flex flex-col md:flex-row gap-6">
              <div className="flex-1">
                <label className="block text-xs font-bold mb-2">
                  Descripción <span className="text-neutral-400">(opcional)</span>
                </label>
                <textarea
                    className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-3 py-2 outline-none resize-none h-24"
                    placeholder="Escribe una breve descripción del producto..."
                />
              </div>

              <div className="flex-1 flex flex-col gap-6">
                <div>
                  <label className="block text-xs font-bold mb-2">Categoría</label>
                  <select className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-3 py-2 text-sm text-neutral-400">
                    <option>Ropa</option>
                    <option>Accesorios</option>
                    <option>Muebles</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-2">Color</label>
                  <select className="w-full bg-[#0f1535] border border-white/30 rounded-2xl px-3 py-2 text-sm text-neutral-400">
                    <option>Negro</option>
                    <option>Blanco</option>
                    <option>Gris</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
  );
}
