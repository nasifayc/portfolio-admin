import { getProjectById } from "@/actions/project";
import { getAllSkills } from "@/actions/skill";
import ProjectForm from "@/components/admin/project/ProjectForm";

async function FormPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const techstacks = await getAllSkills();
  const { project } = await getProjectById(id);

  return <ProjectForm data={techstacks} project={project} />;
}

export default FormPage;
