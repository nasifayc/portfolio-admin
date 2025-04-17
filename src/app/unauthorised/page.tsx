import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function UnAuthorized() {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4">
      <p>UnAuthorized Access</p>{" "}
      <Link href="/">
        <Button>Back To Home</Button>
      </Link>
    </div>
  );
}

export default UnAuthorized;
