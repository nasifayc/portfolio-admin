"use client";
import { ModeToggle } from "@/components/shared/DarkModeToggler";
import { useEffect } from "react";

function HomePage() {
  useEffect(() => {
    fetch("/api/track", {
      method: "POST",
    });
  }, []);
  return (
    <div className="h-full">
      <p>Home Page</p>
      <ModeToggle />
    </div>
  );
}

export default HomePage;
