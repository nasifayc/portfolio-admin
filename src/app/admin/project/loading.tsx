import { Loader2 } from "lucide-react";

function loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader2 className="animate-spin" size={30} />
    </div>
  );
}

export default loading;
