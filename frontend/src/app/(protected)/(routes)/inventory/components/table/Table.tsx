// components/MyDataTable.tsx
"use client";

import { useEffect, useState } from "react";
import { Product } from "@/common/types/product";
import { fastApiHttpClient } from "@/common/http-client/fastapi.http-client";
import { Trash2 } from "lucide-react";

export default function MyDataTable() {
  const [data, setData] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const itemsPerPage =100;
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  useEffect(() => {
    fastApiHttpClient.getAllProducts({skip: currentPage, limit: ITEMS_PER_PAGE})
        .then((response) => {
            setData(response.data);
            setTotalPages(Math.ceil(response.total / ITEMS_PER_PAGE))
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
  }, [currentPage]);

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
      <div className="w-full overflow-x-auto p-4">
        <div className="min-w-max rounded-xl border border-white/10 shadow-lg">
          <table className="min-w-full text-sm text-white rounded-xl overflow-hidden">
            <thead className="bg-[rgba(6,11,40,0.94)] text-xs uppercase tracking-wider">
            <tr>
              <th className="px-4 py-3 text-center">ID</th>
              <th className="px-4 py-3 text-center">Nombre</th>
              <th className="px-4 py-3 text-center">Descripción</th>
              <th className="px-4 py-3 text-center">Categoría</th>
              <th className="px-4 py-3 text-center">Precio</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-center">Stock Mín.</th>
              <th className="px-4 py-3 text-center">Acciones</th>
            </tr>
            </thead>
            <tbody className="bg-[#0f1535] divide-y divide-white/10">
            {data.map((product: Product) => (
                <tr
                    key={product.id}
                    className="hover:bg-[#1a1f3d]/50 transition-colors"
                >
                  <td className="px-4 py-3 text-center">{product.id}</td>
                  <td className="px-4 py-3 text-center">{product.name}</td>
                  <td className="px-4 py-3 text-center">{product.description}</td>
                  <td className="px-4 py-3 text-center">{product.category_id}</td>
                  <td className="px-4 py-3 text-center">
                    {formatCurrency(product.sale_price)}
                  </td>
                  <td className="px-4 py-3 text-center">{product.current_stock}</td>
                  <td className="px-4 py-3 text-center">{product.minimum_stock}</td>
                  <td className="px-4 py-3 text-center flex justify-center">
                    <button
                        // onClick={() => handleDelete(product.id)}
                        className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-500 hover:bg-red-600 text-white font-medium transition-colors cursor-pointer"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>

        {/* Controles de paginación */}
        <div className="flex justify-center mt-4 space-x-2">
          <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1 text-white">
          Página {currentPage} de {totalPages}
        </span>
          <button
              onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      </div>
  );
}
