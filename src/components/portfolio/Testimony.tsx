"use client";

import { motion, useInView } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import React, { useRef } from "react";

function Testimony() {
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
        className="mx-auto flex flex-col items-center justify-center gap-4 p-6"
      >
        <div>-- Testimonies --</div>
        <h1 className="pb-5 text-2xl font-bold">Words from Collaborators</h1>
        <div className="relative py-10">
          <Quote className="text-muted-foreground absolute -top-4 -left-4 h-3 w-3 -scale-x-100" />
          <h2 className="text-muted-foreground text-md px-6 leading-relaxed">
            As his product manager, I saw Nasifay working seamlessly with the
            diverse team of developers, fostering a culture of efficiency and
            support. In doing so, he accelerated project timelines and also
            elevated our collective performance. . .
          </h2>
          <Quote className="text-muted-foreground absolute -right-4 -bottom-4 h-3 w-3" />
        </div>

        <div className="self-start">
          <div className="flex items-center gap-4">
            <a
              href="https://www.linkedin.com/in/anteneh-yimmam0?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3BO7mpGCj2TSSX%2By2UGsep7w%3D%3D"
              target="_blank"
            >
              <Image
                src="/anteneh.jpg"
                alt="Testifier Profile"
                width={56}
                height={56}
                className="rounded-full shadow-md transition-transform hover:scale-105"
              />
            </a>

            <div>
              <p className="font-medium">Anteneh Yimmam</p>
              <span className="text-muted-foreground text-sm">
                Education Lead @Ethioware EdTech Initiative
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

export default Testimony;
