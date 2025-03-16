import AdminMenu from "@/components/AdminMenu/AdminMenu";



export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
        
      <AdminMenu /> {/* เรียกใช้งาน Navbar ที่เราแยกไว้ */}
                
      <main className="p-4">{children}</main>
          
    </div>
  );
}
