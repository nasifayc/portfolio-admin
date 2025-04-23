import { getProjects } from "@/actions/project";
import dynamic from "next/dynamic";
const PortfolioProjectsCard = dynamic(() => import("./PortfolioProjectsCard"));

async function PortfolioProjectsSection() {
  const response = await getProjects();
  if (response.errorMessage) {
    return null;
  }
  return <PortfolioProjectsCard data={response} />;
}

export default PortfolioProjectsSection;
