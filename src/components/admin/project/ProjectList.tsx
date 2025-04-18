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
} from "../../ui/card";
import Link from "next/link";
import { Button } from "../../ui/button";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

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
      <Link href="project/form">
        <Button variant="outline" className="mb-6 cursor-pointer">
          Create Project
        </Button>
      </Link>
      {data.projects && data.projects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.projects.map((project) => (
            <Card
              key={project.id}
              className="flex cursor-pointer flex-col justify-between shadow-md transition-transform duration-500 group-hover:scale-110"
            >
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Image
                  src={project.imageUrl}
                  alt="Project Image"
                  className="h-48 w-full rounded-md object-cover"
                  width={400}
                  height={400}
                  objectFit="cover"
                />
                <div className="flex flex-wrap items-center gap-2">
                  {project.techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-secondary-foreground flex items-center justify-between gap-1 rounded-sm px-3 py-1 text-xs"
                    >
                      <Image
                        src={tech.imageUrl}
                        alt="Tech Image"
                        width={20}
                        height={20}
                        className="h-4 w-4 rounded-full"
                      />
                      <p className="text-background">{tech.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="mt-4 flex flex-wrap gap-2">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full sm:w-auto">
                    Source Code
                  </Button>
                </a>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full sm:w-auto">
                    Live Demo
                  </Button>
                </a>
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
