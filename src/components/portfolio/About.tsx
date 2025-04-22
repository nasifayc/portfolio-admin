"use client";
import { motion } from "framer-motion";

function About() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: 150 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 10,
          delay: 0.5,
        }}
        className="flex flex-col items-start gap-4"
      >
        <h2 className="text-2xl font-bold">About Me</h2>
        <div className="mx-auto max-w-2xl">
          <p className="text-muted-foreground">
            I am intermidiate full stack developer who enjoys building scalable,
            high-performance applications that deliver real value. I care deeply
            about clean architecture,{" "}
            <span className="text-amber-500">Dart and TypeScript</span>{" "}
            ecosystem, and creating experiences that leave clients and companies
            genuinely satisfied.
          </p>
        </div>
      </motion.div>
    </section>
  );
}

export default About;
