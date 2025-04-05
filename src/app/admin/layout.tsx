import { AppSidebar } from "@/components/admin/AppSidebar";
import Header from "@/components/admin/Header";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <div className="flex min-h-screen w-full flex-col">
        <Header />
        <main className="xl:px:8 flex flex-1 flex-col px-4 pt-10">
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
}

export default AdminLayout;
