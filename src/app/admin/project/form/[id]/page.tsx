import { getProjectById } from "@/actions/project";
import { getAllSkills } from "@/actions/skill";
import ProjectForm from "@/components/admin/project/ProjectForm";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

async function FormPage({ params }: Props) {
  if (!params.id) return notFound();
  const techstacks = await getAllSkills();
  const { project } = await getProjectById(params.id);

  return <ProjectForm data={techstacks} project={project} />;
}

export default FormPage;
