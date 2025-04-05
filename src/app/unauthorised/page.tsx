import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

function UnAuthorized() {
  return (
    <div className="flex items-center justify-center">
      <p>UnAuthorized Access</p>{" "}
      <Link href="/">
        <Button>Back To Home</Button>
      </Link>
    </div>
  );
}

export default UnAuthorized;
