export default function ProductList() {
    return (
        <div className="relative flex flex-col gap-10 ml-10 mt-30 z-30 w-full">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold tracking-wide">Listado de Productos</h1>
                    <p className="text-sm text-neutral-400">
                        Consulta los productos registrados y su información clave en un solo lugar.
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-white border border-white/10 rounded-xl overflow-hidden">
                    <thead className="bg-[rgba(6,11,40,0.94)] text-xs uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Nombre del producto</th>
                        <th className="px-6 py-3">Descripción del producto</th>
                        <th className="px-6 py-3">Categoría</th>
                        <th className="px-6 py-3">Precio unitario</th>
                        <th className="px-6 py-3">Stock actual</th>
                        <th className="px-6 py-3">Stock mínimo permitido</th>
                    </tr>
                    </thead>
                    <tbody className="bg-[#0f1535] divide-y divide-white/10">
                    {/* es un ejemplo, no sé si quedaia asi exactamente para conectar la bd */}
                    <tr>
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">Celuar A312 234</td>
                        <td className="px-6 py-4">Referencia completa Samsng S24 aqwe124erwerrwewerewrwer</td>
                        <td className="px-6 py-4">Técnología</td>
                        <td className="px-6 py-4">$2.500.000</td>
                        <td className="px-6 py-4">10</td>
                        <td className="px-6 py-4">3</td>
                    </tr>
                    </tbody>

                </table>
            </div>
        </div>
    );
}
