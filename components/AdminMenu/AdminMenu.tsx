"use client";

import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";


const tabs = [
  { name: "Overview", path: "/admin/overview" },
  { name: "Products", path: "/admin/products" },
  { name: "Orders", path: "/admin/orders" },
  { name: "Users", path: "/admin/users" },
];

export default function    AdminMenu() {
  const router = useRouter();
  const pathname = usePathname(); // ตรวจสอบ path ปัจจุบัน

  return (
    <nav className="flex space-x-2 p-4  bg-white justify-between mx-20">
      {tabs.map((tab) => (
        <Button
          key={tab.path}
          variant={pathname === tab.path ? "default" : "outline"}
          onClick={() => router.push(tab.path)}
          className="rounded-full border-black/70 p-6 font-semibold"
          
        >
          {tab.name}
        </Button>
      ))}
    </nav>
  );
}
