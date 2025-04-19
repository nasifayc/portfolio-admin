"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { appbarItems } from "@/lib/constants";
import Link from "next/link";
import { useState } from "react";

export function AppSidebar() {
  const [currBar, setCurrBar] = useState(0);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup className="relative">
          <SidebarGroupLabel>Manage Portfolio</SidebarGroupLabel>

          <SidebarGroupContent className="pt-8">
            <SidebarMenu className="flex flex-col gap-2">
              {appbarItems.map((item, index) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`text-muted-foreground ${currBar === index ? "bg-muted" : ""}`}
                    onClick={() => setCurrBar(index)}
                  >
                    <Link href={`/admin${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-muted-foreground text-xs">
        Developed By Nasifay Chala
      </SidebarFooter>
    </Sidebar>
  );
}
