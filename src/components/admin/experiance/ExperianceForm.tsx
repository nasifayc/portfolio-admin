"use client";

import { createExperience } from "@/actions/experiance";
import { uploadImage } from "@/actions/storage";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn, convertBlobUrlToFile } from "@/lib/utils";
import { experienceSchema } from "@/schemas/techStackSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Loader2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";

type ExperianceFormData = z.infer<typeof experienceSchema>;

function ExperianceForm() {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isStillworking, setIsStillWorking] = useState<boolean>(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [roleInput, setRoleInput] = useState("");

  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ExperianceFormData>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      stillWorking: false,
      role: [],
    },
  });

  const addRole = () => {
    const trimmed = roleInput.trim();
    if (trimmed && !roles.includes(trimmed)) {
      const updated = [...roles, trimmed];
      setRoles((prev) => [...prev, trimmed]);
      setValue("role", updated);
      setRoleInput("");
    }
  };

  const removeRole = (roleToRemove: string) => {
    const updated = roles.filter((r) => r !== roleToRemove);
    setRoles(updated);
    setValue("role", updated);
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
        bucket: "exp",
      });

      if (error || !imageUrl) {
        console.log("Error", error);
        console.log("ImageUrl ", imageUrl);
        toast.error("Upload failed");
        return;
      }

      setValue("companyImage", imageUrl);
      setPreviewUrl("");
      toast.success("Image uploaded!");
    });
  };

  const onSubmit = async (data: ExperianceFormData) => {
    startTransition(async () => {
      const { errorMessage } = await createExperience(data);
      if (errorMessage) {
        toast.error("Failed To Create Experiance!", {
          description: errorMessage,
        });
      } else {
        toast.success("Experiance created successfully!");
        router.replace("/admin/experience");
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Company name" {...register("companyName")} />
      {errors.companyName && <p>{errors.companyName.message}</p>}
      <Textarea placeholder="Description" {...register("description")} />
      {errors.description && <p>{errors.description.message}</p>}
      <Controller
        control={control}
        name="startingDate"
        render={({ field }) => (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[240px] justify-start text-left font-normal",
                  !field.value && "text-muted-foreground",
                )}
              >
                <CalendarIcon />
                {field.value ? (
                  format(field.value, "PPP")
                ) : (
                  <span>Pick starting date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )}
      />
      {!isStillworking && (
        <Controller
          control={control}
          name="endDate"
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon />
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick end date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={field.value}
                  onSelect={field.onChange}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
      )}

      <Controller
        name="stillWorking"
        control={control}
        render={({ field }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(!!checked);
                setIsStillWorking(!!checked);
              }}
            />
            <label
              htmlFor="terms"
              className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Are you still working?
            </label>
          </div>
        )}
      />
      <div className="my-4 space-y-2">
        <div className="flex gap-2">
          <Input
            placeholder="Add a role"
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
          />
          <Button type="button" onClick={addRole} disabled={!roleInput.trim()}>
            Add
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {roles.map((role, index) => (
            <div className="bg-accent flex items-center gap-2 rounded-md border p-2">
              <p key={index}>{role}</p>
              <X
                size={14}
                className="cursor-pointer"
                onClick={() => removeRole(role)}
              />
            </div>
          ))}
        </div>

        {errors.role && (
          <p className="text-sm text-red-500">
            {errors.role.message as string}
          </p>
        )}
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
        {...register("companyImage")}
        value={watch("companyImage")}
      />
      {errors.companyImage && (
        <p className="text-sm text-red-500">{errors.companyImage.message}</p>
      )}
      <Button type="submit" disabled={isPending}>
        {isPending ? <Loader2 className="animate-spin" /> : "Submit"}
      </Button>
    </form>
  );
}

export default ExperianceForm;
