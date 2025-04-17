import { getAllSkills } from "@/actions/skill";
import ProjectForm from "@/components/admin/project/ProjectForm";
import React from "react";

async function FormPage() {
  const techstacks = await getAllSkills();
  return <ProjectForm data={techstacks} />;
}

export default FormPage;
