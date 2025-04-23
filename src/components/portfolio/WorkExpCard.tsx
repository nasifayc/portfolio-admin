"use client";
import { useEffect, useRef, useState } from "react";
import { ExperienceProps } from "../admin/experiance/ExperianceList";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import { Sparkle } from "lucide-react";

type Props = {
  data: {
    errorMessage: string | null;
    experiences?: ExperienceProps[];
  };
};

function WorkExpCard({ data }: Props) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [localExperiences, setLocalExperiences] = useState(
    data.experiences ?? [],
  );

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

  if (data.errorMessage) return null;

  return (
    <section ref={sectionRef} className="flex flex-col items-start">
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 10,
        }}
      >
        <h2 className="text-2xl font-bold">Work Expereince</h2>
        <div className="pl-10">
          <div className="h-7 border-l border-dashed border-gray-400"></div>
        </div>
      </motion.div>
      {localExperiences.map((exp, index) => (
        <motion.div
          key={exp.id}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            type: "spring",
            stiffness: 30,
            damping: 10,
            delay: 0.9 * index,
          }}
        >
          <div className="w-fit cursor-pointer rounded-full border border-gray-400 px-3 py-1 text-xs transition-all duration-300 hover:scale-110">
            {`${format(new Date(exp.startingDate), "MMM yyy")} - ${exp.stillWorking ? "Present" : format(new Date(exp.endDate ?? Date.now()), "MMM yyy")}`}
          </div>

          <div className="pl-10">
            <div className="flex w-full flex-col gap-4 border-l border-gray-400 px-5 py-6">
              <div className="flex gap-2">
                <a href="#">
                  <Image
                    src={exp.companyImage}
                    alt="Company Logo"
                    width={24}
                    height={24}
                    className="h-8 w-8 rounded-full transition-all hover:scale-110"
                  />
                </a>
                <span className="font-bold">{exp.companyName}</span>
              </div>

              <div className="text-muted-foreground text-sm">
                {exp.role[0] ?? "Software Intern"}
              </div>

              <div>
                <p className="text-sm">{exp.description}</p>
              </div>
              <ExperienceBulletPoint roleData={exp.role.slice(1)} />
            </div>
          </div>
        </motion.div>
      ))}
    </section>
  );
}

const ExperienceBulletPoint = ({ roleData }: { roleData: string[] }) => {
  return (
    <div className="flex flex-col items-start gap-2">
      {roleData.map((role) => (
        <div key={role} className="flex items-center gap-2">
          <div className="text-amber-500">
            <Sparkle size={12} />
          </div>
          <span className="text-sm">{role}</span>
        </div>
      ))}
    </div>
  );
};

export default WorkExpCard;
