"use client";

import { techStackSchema } from "@/schemas/techStackSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { convertBlobUrlToFile } from "@/lib/utils";
import { uploadImage } from "@/actions/storage";
import { createSkill } from "@/actions/skill";
import { useRouter } from "next/navigation";

type TechStackFormData = z.infer<typeof techStackSchema>;

function TechStackForm() {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TechStackFormData>({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
      tag: "frontend",
    },
  });

  const onSubmit = async (data: TechStackFormData) => {
    startTransition(async () => {
      const { errorMessage } = await createSkill(data);

      if (errorMessage) {
        console.log("Faild to create Skill", errorMessage);
        toast.error("Failed to create skill!", {
          description: errorMessage,
        });
      } else {
        toast.success("Skill created successfully!");
        router.replace("/admin/skills");
      }
    });
  };

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
        bucket: "techstack",
      });

      if (error || !imageUrl) {
        toast.error("Upload failed");
        return;
      }

      console.log("Image Url: ", imageUrl);

      setValue("imageUrl", imageUrl);
      setPreviewUrl("");
      toast.success("Image uploaded!");
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Tech Name (e.g React)" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <Select
        defaultValue="frontend"
        onValueChange={(value) =>
          setValue("tag", value as TechStackFormData["tag"])
        }
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a tag" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="frontend">Frontend</SelectItem>
          <SelectItem value="backend">Backend</SelectItem>
          <SelectItem value="mobile">Mobile</SelectItem>
          <SelectItem value="DevOps">DevOps</SelectItem>
          <SelectItem value="baas">BaaS</SelectItem>
          <SelectItem value="saas">SaaS</SelectItem>
        </SelectContent>
      </Select>
      {errors.tag && <p>{errors.tag.message}</p>}
      <Input
        type="file"
        accept=".svg,image/svg+xml"
        onChange={handleImageChange}
      />
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

export default TechStackForm;
