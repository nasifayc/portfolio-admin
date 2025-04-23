import About from "./About";
import NavigationHeader from "./header/PHearder";
import PSkill from "./PSkill";
import Hero from "./Hero";
import WorkExperience from "./WorkExp";
import Education from "./Education";
import PortfolioProjectsSection from "./PortfolioProjectsSection";
import Testimony from "./Testimony";

import ContactSection from "./Contact";

function Landing() {
  return (
    <div className="container mx-auto h-full max-w-2xl px-4">
      <NavigationHeader />
      <main className="flex flex-col gap-12 pt-30">
        <Hero />

        <About />

        <PSkill />
        <WorkExperience />
        <Education />
        <PortfolioProjectsSection />
        <Testimony />
        <ContactSection />
      </main>
    </div>
  );
}

export default Landing;
