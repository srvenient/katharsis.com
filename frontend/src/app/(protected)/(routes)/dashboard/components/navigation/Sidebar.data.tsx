import {
  CalendarDaysIcon,
  HomeIcon,
  UserCircleIcon,
  ArchiveBoxIcon,
  UsersIcon,
  Cog6ToothIcon,
  RectangleStackIcon,
  CubeIcon,
  ArrowRightOnRectangleIcon,
  AdjustmentsHorizontalIcon
} from "@heroicons/react/24/solid";
import React from "react";

type SubNavItem = {
  name: string;
  path: string;
  pro?: boolean;
  new?: boolean;
};

type NavItem = {
  name: string;
  icon: React.ReactElement;
  path?: string;
  subItems?: SubNavItem[];
};

export const navItems: NavItem[] = [
  {
    name: "Dashboard",
    icon: <HomeIcon/>,
    path: "/dashboard"
  },
  {
    name: "Inventario",
    icon: <CubeIcon/>,
    subItems: [
      {name: "Productos", path: "/inventory/products"},
      {name: "Stock", path: "/inventory/stock"},
      {name: "Movimientos", path: "/inventory/movements"}
    ]
  },
  {
    name: "Relaciones",
    icon: <UsersIcon/>,
    subItems: [
      {name: "Proveedores", path: "/relations/providers"},
      {name: "Clientes", path: "/relations/clients"}
    ]
  },
  {
    name: "Calendario",
    icon: <CalendarDaysIcon/>,
    path: "/calendar"
  }
];

export const accountItems: NavItem[] = [
  {
    name: "Cerrar sesión",
    icon: <ArrowRightOnRectangleIcon/>,
    path: "/logout"
  }
];

type Category = {
  name: string;
  items: NavItem[];
}

export const categories: Category[] = [
  {
    name: "CUENTA",
    items: accountItems
  }
];