"use client";
import { useEffect, useState } from "react";
import { SkillProps } from "../admin/techstack/TechStackList";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  data: {
    errorMessage: string | null;
    skills?: SkillProps[];
  };
};

function PSkillCard({ data }: Props) {
  const [localSkills, setLocalSkills] = useState(data.skills ?? []);
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

  if (data.errorMessage) return null;

  return (
    <section className="flex flex-col items-start gap-4">
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 10,
          delay: 0.5,
        }}
      >
        <h2 className="text-2xl font-bold">Skills</h2>{" "}
      </motion.div>
      <div className="mx-auto flex flex-wrap gap-1 gap-y-1">
        {localSkills?.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, x: -150 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 10,
              delay: 0.6 + index / 8,
            }}
          >
            <div className="bg-primary text-secondary transtion-all flex cursor-pointer items-center justify-center gap-3 rounded-sm px-4 py-2 text-xs duration-300 hover:scale-105">
              <Image
                src={skill.imageUrl}
                alt={skill.name}
                width={10}
                height={10}
                className="h-4 w-4 rounded-full object-cover"
              />
              {skill.name}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default PSkillCard;
