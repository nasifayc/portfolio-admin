"use client";

import { signInWithGoogle } from "@/actions/user";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useTransition } from "react";
import { toast } from "sonner";

function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const handleLogin = () => {
    startTransition(async () => {
      const { errorMessage } = await signInWithGoogle();
      console.log("Error message", errorMessage);
      if (errorMessage) {
        toast.error("Error occured", {
          description: errorMessage,
          style: {
            backgroundColor: "#F44336",
            color: "white",
            border: "1px solid #D32F2F",
          },
        });
      } else {
        toast.success("Successfully Signed Up!", {
          description: "You have been successfully logged in.",
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            border: "1px solid #388E3C",
          },
        });
      }
    });
  };
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>Please Verify Yourself</CardTitle>
          <CardDescription>
            This page is protected by the developer
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="outline"
            className="flex w-48 items-center justify-center gap-4"
            onClick={handleLogin}
            disabled={isPending}
          >
            {isPending ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <Image
                  src="/google.png"
                  height={20}
                  width={20}
                  alt="Logo Image"
                  className="rounded-full"
                />
                <p>Sign in with Google</p>
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;
