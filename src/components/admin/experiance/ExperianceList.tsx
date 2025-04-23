"use client";
import { useEffect, useMemo, useState, useTransition } from "react";

import { toast } from "sonner";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Edit, SearchIcon, Trash2 } from "lucide-react";
import Fuse from "fuse.js";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteExperience } from "@/actions/experiance";

export type ExperienceProps = {
  id: string;
  companyName: string;
  companyImage: string;
  startingDate: Date;
  endDate?: Date | null;
  stillWorking: boolean;
  description: string;
  role: string[];
  updatedAt: Date;
};

type Props = {
  data: {
    errorMessage: string | null;
    experiences?: ExperienceProps[];
  };
};
function ExperianceList({ data }: Props) {
  const [searchExp, setSearchExp] = useState("");
  const [localExperiences, setLocalExperiences] = useState(
    data.experiences ?? [],
  );
  const [isPending, startTransition] = useTransition();

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

  useEffect(() => {
    setLocalExperiences(data.experiences ?? []);
  }, [data.experiences]);

  const fuse = useMemo(() => {
    return new Fuse(localExperiences, {
      keys: ["companyName", "description", "role"],
      threshold: 0.4,
    });
  }, [localExperiences]);

  if (data.errorMessage) return null;

  const filteredExperiences = searchExp
    ? fuse.search(searchExp).map((result) => result.item)
    : localExperiences;

  const deleteExperienceLocally = (expId: string) => {
    setLocalExperiences((prev) =>
      prev.filter((experience) => experience.id !== expId),
    );
  };

  const handleDeleteExp = (expId: string) => {
    startTransition(async () => {
      console.log(isPending);
      const { errorMessage } = await deleteExperience(expId);
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
        toast.success("Work Experience Deleted Successfully!", {
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            border: "1px solid #388E3C",
          },
        });
        deleteExperienceLocally(expId);
      }
    });
  };
  return (
    <>
      <div className="mb-6 flex w-full items-center justify-between gap-4">
        <div className="relative flex flex-4/5 items-center">
          <SearchIcon className="absolute left-2 size-4" />
          <Input
            className="bg-muted h-12 pl-8 text-sm"
            placeholder="Search experiances"
            value={searchExp}
            onChange={(e) => setSearchExp(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Link href="experience/form">
            <Button variant="outline" className="h-12 cursor-pointer font-bold">
              New Experience
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your recent work experiences.</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Company Name</TableHead>
              <TableHead>Company Image</TableHead>
              <TableHead>Duration</TableHead>
              {/* <TableHead>Description</TableHead> */}
              <TableHead>Role</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredExperiences ? (
              filteredExperiences.map((exp, index) => (
                <TableRow
                  key={exp.id}
                  className={`${index % 2 !== 0 ? "bg-muted" : ""}`}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{exp.companyName}</TableCell>
                  <TableCell>
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      src={exp.companyImage}
                      alt="Company Image"
                      width={40}
                      height={40}
                    />
                  </TableCell>
                  <TableCell>{`${exp.startingDate.toLocaleDateString()} - ${exp.stillWorking ? "Present" : exp.endDate?.toLocaleDateString()}`}</TableCell>
                  {/* <TableCell>
                    <p className="text-wrap break-words overflow-ellipsis">
                      {exp.description}
                    </p>
                  </TableCell> */}
                  <TableCell>
                    {exp.role.map((r) => (
                      <p key={r}>{r}</p>
                    ))}
                  </TableCell>
                  <TableCell>{exp.updatedAt.toLocaleDateString()}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <Button className="cursor-pointer">Action</Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="cursor-pointer">
                          <Link
                            href={`/admin/experience/form/${exp.id}`}
                            className="flex items-center justify-center gap-2"
                          >
                            <span>
                              <Edit />
                            </span>
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="cursor-pointer text-red-500"
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete ${exp.companyName}`,
                              )
                            ) {
                              handleDeleteExp(exp.id);
                            }
                          }}
                        >
                          <Trash2 className="text-red-500" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>No work experience</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default ExperianceList;
