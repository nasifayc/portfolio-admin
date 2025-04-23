import { getAllSkills } from "@/actions/skill";
import dynamic from "next/dynamic";
const PSkillCard = dynamic(() => import("./PSkillCard"));

async function PSkill() {
  const skills = await getAllSkills();

  if (skills.errorMessage) {
    return null;
  }

  return <PSkillCard data={skills} />;
}

export default PSkill;
