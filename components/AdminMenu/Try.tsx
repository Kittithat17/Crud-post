'use client';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";

export function TabsDemo() {
  const router = useRouter();
  //const pathname = usePathname();
  return (
    <Tabs defaultValue="products" className="w-[500px]">
      <TabsList className="grid w-full grid-cols-3 h-12">
        <TabsTrigger value="products" onClick={() => router.push('/admin/products')} className="text-md font-semibold" >Products</TabsTrigger>
        <TabsTrigger value="users" onClick={() => router.push('/admin/users')} className=" text-md font-semibold">Users</TabsTrigger>
        <TabsTrigger value="orders" onClick={() => router.push('/admin/orders')} className=" text-md font-semibold">Orders</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
