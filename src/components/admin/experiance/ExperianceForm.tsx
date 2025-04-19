"use client";

import { createExperience, updateExperience } from "@/actions/experiance";
import { deleteImage, uploadImage } from "@/actions/storage";
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
import { Asterisk, CalendarIcon, Loader2, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { format } from "date-fns";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { ExperienceProps } from "./ExperianceList";
import Link from "next/link";
import { Label } from "@/components/ui/label";

type ExperianceFormData = z.infer<typeof experienceSchema>;

type Props = {
  experiance?: ExperienceProps;
};

function ExperianceForm({ experiance }: Props) {
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isPending, startTransition] = useTransition();
  const [isPending2, startTransition2] = useTransition();
  const [isStillworking, setIsStillWorking] = useState(false);
  const [roles, setRoles] = useState<string[]>([]);
  const [roleInput, setRoleInput] = useState("");

  const router = useRouter();

  useEffect(() => {
    if (!experiance) return;

    setPreviewUrl(experiance.companyImage ?? "");
    setRoles(experiance.role ?? []);
    setIsStillWorking(!!experiance.stillWorking);
  }, [experiance]);

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
      companyName: experiance?.companyName || "",
      companyImage: experiance?.companyImage || "",
      description: experiance?.description || "",
      startingDate: experiance?.startingDate || new Date(),
      endDate: experiance?.endDate || undefined,
      stillWorking: experiance?.stillWorking || false,
      role: experiance?.role || [],
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

      if (experiance) {
        const { error } = await deleteImage(experiance.companyImage);
        if (error) {
          toast.error("Failed to delete old image.");
          return;
        }
      }
      const { imageUrl, error } = await uploadImage({
        file,
        bucket: "exp",
      });

      if (error || !imageUrl) {
        toast.error("Upload failed");
        return;
      }

      setValue("companyImage", imageUrl);
      setPreviewUrl("");
      toast.success("Image uploaded!");
    });
  };

  const onSubmit = async (data: ExperianceFormData) => {
    startTransition2(async () => {
      const res = experiance
        ? await updateExperience(experiance.id, data)
        : await createExperience(data);

      if (res.errorMessage) {
        toast.error("Something went wrong", {
          description: res.errorMessage,
        });
      } else {
        toast.success(
          `Work experience ${experiance ? "updated" : "created"} successfully!`,
        );
        router.replace("/admin/experience");
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
          {experiance ? "Update Work Experience" : "Create New Experience"}
        </p>
        <Link href="/admin/experience">
          <Button variant="outline" className="cursor-pointer">
            Cancel
          </Button>
        </Link>
      </div>
      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="companyName" className="text-muted-foreground">
          Company Name
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>
        <Input
          id="companyName"
          placeholder="Company name"
          {...register("companyName")}
          className="placeholder:text-muted-foreground w-full focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {errors.companyName && (
          <p className="text-xs text-red-500 italic">
            {errors.companyName.message}
          </p>
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
          className="placeholder:text-muted-foreground w-full focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        {errors.description && (
          <p className="text-xs text-red-500 italic">
            {errors.description.message}
          </p>
        )}
      </div>
      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="startingDate" className="text-muted-foreground">
          Starting Date
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>

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
      </div>
      {!isStillworking && (
        <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
          <Label htmlFor="endDate" className="text-muted-foreground">
            End Date
            <span className="text-red-500">
              <Asterisk size={10} />
            </span>
          </Label>
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
        </div>
      )}

      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
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
      </div>
      {/* <div className="flex w-4/6 flex-col gap-2  lg:w-3/6"></div> */}

      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
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
      <div className="flex w-4/6 flex-col gap-2 lg:w-3/6">
        <Label htmlFor="companyImage" className="text-muted-foreground">
          Upload Image
          <span className="text-red-500">
            <Asterisk size={10} />
          </span>
        </Label>
        <Input id="companyImage" type="file" onChange={handleImageChange} />
        {errors.companyImage && (
          <p className="text-xs text-red-500 italic">
            {errors.companyImage.message}
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
        {...register("companyImage")}
        value={watch("companyImage")}
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
          ) : experiance ? (
            "Update"
          ) : (
            "Create"
          )}
        </Button>
      </div>
    </form>
  );
}

export default ExperianceForm;
