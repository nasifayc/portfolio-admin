"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

import { logoutAction } from "@/actions/user";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function LogoutButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    setLoading(true);
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
    setLoading(false);
  };
  return (
    <Button
      className="flex w-24 items-center justify-center sm:block"
      disabled={loading}
      variant="outline"
      onClick={handleLogout}
    >
      {loading ? <Loader2 className="animate-spin" /> : "Logout"}
    </Button>
  );
}

export default LogoutButton;
