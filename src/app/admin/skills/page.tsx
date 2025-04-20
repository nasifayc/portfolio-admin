import { getAllSkills } from "@/actions/skill";
import TechStackList from "@/components/admin/techstack/TechStackList";

async function SkillsPage() {
  const response = await getAllSkills();
  return <TechStackList data={response} />;
}

export default SkillsPage;
