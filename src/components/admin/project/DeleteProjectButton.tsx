"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
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
import { deleteProject } from "@/actions/project";
import { toast } from "sonner";

type Props = {
  projectId: string;
  deleteProjectLocally: (projectId: string) => void;
};
function DeleteProjectButton({ projectId, deleteProjectLocally }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleDeleteProject = () => {
    startTransition(async () => {
      const { errorMessage } = await deleteProject(projectId);
      if (errorMessage) {
        toast.error("Request Failed", {
          description: errorMessage,
          style: {
            backgroundColor: "#F44336",
            color: "white",
            border: "1px solid #E53935",
          },
        });
      } else {
        toast.success("Note Deleted Successfully!", {
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            border: "1px solid #388E3C",
          },
        });
        deleteProjectLocally(projectId);
      }
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="size-7 -translate-y-1/2 cursor-pointer p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this project?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDeleteProject}
            disabled={isPending}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90 text-muted w-24"
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteProjectButton;
