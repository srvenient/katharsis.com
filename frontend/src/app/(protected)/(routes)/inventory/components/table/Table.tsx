// components/MyDataTable.tsx
"use client";

import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import "datatables.net";
import {columns} from "@/app/(protected)/(routes)/inventory/components/table/Table.data";

interface Product {
  id: number;
  name: string;
  description: string;
  sale_price: number;
  current_stock: number;
  minimum_stock: number;
}

interface ApiResponse {
  data: Product[];
}

export default function MyDataTable() {
  const tableRef = useRef<HTMLTableElement>(null);

  useEffect(() => {
    if (!tableRef.current) return;

    const table = $(tableRef.current).DataTable({
      ajax: {
        url: 'http://localhost:8000/api/v1/products',
        dataSrc: (json: ApiResponse) => json.data,
      },
      columns: columns,
      processing: true,
      serverSide: true,
      destroy: true,
      search: true,
    });

    return () => {
      table.destroy();
    };
  }, []);

  return (
    <table ref={tableRef} className="display" style={{ width: '100%' }}>
      <thead>
      <tr>
        <th>ID</th>
        <th>Nombre del producto</th>
        <th>Descripción</th>
        <th>Precio unitario</th>
        <th>Stock actual</th>
        <th>Stock mínimo</th>
      </tr>
      </thead>
      <tbody />
    </table>
  );
}
