'use client';

import dynamic from 'next/dynamic';
import {useEffect, useState} from "react";
import {Product} from "@/common/types/product";
import {fastApiHttpClient} from "@/common/http-client/fastapi.http-client";

const MyDataTable = dynamic(() => import('../components/table/Table'), {ssr: false});

export default function ProductList() {
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
      </div>
    </div>
  );
}
