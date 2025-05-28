export default function InventoryMovementList() {
    return (
        <div className="relative flex flex-col gap-10 ml-10 mt-30 z-30 w-full">
            <div className="flex items-center justify-between w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold tracking-wide">Movimientos de Inventario</h1>
                    <p className="text-sm text-neutral-400">
                        Consulta los registros de entrada y salida de productos.
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full text-sm text-left text-white border border-white/10 rounded-xl overflow-hidden">
                    <thead className="bg-[rgba(6,11,40,0.94)] text-xs uppercase tracking-wider">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Producto</th>
                        <th className="px-6 py-3">Tipo de movimiento</th>
                        <th className="px-6 py-3">Cantidad</th>
                        <th className="px-6 py-3">Fecha</th>
                        <th className="px-6 py-3">Usuario</th>
                        <th className="px-6 py-3">Proveedor</th>
                        <th className="px-6 py-3">Sucursal</th>
                        <th className="px-6 py-3">Observaciones</th>
                    </tr>
                    </thead>
                    <tbody className="bg-[#0f1535] divide-y divide-white/10">
                    {/* Ejemplo de fila */}
                    <tr>
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">iPhone 14 Pro</td>
                        <td className="px-6 py-4">Entrada</td>
                        <td className="px-6 py-4">20</td>
                        <td className="px-6 py-4">2025-05-27</td>
                        <td className="px-6 py-4">jdoe</td>
                        <td className="px-6 py-4">Apple Inc.</td>
                        <td className="px-6 py-4">Sucursal Bogotá</td>
                        <td className="px-6 py-4">Reposición por baja de stock</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
