"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

function Hero() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 10,
          delay: 0.2,
        }}
        className="flex items-center justify-between"
      >
        <div className="flex flex-col">
          <h2 className="mb-4 text-5xl font-bold">
            Hi, I'm <span className="text-primary">Nasifay 👋</span>
          </h2>
          <h3 className="text-muted-foreground mb-8 text-xl">
            <span className="text-2xl text-amber-500">
              <Typewriter
                words={[
                  "Full Stack Developer",
                  "Flutter Expert",
                  "Backend Developer",
                ]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={80}
                deleteSpeed={50}
                delaySpeed={1500}
              />
            </span>
          </h3>
        </div>

        <Image
          src="/nasipic.jpg"
          width={100}
          height={100}
          className="h-36 w-36 shrink-0 rounded-full object-cover"
          alt="User Image"
        />
      </motion.div>
    </section>
  );
}

export default Hero;
