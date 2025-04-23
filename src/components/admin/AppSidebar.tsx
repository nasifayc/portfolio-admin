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
} from "@/components/ui/sidebar";
import { analyticsAppbarItems, generalAppbarItems } from "@/lib/constants";

import Link from "next/link";
import { useState } from "react";

export function AppSidebar() {
  const [currBar, setCurrBar] = useState(0);

  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup className="relative">
          <SidebarGroupLabel>
            <h1 className="text-xl font-bold">Dashboared</h1>
          </SidebarGroupLabel>

          <SidebarGroupContent className="pt-8">
            <SidebarMenu className="flex flex-col gap-2">
              <p className="text-muted-foreground pl-2">General</p>
              {generalAppbarItems.map((item, index) => (
                <SidebarMenuItem className="pl-4" key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={` ${currBar === index ? "bg-muted" : ""}`}
                    onClick={() => setCurrBar(index)}
                  >
                    <Link className="" href={`/admin${item.url}`}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <p className="text-muted-foreground pt-2 pl-2">Analytics</p>
              {analyticsAppbarItems.map((item, index) => (
                <SidebarMenuItem className="pl-4" key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={` ${currBar === generalAppbarItems.length + index ? "bg-muted" : ""}`}
                    onClick={() =>
                      setCurrBar(generalAppbarItems.length + index)
                    }
                  >
                    <Link className="" href={`/admin${item.url}`}>
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
