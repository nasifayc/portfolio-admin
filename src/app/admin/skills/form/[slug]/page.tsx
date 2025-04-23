import { getSkillById } from "@/actions/skill";
import TechStackForm from "@/components/admin/techstack/TechStackForm";

async function SkillEditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { skill } = await getSkillById(slug);
  return <TechStackForm skill={skill} />;
}

export default SkillEditPage;
