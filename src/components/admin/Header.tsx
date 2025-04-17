import { SidebarTrigger } from "../ui/sidebar";
import { Button } from "../ui/button";
import Link from "next/link";
import { ModeToggle } from "../shared/DarkModeToggler";
import LogoutButton from "./LogoutButton";
import { getUser } from "@/auth/server";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function Header() {
  const user = await getUser();

  return (
    <header className="bg-sidebar relative flex h-24 w-full items-center justify-between px-3 sm:px-8">
      <SidebarTrigger className="absolute top-1 left-1" />
      <Link href="/">
        <Button variant="outline" className="cursor-pointer">
          Preview
        </Button>
      </Link>

      {/* <p>Dashboared</p> */}

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

export default Header;
