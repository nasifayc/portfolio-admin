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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { convertBlobUrlToFile } from "@/lib/utils";
import { deleteImage, uploadImage } from "@/actions/storage";
import { createProject, updateProject } from "@/actions/project";
import { ProjectProps } from "./ProjectList";

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

  useEffect(() => {
    if (project?.imageUrl) {
      setPreviewUrl(project.imageUrl);
    }
  }, [project]);

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
    startTransition(async () => {
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Project title" {...register("title")} />
      {errors.title && <p>{errors.title.message}</p>}
      <Textarea placeholder="Description" {...register("description")} />
      {errors.description && <p>{errors.description.message}</p>}
      <Input placeholder="GitHub Link" type="url" {...register("githubLink")} />
      {errors.githubLink && <p>{errors.githubLink.message}</p>}
      <Input placeholder="Live Demo URL" type="url" {...register("liveDemo")} />
      {errors.liveDemo && <p>{errors.liveDemo.message}</p>}
      <div>
        <MultiSelect
          options={techStackOptions}
          value={techStackOptions.filter((option) =>
            selectedTechStack?.includes(option.value),
          )}
          onChange={handleTechStackChange}
          labelledBy={"Tech Stack"}
        />
        {errors.techStack && <p>{errors.techStack.message}</p>}
      </div>
      <Input type="file" onChange={handleImageChange} />
      {previewUrl && (
        <Image
          src={previewUrl}
          width={200}
          height={200}
          objectFit="cover"
          alt="preview"
          className="mt-2 h-20 w-20 rounded-md object-cover"
        />
      )}
      <Button
        type="button"
        onClick={handleUpload}
        disabled={isPending || previewUrl.length <= 0}
      >
        {isPending ? <Loader2 className="animate-spin" /> : "Upload Image"}
      </Button>
      <Input
        type="hidden"
        {...register("imageUrl")}
        value={watch("imageUrl")}
      />
      {errors.imageUrl && (
        <p className="text-sm text-red-500">{errors.imageUrl.message}</p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
}

export default ProjectForm;
