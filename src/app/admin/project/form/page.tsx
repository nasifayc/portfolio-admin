import { getAllSkills } from "@/actions/skill";
import ProjectForm from "@/components/admin/project/ProjectForm";

async function FormPage() {
  const techstacks = await getAllSkills();

  return <ProjectForm data={techstacks} />;
}

export default FormPage;
