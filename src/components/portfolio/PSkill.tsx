import { getAllSkills } from "@/actions/skill";

async function PSkill() {
  const skills = await getAllSkills();
  return (
    <section>
      <h2 className="text-2xl font-bold">Skills</h2>
      <div className="mx-auto flex max-w-2xl flex-wrap justify-center gap-4">
        {[
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Node.js",
          "Figma",
        ].map((skill) => (
          <span
            key={skill}
            className="bg-secondary text-secondary-foreground rounded-lg px-4 py-2"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
}

export default PSkill;
