'use client';


import Table from "@/app/(protected)/(routes)/inventory/components/table";
import {useEffect, useState} from "react";

export default function ProductList() {
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(fetchRooms({page: currentPage, limit: ITEMS_PER_PAGE}));
    }, [dispatch, currentPage]);

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
        <Table/>
      </div>
    </div>
  );
}
