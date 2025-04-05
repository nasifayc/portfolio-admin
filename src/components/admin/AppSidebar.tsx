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
import { appbarItems } from "@/lib/constants";
import { Separator } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Manage Portfolio</SidebarGroupLabel>

          <SidebarGroupContent className="pt-8">
            <SidebarMenu className="flex flex-col gap-2">
              {appbarItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="text-muted-foreground">
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
