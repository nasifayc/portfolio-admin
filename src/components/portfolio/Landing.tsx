import About from "./About";
import NavigationHeader from "./header/PHearder";
import PSkill from "./PSkill";
import Hero from "./Hero";
import WorkExperience from "./WorkExp";
import Education from "./Education";
import PortfolioProjectsSection from "./PortfolioProjectsSection";

function Landing() {
  return (
    <div className="container mx-auto h-full max-w-2xl px-4">
      <NavigationHeader />
      <main className="flex flex-col gap-8 pt-30">
        <Hero />
        {/* About Section */}
        <About />
        {/* Skills Section */}
        <PSkill />
        <WorkExperience />
        <Education />
        {/* Projects Section */}
        <PortfolioProjectsSection />

        {/* Contact Section */}
        <section className="py-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">Let's Connect</h2>
          <p className="text-muted-foreground mx-auto mb-8 max-w-2xl text-lg">
            I'm currently looking for new opportunities. Whether you have a
            question or just want to say hi, I'll get back to you!
          </p>
          <button className="border-primary text-primary hover:bg-primary/10 rounded-lg border px-6 py-3 font-medium transition-colors">
            Contact Me
          </button>
        </section>
      </main>

      <footer className="text-muted-foreground py-8 text-center text-sm">
        © {new Date().getFullYear()} John Doe. All rights reserved.
      </footer>
    </div>
  );
}

export default Landing;
