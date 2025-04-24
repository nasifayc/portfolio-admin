"use client";

import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

import { logoutAction } from "@/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleLogout = () => {
    startTransition(async () => {
      const { errorMessage } = await logoutAction();

      if (!errorMessage) {
        toast.success("Successfully logged out!", {
          description: "You have been successfully logged out.",
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            border: "1px solid #388E3C",
          },
        });
        router.push("/");
      } else {
        toast.error("Failed to log out!", {
          description: errorMessage,
          style: {
            backgroundColor: "#F44336",
            color: "white",
            border: "1px solid #D32F2F",
          },
        });
      }
    });
  };
  return (
    <Button
      className="flex w-24 items-center justify-center"
      disabled={isPending}
      variant="outline"
      onClick={handleLogout}
    >
      {isPending ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
}

export default LogoutButton;
