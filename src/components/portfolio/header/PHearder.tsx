"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { motion, useMotionValue, animate } from "framer-motion";
import {
  Home,
  TypeOutline,
  Github,
  Linkedin,
  Send,
  Sun,
  Moon,
  Mail,
  Twitter,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const NAV_ITEMS = [
  { name: "Home", href: "/", icon: Home, external: false },
  {
    name: "Telegram",
    href: "https://t.me/Nasi_c",
    icon: Send,
    external: true,
  },
  {
    name: "GitHub",
    href: "https://github.com/nasifayc",
    icon: Github,
    external: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/nasifay-chala-810844282/?lipi=urn%3ali%3apage%3ad_flagship3_profile_view_base_contact_details%3b7bvdsgy0syo4duj4bgen8g%3d%3d",
    icon: Linkedin,
    external: true,
  },
  {
    name: "Email",
    href: "mailto:nasifayc11@gmail.com",
    icon: Mail,
    external: true,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/nasifay_c",
    icon: Twitter,
    external: true,
  },
];

function NavigationHeader() {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      fetch("/api/track", { method: "POST" });
    }
  }, []);
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [isContainerHovered, setIsContainerHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2 transform bg-transparent"
    >
      <motion.div
        ref={containerRef}
        onMouseEnter={() => setIsContainerHovered(true)}
        onMouseLeave={() => setIsContainerHovered(false)}
        animate={{
          gap: isContainerHovered ? "0.75rem" : "0.1rem",
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="dark:bg-background/40 relative flex items-center justify-center rounded-full border px-3 py-2 shadow-sm backdrop-blur-sm"
      >
        {NAV_ITEMS.map((item, index) => (
          <div
            key={item.name}
            className="flex items-center bg-transparent"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <motion.div
              animate={{
                paddingLeft: hoveredIndex === index ? "0.75rem" : "0.1rem",
                paddingRight: hoveredIndex === index ? "0.75rem" : "0.1rem",
              }}
              whileHover={{ scale: 1.4 }}
              transition={{ type: "spring", stiffness: 100, damping: 10 }}
            >
              <NavItem
                href={item.href}
                icon={item.icon}
                name={item.name}
                active={pathname === item.href}
                external={item.external}
              />
            </motion.div>
            {index === 0 && (
              <div className="bg-muted-foreground mx-1 h-6 w-px rounded-full"></div>
            )}
          </div>
        ))}

        <div className="bg-muted-foreground mx-1 h-6 w-px rounded-full"></div>

        <div
          onMouseEnter={() => setHoveredIndex(NAV_ITEMS.length)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <motion.div
            animate={{
              paddingLeft:
                hoveredIndex === NAV_ITEMS.length ? "0.75rem" : "0.5rem",
              paddingRight:
                hoveredIndex === NAV_ITEMS.length ? "0.75rem" : "0.5rem",
            }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-accent relative cursor-pointer rounded-full"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

export default NavigationHeader;

function NavItem({
  href,
  icon: Icon,
  external,
  active,
  name,
}: {
  href: string;
  name: string;
  icon: React.ElementType;
  external?: boolean;
  active?: boolean;
}) {
  const className = `inline-flex h-9 w-9 items-center justify-center rounded-full text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring ${
    active ? "bg-accent text-accent-foreground" : ""
  }`;

  const content = <Icon className="h-4 w-4" />;

  if (external) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            {" "}
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={className}
              aria-label={href}
            >
              {content}
            </a>
          </TooltipTrigger>
          <TooltipContent>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link href={href} className={className} aria-label={href}>
            {content}
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>{name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
