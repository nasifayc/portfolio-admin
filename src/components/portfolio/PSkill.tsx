export const dynamic = "force-dynamic";

import { getAllSkills } from "@/actions/skill";
import dynamic2 from "next/dynamic";
const PSkillCard = dynamic2(() => import("./PSkillCard"));

async function PSkill() {
  const skills = await getAllSkills();

  if (skills.errorMessage) {
    return <p className="py-5">Skill Loading...</p>;
  }

  return <PSkillCard data={skills} />;
}

export default PSkill;
