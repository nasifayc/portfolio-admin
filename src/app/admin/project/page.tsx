import { getProjects } from "@/actions/project";
import ProjectList from "@/components/admin/ProjectList";

async function ProjectPage() {
  const response = await getProjects();
  return <ProjectList data={response} />;
}

export default ProjectPage;
