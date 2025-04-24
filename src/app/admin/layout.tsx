import { AppSidebar } from "@/components/admin/AppSidebar";
import Header from "@/components/admin/Header";
import { SidebarProvider } from "@/components/ui/sidebar";

async function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-full w-full flex-col">
        <Header />
        <main className="flex flex-1 flex-col px-4 py-32 xl:px-8">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
