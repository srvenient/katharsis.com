// components/MyDataTable.tsx
"use client";


import {useEffect, useState} from "react";
import {Product} from "@/common/types/product";
import {fastApiHttpClient} from "@/common/http-client/fastapi.http-client";

export default function Table() {
  const [data, setData] = useState<Product[]>([]);

  useEffect(() => {
    fastApiHttpClient.getAllProducts({skip: 0, limit: 10})
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <table className="min-w-full text-sm text-left text-white border border-white/10 rounded-xl overflow-hidden">
      <thead className="bg-[rgba(6,11,40,0.94)] text-xs uppercase tracking-wider">
      <tr>
        <th className="px-6 py-3">ID</th>
        <th className="px-6 py-3">Nombre del producto</th>
        <th className="px-6 py-3">Descripción del producto</th>
        <th className="px-6 py-3">Categoría</th>
        <th className="px-6 py-3">Precio de venta</th>
        <th className="px-6 py-3">Stock actual</th>
        <th className="px-6 py-3">Stock mínimo permitido</th>
      </tr>
      </thead>
      <tbody className="bg-[#0f1535] divide-y divide-white/10">
      {data.map((product: Product) => (
        <tr key={product.id}>
          <td className="px-6 py-4">{product.id}</td>
          <td className="px-6 py-4">{product.name}</td>
          <td className="px-6 py-4">{product.description}</td>
          <td className="px-6 py-4">{product.category_id}</td>
          <td className="px-6 py-4">${product.sale_price}</td>
          <td className="px-6 py-4">{product.current_stock}</td>
          <td className="px-6 py-4">{product.minimum_stock}</td>
        </tr>
      ))}
      </tbody>
    </table>
  );
}
