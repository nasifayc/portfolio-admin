"use client";
import { SidebarTrigger, useSidebar } from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "../shared/DarkModeToggler";
import LogoutButton from "./LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface HeaderClientProps {
  user: {
    user_metadata: {
      picture?: string;
      avatar_url?: string;
      full_name?: string;
      email?: string;
    };
  } | null;
}

function HeaderClient({ user }: HeaderClientProps) {
  const { open } = useSidebar();
  return (
    <header
      className={`bg-card fixed top-0 right-0 left-0 z-40 flex h-24 w-auto items-center justify-between px-3 shadow-sm transition-all duration-300 sm:px-8 ${
        open && "lg:ml-64"
      }`}
    >
      <SidebarTrigger className="h absolute top-8 left-1" />

      <Link href="/" className="pl-10">
        <Button variant="outline" className="cursor-pointer">
          Preview
        </Button>
      </Link>

      <div className="flex gap-4">
        <ModeToggle />
        {user ? (
          <LogoutButton />
        ) : (
          <Button asChild variant="outline">
            <Link href={"/login"}>Login</Link>
          </Button>
        )}

        <div className="flex items-center gap-1">
          <Avatar className="border-primary border-2">
            <AvatarImage
              src={
                user?.user_metadata.picture || user?.user_metadata.avatar_url
              }
            />
            <AvatarFallback>NC</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm">{user?.user_metadata.full_name}</p>
            <p className="text-muted-foreground text-sm">
              {user?.user_metadata.email}
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderClient;
