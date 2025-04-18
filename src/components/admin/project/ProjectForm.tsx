"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { projectSchema } from "@/schemas/techStackSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MultiSelect } from "react-multi-select-component";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { convertBlobUrlToFile } from "@/lib/utils";
import { uploadImage } from "@/actions/storage";
import { createProject } from "@/actions/project";

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
};

interface Option {
  value: string;
  label: string;
}

function ProjectForm({ data }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    // defaultValues: {
    //   name: "",
    //   imageUrl: "",
    //   tag: "frontend",
    // },
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
      const { imageUrl, error } = await uploadImage({
        file,
        bucket: "projects",
      });

      if (error || !imageUrl) {
        console.log("Error", error);
        console.log("ImageUrl ", imageUrl);
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
      const { errorMessage } = await createProject(data);
      if (errorMessage) {
        toast.error("Failed To Create Project!", {
          description: errorMessage,
        });
      } else {
        toast.success("Project created successfully!");
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
