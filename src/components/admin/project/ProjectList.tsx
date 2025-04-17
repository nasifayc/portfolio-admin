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
                <Image
                  src={project.imageUrl}
                  alt="Project Image"
                  className="h-auto w-auto"
                  width={200}
                  height={200}
                  objectFit="cover"
                />
                <div className="flex gap-2">
                  {project.techStack.map((tech) => (
                    <div className="flex gap-2">
                      <Image
                        src={tech.imageUrl}
                        alt="Tech Image"
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
                      <p>{tech.name}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flec gap-4">
                <a href={project.githubLink} target="blank">
                  <Button variant="outline">Source Code</Button>
                </a>
                <a href={project.liveDemo} target="blank">
                  <Button variant="outline">Live Demo</Button>
                </a>

                {/* <Button>Live Demo</Button> */}
                {/* <p>GitHub | Live Demo</p> */}
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

// id String @id @default(uuid())
//     name String
//     imageUrl String
//     tag Tag
//     projects Project[]
//     createdAt DateTime  @default(now())
//     updatedAt DateTime @updatedAt @default(now())
