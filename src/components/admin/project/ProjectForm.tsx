"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/schemas/techStackSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "react-multi-select-component";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Asterisk, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { convertBlobUrlToFile } from "@/lib/utils";
import { deleteImage, uploadImage } from "@/actions/storage";
import { createProject, updateProject } from "@/actions/project";
import { ProjectProps } from "./ProjectList";
import Link from "next/link";
import { Label } from "@/components/ui/label";

type ProjectFormData = z.infer<typeof projectSchema>;

type Props = {
  data: {
    errorMessage: string | null;
    skills?: {
      id: string;
      name: string;
      imageUrl: string;
    }[];
  };

  project?: ProjectProps;
};

interface Option {
  value: string;
  label: string;
}

function ProjectForm({ data, project }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isPending2, startTransition2] = useTransition();

  useEffect(() => {
    if (project?.imageUrl) {
      setPreviewUrl(project.imageUrl);
    }
  }, [project?.imageUrl]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,

    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project?.title ?? "",
      description: project?.description ?? "",
      githubLink: project?.githubLink ?? "",
      liveDemo: project?.liveDemo ?? "",
      imageUrl: project?.imageUrl ?? "",
      techStack: project?.techStack.map((skill) => skill.id) ?? [],
    },
  });

  const techStackOptions: Option[] = (data.skills ?? []).map((skill) => ({
    value: skill.id,
    label: skill.name,
  }));

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const localUrl = URL.createObjectURL(file);
    setPreviewUrl(localUrl);
  };

  const handleUpload = async () => {
    startTransition(async () => {
      if (!previewUrl) {
        toast.error("Please select an image first.");
        return;
      }

      const file = await convertBlobUrlToFile(previewUrl);
      if (project) {
        const { data, error } = await deleteImage(project.imageUrl);
        if (error) {
          toast.error("Failed to delete old image");
          return;
        }
      }
      const { imageUrl, error } = await uploadImage({
        file,
        bucket: "projects",
      });

      if (error || !imageUrl) {
        toast.error("Upload failed");
        return;
      }

      setValue("imageUrl", imageUrl);
      setPreviewUrl("");
      toast.success("Image uploaded!");
    });
  };

  const handleTechStackChange = (selected: Option[] | null) => {
    setValue(
      "techStack",
      selected ? selected.map((option) => option.value) : [],
    );
  };

  const selectedTechStack = watch("techStack");

  const onSubmit = async (data: ProjectFormData) => {
    startTransition2(async () => {
      const res = project
        ? await updateProject(project.id, data)
        : await createProject(data);

      if (res.errorMessage) {
        toast.error("Something went wrong", {
          description: res.errorMessage,
        });
      } else {
        toast.success(
          `Project ${project ? "updated" : "created"} successfully!`,
        );
        router.replace("/admin/project");
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-start gap-4"
    >
      <div className="flex w-4/6 justify-between gap-2 lg:w-3/6">
        <p className="text-lg font-bold lg:text-2xl">
          {project ? "Update Project" : "Create Project"}
        </p>
        <Link href="/admin/project">
          <Button variant="outline" className="cursor-pointer">
            Cancel
          </Button>
        </Link>
      </div>
      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="title" className="text-muted-foreground">
          Project Title
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>
        <Input
          id="title"
          placeholder="Project title"
          {...register("title")}
          className="placeholder:text-muted-foreground w-full focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {errors.title && (
          <p className="text-xs text-red-500 italic">{errors.title.message}</p>
        )}
      </div>
      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="description" className="text-muted-foreground">
          Description
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>
        <Textarea
          id="description"
          placeholder="Description"
          {...register("description")}
          className="placeholder:text-muted-foreground w-full resize-none border p-4 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {errors.description && (
          <p className="text-xs text-red-500 italic">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="githubLink" className="text-muted-foreground">
          Github
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>
        <Input
          id="githubLink"
          placeholder="https://"
          type="url"
          {...register("githubLink")}
          className="placeholder:text-muted-foreground w-full focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {errors.githubLink && (
          <p className="text-xs text-red-500 italic">
            {errors.githubLink.message}
          </p>
        )}
      </div>
      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="githubLink" className="text-muted-foreground">
          Live Demo
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>
        <Input
          id="liveDemo"
          placeholder="https://"
          type="url"
          {...register("liveDemo")}
          className="placeholder:text-muted-foreground w-full focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {errors.liveDemo && (
          <p className="text-xs text-red-500 italic">
            {errors.liveDemo.message}
          </p>
        )}
      </div>

      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="techStack" className="text-muted-foreground">
          Teck Stack
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>
        <div id="techStack">
          <MultiSelect
            className="text-background"
            options={techStackOptions}
            value={techStackOptions.filter((option) =>
              selectedTechStack?.includes(option.value),
            )}
            onChange={handleTechStackChange}
            labelledBy={"Tech Stack"}
          />
          {errors.techStack && (
            <p className="text-xs text-red-500 italic">
              {errors.techStack.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="imageUrl" className="text-muted-foreground">
          Upload Image
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>
        <Input id="imageUrl" type="file" onChange={handleImageChange} />
        {errors.imageUrl && (
          <p className="text-xs text-red-500 italic">
            {errors.imageUrl.message}
          </p>
        )}
      </div>
      {previewUrl && (
        <Image
          src={previewUrl}
          width={200}
          height={200}
          objectFit="cover"
          alt="preview"
          className="mt-2 h-64 w-4/6 rounded-md object-cover lg:w-3/6"
        />
      )}
      <Input
        type="hidden"
        {...register("imageUrl")}
        value={watch("imageUrl")}
      />
      <div className="flex w-4/6 gap-2 lg:w-3/6">
        <Button
          type="button"
          className="lg:w-3/ flex w-3/6 cursor-pointer items-center justify-center"
          onClick={handleUpload}
          variant="outline"
          disabled={isPending || previewUrl.length <= 0}
        >
          {isPending ? (
            <Loader2 className="animate-spin" />
          ) : (
            <p className="flex items-center justify-center gap-2">
              <span>
                <Upload />
              </span>
              Upload Image
            </p>
          )}
        </Button>

        <Button
          type="submit"
          disabled={isPending2}
          className="flex w-3/6 cursor-pointer items-center justify-center lg:w-3/6"
        >
          {isPending2 ? (
            <Loader2 className="animate-spin" />
          ) : project ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
}

export default ProjectForm;
