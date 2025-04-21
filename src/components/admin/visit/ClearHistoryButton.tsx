import { clearVisitHistory } from "@/actions/visit";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

type Props = {
  clearHistoryLocally: () => void;
};

function ClearHistoryButton({ clearHistoryLocally }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleClearHistory = () => {
    startTransition(async () => {
      const { errorMessage } = await clearVisitHistory();
      if (errorMessage) {
        toast.error("Failed to clear visit history", {
          description: errorMessage,
          style: {
            backgroundColor: "#F44336",
            color: "white",
            border: "1px solid #D32F2F",
          },
        });
        return;
      }

      toast.success("Visit history cleared successfully", {
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
          border: "1px solid #388E3C",
        },
      });
      clearHistoryLocally();
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-4 flex h-12 w-32 cursor-pointer items-center justify-center font-bold"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Clear History"}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear History?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently clear your
            portfolio visit history from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleClearHistory}
            disabled={isPending}
            className="bg-destructive hover:bg-destructive/90 w-24 text-white"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Clear"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ClearHistoryButton;
