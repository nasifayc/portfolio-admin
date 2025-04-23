"use client";
import { Github, Linkedin, Twitter, Instagram, Mail, Send } from "lucide-react";

import { motion, useInView } from "framer-motion";

import { ElementType, useRef } from "react";

function ContactSection() {
  const SOCIAL_ITEMS = [
    {
      name: "Telegram",
      link: "https://t.me/Nasi_c",
      icon: Send,
      color: "text-sky-400",
    },
    {
      name: "Email",
      link: "mailto:nasifayc11@gmail.com",
      icon: Mail,
      color: "text-red-400",
    },
    {
      name: "GitHub",
      link: "https://github.com/nasifayc",
      icon: Github,
      color: "text-green-400",
    },
    {
      name: "LinkedIn",
      link: "https://www.linkedin.com/in/nasifay-chala-810844282?lipi=urn%3Ali%3Apage%3Ad_flagship3_profile_view_base_contact_details%3B%2F0Kvo4f0R6uNAVEzDGahMg%3D%3D",
      icon: Linkedin,
      color: "text-blue-400",
    },
    {
      name: "Twitter",
      link: "https://twitter.com/nasifay_c",
      icon: Twitter,
      color: "text-blue-400",
    },
  ];
  const secRef = useRef(null);
  const isInView = useInView(secRef, { once: true, amount: 0.3 });
  return (
    <section ref={secRef}>
      <motion.div
        initial={{ opacity: 0, x: 150 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{
          type: "spring",
          stiffness: 30,
          damping: 10,
          delay: 0.5,
        }}
        className="flex flex-col items-center gap-2"
      >
        <div>-- Contact --</div>
        <h1 className="text-3xl font-bold">Get in Touch</h1>
        <p className="text-muted-foreground mx-auto max-w-2xl px-8 text-lg">
          Got something on your mind?{" "}
          <span className="text-amber-500">Message me directly</span>, I’m
          always down to chat.
        </p>
        <div className="flex gap-4 py-10">
          {SOCIAL_ITEMS.map((social) => (
            <SocialLink
              key={social.name}
              link={social.link}
              icon={social.icon}
              color={social.color}
              name={social.name}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export default ContactSection;

type contactProps = {
  link: string;
  icon: ElementType;
  color: string;
  name: string;
};

function SocialLink({ link, icon: Icon, color, name }: contactProps) {
  return (
    <a href={link} target="blank" rel="noopener noreferrer" aria-label={name}>
      <Icon
        className={`h-5 w-5 grayscale filter transition-all duration-100 hover:scale-125 hover:grayscale-0 ${color}`}
      />
    </a>
  );
}
