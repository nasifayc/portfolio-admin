"use client";
import { useEffect } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";

type Props = {
  data: {
    errorMessage: string | null;
    projects?: {
      id: string;
      title: string;
      description: string;
      githubLink: string;
      liveDemo: string;
      imageUrl: string;
      techStack: {
        name: string;
        imageUrl: string;
      }[];
    }[];
  };
};

function ProjectList({ data }: Props) {
  useEffect(() => {
    if (data.errorMessage) {
      toast.error("Failed to get projects", {
        description: data.errorMessage,
        style: {
          backgroundColor: "#F44336",
          color: "white",
          border: "1px solid #D32F2F",
        },
      });
    }
  }, [data.errorMessage]);

  if (data.errorMessage) return null;
  return (
    <div>
      {data.projects && data.projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((project) => (
            <Card key={project.id}>
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>More details</p>
              </CardContent>
              <CardFooter>
                <p>GitHub | Live Demo</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground flex h-[300px] flex-col items-center justify-center gap-2 text-center">
          <p>No projects found. Add some from your dashboard.</p>
          <Link href="project/form">
            <Button>Add</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProjectList;
