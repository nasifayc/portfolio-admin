"use client";

import { useEffect, useRef, useState } from "react";
import { ProjectProps } from "../admin/project/ProjectList";
import { toast } from "sonner";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { Code, Github } from "lucide-react";

type Props = {
  data: {
    errorMessage: string | null;
    projects?: ProjectProps[];
  };
};

function PortfolioProjectsCard({ data }: Props) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
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

  if (data.errorMessage) return null;

  return (
    <section ref={sectionRef} className="space-y-20">
      <motion.div
        initial={{ opacity: 0, x: -150 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 10,
        }}
        className="flex flex-col items-center"
      >
        <h2 className="pt-10 text-4xl font-bold">
          Checkout My Latest <span className="text-amber-500">Projects</span>
        </h2>
        <h3 className="text-muted-foreground">
          A Glimpse into My Creative and Technical Works
        </h3>
      </motion.div>
      <div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
        style={{ gridAutoFlow: "dense" }}
      >
        {data.projects?.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, x: 150 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{
              type: "spring",
              stiffness: 30,
              damping: 10,
              delay: 0.5 * index,
            }}
          >
            <ProjectDetailCard project={project} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectDetailCard({ project }: { project: ProjectProps }) {
  return (
    <Card className="bg-background group/item flex h-full flex-col rounded-sm p-0 shadow-xs shadow-zinc-300 transition-all duration-300 hover:scale-105 hover:shadow-md dark:shadow-zinc-600">
      <CardContent className="flex h-full flex-col p-0">
        <a
          href={project.liveDemo}
          target="_blank"
          className="block flex-shrink-0"
        >
          <Image
            src={project.imageUrl}
            alt="Project Image"
            className="h-44 w-full rounded-t-sm object-cover grayscale filter transition-all duration-300 group-hover/item:grayscale-0"
            width={400}
            height={400}
          />
        </a>

        <div className="flex flex-1 flex-col gap-2 p-2">
          <h2 className="font-semibold">{project.title}</h2>
          <span className="text-muted-foreground line-clamp-2 text-xs">
            {project.description}
          </span>
          <div className="flex flex-wrap items-center gap-1 py-2">
            {project.techStack.map((tech) => (
              <div
                key={tech.name}
                className="bg-muted flex items-center justify-between gap-1.5 rounded-sm px-2 py-1 text-[10px] sm:text-xs"
              >
                <Image
                  src={tech.imageUrl}
                  alt="Tech Image"
                  width={20}
                  height={20}
                  className="h-3 w-3 rounded-full"
                />
                <p className="text-xs">{tech.name}</p>
              </div>
            ))}
          </div>
          <div className="mt-auto flex flex-wrap gap-2">
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-primary text-background flex items-center gap-2 rounded-md px-3 py-2 text-xs transition-all duration-300 hover:bg-gray-500">
                <Github size={12} />
                <span>Source Code</span>
              </div>
            </a>
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="bg-primary text-background flex items-center gap-2 rounded-md px-3 py-2 text-xs transition-all duration-300 hover:bg-gray-500">
                <Code size={12} />
                <span>View Live</span>
              </div>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default PortfolioProjectsCard;
