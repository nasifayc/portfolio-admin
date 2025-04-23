"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

function Education() {
  const secRef = useRef(null);
  const isInView = useInView(secRef, { once: true, amount: 0.3 });
  return (
    <section ref={secRef}>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 10,
          delay: 0.5,
        }}
        className="flex flex-col items-start gap-4"
      >
        <h2 className="text-2xl font-bold">Education</h2>
        <div className="items-strat flex w-full justify-between">
          <div className="flex gap-2">
            <Image
              src={"/aastu.jpg"}
              alt="AASTU"
              width={50}
              height={50}
              className="shadow-muted-foreground h-14 w-14 rounded-full transition-all hover:scale-105"
            />
            <div className="space-y-0">
              <p>Addis Ababa Science and Technology University</p>
              <span className="text-muted-foreground text-sm">
                Bachelor's of Software Engineering
              </span>
            </div>
          </div>
          <span>2021-2026</span>
        </div>
      </motion.div>
    </section>
  );
}

export default Education;
