import { getProjectById } from "@/actions/project";
import { getAllSkills } from "@/actions/skill";
import ProjectForm from "@/components/admin/project/ProjectForm";

async function FormPage({ params }: { params: { id: string } }) {
  const techstacks = await getAllSkills();
  const { project } = await getProjectById(params.id);

  return <ProjectForm data={techstacks} project={project} />;
}

export default FormPage;
