import { Loader2 } from "lucide-react";
import React from "react";

function Loading() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <Loader2 className="animate-spin" size={30} />
    </div>
  );
}

export default Loading;
