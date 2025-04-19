"use client";
import { useEffect, useMemo, useState } from "react";
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
import DeleteProjectButton from "./DeleteProjectButton";
import Fuse from "fuse.js";
import { FolderEdit, SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";

export type TechStack = {
  id: string;
  name: string;
  imageUrl: string;
};

export type ProjectProps = {
  id: string;
  title: string;
  description: string;
  githubLink: string;
  liveDemo: string;
  imageUrl: string;
  techStack: TechStack[];
};

type Props = {
  data: {
    errorMessage: string | null;
    projects?: ProjectProps[];
  };
};

function ProjectList({ data }: Props) {
  const [searchProject, setSearchProject] = useState("");
  const [localProjects, setLocalProjects] = useState(data.projects ?? []);
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

  useEffect(() => {
    setLocalProjects(data.projects ?? []);
  }, [data.projects]);

  const fuse = useMemo(() => {
    return new Fuse(localProjects, {
      keys: ["title", "description", "techStack.name"],
      threshold: 0.4,
    });
  }, [localProjects]);

  const filteredProjects = searchProject
    ? fuse.search(searchProject).map((result) => result.item)
    : localProjects;

  const deleteProjectLocally = (projectId: string) => {
    setLocalProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId),
    );
  };

  return (
    <>
      <div className="mb-6 flex w-full items-center justify-between gap-4">
        <div className="relative flex flex-4/5 items-center">
          <SearchIcon className="absolute left-2 size-4" />
          <Input
            className="bg-muted h-12 pl-8 text-sm"
            placeholder="Search projects"
            value={searchProject}
            onChange={(e) => setSearchProject(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Link href="project/form">
            <Button variant="outline" className="h-12 cursor-pointer font-bold">
              New Project
            </Button>
          </Link>
        </div>
      </div>

      {filteredProjects && filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => (
            <Card
              key={project.id}
              className="group/item shadow-accent flex cursor-pointer flex-col justify-between rounded-lg border p-3 shadow-sm hover:shadow-md"
            >
              <CardHeader className="p-0 pb-2">
                <CardTitle className="flex items-center justify-between text-base sm:text-lg">
                  {project.title}
                  <div className="flex gap-1 transition-opacity">
                    <Link href={`/admin/project/form/${project.id}`}>
                      <Button
                        variant="ghost"
                        className="size-7 -translate-y-1/2 cursor-pointer p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
                      >
                        <FolderEdit />
                      </Button>
                    </Link>
                    <DeleteProjectButton
                      projectId={project.id}
                      deleteProjectLocally={deleteProjectLocally}
                    />
                  </div>
                </CardTitle>
                <CardDescription className="text-muted-foreground text-xs sm:text-sm">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 p-0">
                <Image
                  src={project.imageUrl}
                  alt="Project Image"
                  className="h-36 w-full rounded-md object-cover"
                  width={400}
                  height={400}
                  objectFit="cover"
                />
                <div className="flex flex-wrap items-center gap-2">
                  {project.techStack.map((tech) => (
                    <div
                      key={tech.name}
                      className="bg-secondary-foreground flex items-center justify-between gap-1 rounded-sm px-2 py-1 text-[10px] sm:text-xs"
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
              <CardFooter className="mt-2 flex flex-wrap gap-2 p-0 pt-2">
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="w-full px-3 py-1.5 text-xs sm:w-auto"
                  >
                    Source Code
                  </Button>
                </a>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="w-full px-3 py-1.5 text-xs sm:w-auto"
                  >
                    Live Demo
                  </Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground flex h-[300px] flex-col items-center justify-center gap-2 text-center">
          <p>No projects found. </p>
          <Link href="project/form">
            <Button>Add</Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default ProjectList;
