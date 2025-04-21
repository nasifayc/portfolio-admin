"use client";

import { techStackSchema } from "@/schemas/techStackSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Asterisk, Loader2, Upload } from "lucide-react";
import { toast } from "sonner";
import { convertBlobUrlToFile } from "@/lib/utils";
import { deleteImage, uploadImage } from "@/actions/storage";
import { createSkill, updateSkill } from "@/actions/skill";
import { useRouter } from "next/navigation";
import { SkillProps } from "./TechStackList";
import Link from "next/link";
import { Label } from "@/components/ui/label";

type TechStackFormData = z.infer<typeof techStackSchema>;

type Props = {
  skill?: SkillProps;
};

function TechStackForm({ skill }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isPending2, startTransition2] = useTransition();
  const router = useRouter();

  useEffect(() => {
    if (!skill) return;
    setPreviewUrl(skill.imageUrl);
  }, [skill]);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TechStackFormData>({
    resolver: zodResolver(techStackSchema),
    defaultValues: {
      name: skill?.name || "",
      imageUrl: skill?.imageUrl || "",
      tag: skill?.tag || "frontend",
    },
  });

  const onSubmit = async (data: TechStackFormData) => {
    startTransition2(async () => {
      const res = skill
        ? await updateSkill(skill.id, data)
        : await createSkill(data);

      if (res.errorMessage) {
        toast.error("Something went wrong!", {
          description: res.errorMessage,
          style: {
            backgroundColor: "#4CAF50",
            color: "white",
            border: "1px solid #388E3C",
          },
        });
      } else {
        toast.success(`Skill ${skill ? "updated" : "created"} successfully!`, {
          style: {
            backgroundColor: "#F44336",
            color: "white",
            border: "1px solid #D32F2F",
          },
        });
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
        toast.error("Please select an image first.", {
          style: {
            backgroundColor: "#F44336",
            color: "white",
            border: "1px solid #D32F2F",
          },
        });
        return;
      }

      const file = await convertBlobUrlToFile(previewUrl);

      if (skill) {
        const { error } = await deleteImage(skill.imageUrl);
        if (error) {
          toast.error("Failed to delete old image.", {
            style: {
              backgroundColor: "#F44336",
              color: "white",
              border: "1px solid #D32F2F",
            },
          });
          return;
        }
      }
      const { imageUrl, error } = await uploadImage({
        file,
        bucket: "techstack",
      });

      if (error || !imageUrl) {
        toast.error("Upload failed", {
          style: {
            backgroundColor: "#F44336",
            color: "white",
            border: "1px solid #D32F2F",
          },
        });
        return;
      }

      setValue("imageUrl", imageUrl);
      setPreviewUrl("");
      toast.success("Image uploaded!", {
        style: {
          backgroundColor: "#4CAF50",
          color: "white",
          border: "1px solid #388E3C",
        },
      });
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-start gap-4"
    >
      <div className="flex w-4/6 justify-between gap-2 lg:w-3/6">
        <p className="text-lg font-bold lg:text-2xl">
          {skill ? "Update Skill" : "New Skill"}
        </p>
        <Link href="/admin/skills">
          <Button variant="outline" className="cursor-pointer">
            Cancel
          </Button>
        </Link>
      </div>

      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="name" className="text-muted-foreground">
          Tech
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>

        <Input
          id="name"
          placeholder="Tech Name (e.g React)"
          {...register("name")}
          className="placeholder:text-muted-foreground w-full focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {errors.name && (
          <p className="text-xs text-red-500 italic">{errors.name.message}</p>
        )}
      </div>

      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Select
          defaultValue="frontend"
          onValueChange={(value) =>
            setValue("tag", value as TechStackFormData["tag"])
          }
        >
          <SelectTrigger id="tag" className="w-[180px]">
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
        {errors.tag && (
          <p className="text-xs text-red-500 italic">{errors.tag.message}</p>
        )}
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
          ) : skill ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
}

export default TechStackForm;
