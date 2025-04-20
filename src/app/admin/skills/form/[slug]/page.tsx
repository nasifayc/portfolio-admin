import { getSkillById } from "@/actions/skill";
import TechStackForm from "@/components/admin/techstack/TechStackForm";

async function SkillEditPage({ params }: { params: { slug: string } }) {
  const { skill } = await getSkillById(params.slug);
  return <TechStackForm skill={skill} />;
}

export default SkillEditPage;
