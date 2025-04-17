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
    skills?: {
      id: string;
      name: string;
      imageUrl: string;
      tag: string;
    }[];
  };
};

function TechStackList({ data }: Props) {
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
      {data.skills && data.skills.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.skills.map((skill) => (
            <Card key={skill.id}>
              <CardHeader>
                <CardTitle>{skill.name}</CardTitle>
                {/* <CardDescription>{project.description}</CardDescription> */}
              </CardHeader>
              <CardContent>
                <Image
                  src={skill.imageUrl}
                  alt="Skill Image"
                  width={100}
                  height={100}
                />
                {/* <p>More details</p> */}
              </CardContent>
              <CardFooter>
                {skill.tag}
                {/* <p>GitHub | Live Demo</p> */}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground flex h-[300px] flex-col items-center justify-center gap-2 text-center">
          <p>No skill found. Add some from your dashboard.</p>
          <Link href="skills/form">
            <Button>Add</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default TechStackList;
