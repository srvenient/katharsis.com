"use client";

import {categories, navItems} from "@/app/(protected)/(routes)/dashboard/components/navigation/Sidebar.data";
import React, {useState} from "react";
import {
  ChevronDown,
  ChevronUp,
  PackageOpen
} from "lucide-react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {Plus_Jakarta_Sans} from "next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-jakarta",
});

export default function Sidebar() {
  const pathname = usePathname();

  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (name: string) => {
    setOpenItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(name)) {
        newSet.delete(name);
      } else {
        newSet.add(name);
      }
      return newSet;
    });
  };

  const isOpen = (name: string) => openItems.has(name);

  return (
    <div className={`h-screen py-5 pl-4 box-border z-30 ${jakarta.className}`}>
      <aside
        className="flex flex-col justify-between w-62 h-full
          rounded-2xl bg-[linear-gradient(to_bottom,rgba(6,11,40,0.94)_19.41%,rgba(10,14,35,0.84)_76.65%)]
          text-white z-30"
      >
        <div className="overflow-y-auto max-w-screen px-2">
          <div className="flex justify-center items-center gap-1.5 px-4 py-4 mt-2">
            <PackageOpen size={26} strokeWidth={2}/>
            <span className="text-xl font-special font-bold tracking-widest">Katharsis</span>
          </div>
          <div
            className="w-4/5 h-0.5 mx-auto bg-gradient-to-r from-transparent via-white/40 to-transparent"
          >
          </div>
          <div className="mt-2 p-2 md:p-6">
            <div className="flex flex-col -gap-2">
              {navItems.map(item => {
                const hasSubItems = !!item.subItems?.length

                return (
                  <div key={item.name} className="flex flex-col gap-4">
                    <Link
                      href={item?.path || " "}
                      onClick={() => {
                        if (hasSubItems) {
                          toggleItem(item.name)
                        }
                      }}
                      className="flex items-center justify-between py-0.5 text-left rounded cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex items-center justify-center rounded-xl p-2 ${pathname === item.path ? "bg-blue-600" : " bg-neutral-700/35"}`}
                        >
                          {
                            React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                              className: `w-4 h-4 ${pathname === item.path ? "fill-white" : "fill-blue-600"}`,
                            })
                          }
                        </div>
                        <span className="text-sm text-white">{item.name}</span>
                      </div>
                      {hasSubItems &&
                        (isOpen(item.name) ? (
                          <ChevronUp className="w-4 h-4 text-gray-400"/>
                        ) : (
                          <ChevronDown className="w-4 h-4 text-gray-400"/>
                        ))}
                    </Link>

                    <div
                      className={`overflow-hidden transition-all duration-300 ${
                        isOpen(item.name) ? "max-h-[500px] -mt-2 mb-4" : "max-h-0"
                      }`}
                    >
                      {item.subItems?.map(sub => {
                        const hasSubSub = !!sub.subItems?.length;

                        return (
                          <div key={sub.name}>
                            <Link
                              key={sub.name}
                              href={sub.path}
                              onClick={() => hasSubSub && toggleItem(sub.name)}
                              className={`flex justify-between pl-3 py-2 text-sm text-white`}
                            >
                              <div className={`flex items-center ${pathname === sub.path ? "gap-6.5" : "gap-7"}`}>
                                <div
                                  className={`bg-blue-600 rounded-full ${pathname === sub.path ? "w-2 h-2" : "w-1.5 h-1.5"}`}
                                />
                                {sub.name}
                              </div>
                              {hasSubSub && (isOpen(sub.name) ?
                                <ChevronUp className="w-4 h-4 text-gray-400"/> : <ChevronDown className="w-4 h-4 text-gray-400"/>)
                              }
                            </Link>

                            <div className={`flex flex-col ml-11.5 gap-5 transition-all overflow-hidden 
                              ${isOpen(sub.name) ? 'max-h-[300px] py-2' : 'max-h-0'}`}>
                                {hasSubSub && sub.subItems!.map(subSub => (
                                  <Link
                                    key={subSub.name}
                                    href={subSub.path}
                                    className={`text-sm text-white ${pathname === subSub.path ? "font-bold" : ""}`}
                                  >
                                    {subSub.name}
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
              {categories.map(section => (
                <div key={section.name}>
                  <h3 className="text-xs font-semibold text-gray-400 mt-4 mb-4">{section.name}</h3>
                  {section.items.map(item => {
                    const hasSubItems = !!item.subItems?.length

                    return (
                      <div key={item.name} className="flex flex-col gap-4">
                        <button
                          onClick={() => hasSubItems && toggleItem(item.name)}
                          className="flex items-center justify-between py-0.5 text-left rounded cursor-pointer"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`flex items-center justify-center rounded-xl p-2 ${pathname === item.path ? "bg-blue-600" : " bg-neutral-700/35"}`}
                            >
                              {
                                React.cloneElement(item.icon as React.ReactElement<{ className?: string }>, {
                                  className: `w-4 h-4 ${pathname === item.path ? "fill-white" : "fill-blue-600"}`,
                                })
                              }
                            </div>
                            <span className="text-sm text-white">{item.name}</span>
                          </div>
                          {hasSubItems &&
                            (isOpen(item.name) ? (
                              <ChevronUp className="w-4 h-4 text-gray-400"/>
                            ) : (
                              <ChevronDown className="w-4 h-4 text-gray-400"/>
                            ))}
                        </button>

                        <div
                          className={`overflow-hidden transition-all duration-300 ${
                            isOpen(item.name) ? "max-h-[500px] -mt-2 mb-4" : "max-h-0"
                          }`}
                        >
                          {hasSubItems &&
                            item.subItems!.map(sub => (
                              <Link
                                key={sub.name}
                                href={sub.path}
                                className={`flex items-center pl-3 pr-4 py-2 text-sm text-white ${pathname === sub.path ? "gap-6.5" : "gap-7"}`}
                              >
                                <div
                                  className={`bg-blue-600 rounded-full ${pathname === sub.path ? "w-2 h-2" : "w-1.5 h-1.5"}`}/>
                                {sub.name}
                              </Link>
                            ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </div>
  )
}