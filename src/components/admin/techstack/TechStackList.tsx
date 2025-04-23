"use client";
import { useEffect, useMemo, useState, useTransition } from "react";
import { toast } from "sonner";
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
import Link from "next/link";
import { Button } from "../../ui/button";
import Image from "next/image";
import Fuse from "fuse.js";
import { deleteSkill } from "@/actions/skill";
import { Edit, SearchIcon, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export type SkillProps = {
  id: string;
  name: string;
  imageUrl: string;
  tag: "frontend" | "backend" | "mobile" | "DevOps" | "baas" | "saas";
  updatedAt: Date;
  createdAt: Date;
};

type Props = {
  data: {
    errorMessage: string | null;
    skills?: SkillProps[];
  };
};

function TechStackList({ data }: Props) {
  const [searchSkill, setSearchSkill] = useState("");
  const [localSkills, setLocalSkills] = useState(data.skills ?? []);
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
    setLocalSkills(data.skills ?? []);
  }, [data.skills]);

  const fuse = useMemo(() => {
    return new Fuse(localSkills, {
      keys: ["name", "tag"],
      threshold: 0.4,
    });
  }, [localSkills]);

  if (data.errorMessage) return null;

  const filteredSkills = searchSkill
    ? fuse.search(searchSkill).map((result) => result.item)
    : localSkills;

  const deleteSkillLocally = (skillId: string) => {
    console.log(isPending);
    setLocalSkills((prev) => prev.filter((skill) => skill.id !== skillId));
  };

  const handleDeleteSkill = (skillId: string) => {
    startTransition(async () => {
      const { errorMessage } = await deleteSkill(skillId);
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
        toast.success("Skill Deleted Successfully!", {
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            border: "1px solid #388E3C",
          },
        });
        deleteSkillLocally(skillId);
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
            placeholder="Search skills"
            value={searchSkill}
            onChange={(e) => setSearchSkill(e.target.value)}
          />
        </div>
        <div className="w-full">
          <Link href="skills/form">
            <Button variant="outline" className="h-12 cursor-pointer font-bold">
              New Skill
            </Button>
          </Link>
        </div>
      </div>
      <div>
        <Table>
          <TableCaption>A list of your skill frameworks.</TableCaption>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead className="w-[100px]">Id</TableHead>
              <TableHead>Framework</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead>Tag</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSkills ? (
              filteredSkills.map((skill, index) => (
                <TableRow
                  key={skill.id}
                  className={`${index % 2 !== 0 ? "bg-muted" : ""}`}
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{skill.name}</TableCell>
                  <TableCell>
                    <Image
                      className="h-10 w-10 rounded-full object-cover"
                      src={skill.imageUrl}
                      alt="Company Image"
                      width={40}
                      height={40}
                    />
                  </TableCell>
                  <TableCell>{skill.tag}</TableCell>
                  <TableCell>{skill.createdAt.toLocaleDateString()}</TableCell>
                  <TableCell>{skill.updatedAt.toLocaleDateString()}</TableCell>
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
                            href={`/admin/skills/form/${skill.id}`}
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
                                `Are you sure you want to delete ${skill.name}?`,
                              )
                            ) {
                              handleDeleteSkill(skill.id);
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
                <TableCell>No skill found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export default TechStackList;
