"use client";
import { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
type Props = {
  data: {
    errorMessage: string | null;
    experiences?: {
      id: string;
      companyName: string;
      companyImage: string;
      startingDate: Date;
      endDate?: Date | null;
      stillWorking: boolean;
      description: string;
      role: string[];
    }[];
  };
};
function ExperianceList({ data }: Props) {
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
      {data.experiences && data.experiences.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.experiences.map((exp) => (
            <Card key={exp.id}>
              <CardHeader>
                <CardTitle>{exp.companyName}</CardTitle>
                <CardDescription>{exp.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={exp.companyImage}
                  alt="Company Image"
                  className="h-auto w-auto"
                  width={50}
                  height={50}
                  objectFit="cover"
                />
                <div className="flex flex-col gap-2">
                  {exp.role.map((role) => (
                    <div className="flex flex-col gap-2">
                      <p>{role}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-1">
                <p>{exp.startingDate.toLocaleDateString()}</p>
                <p>
                  {exp.stillWorking
                    ? "Present"
                    : exp.endDate?.toLocaleDateString()}
                </p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-muted-foreground flex h-[300px] flex-col items-center justify-center gap-2 text-center">
          <p>No Experience found</p>
          <Link href="experience/form">
            <Button>Add</Button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default ExperianceList;
