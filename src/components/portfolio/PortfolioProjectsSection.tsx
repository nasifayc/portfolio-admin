import { getProjects } from "@/actions/project";
import PortfolioProjectsCard from "./PortfolioProjectsCard";

async function PortfolioProjectsSection() {
  const response = await getProjects();
  return <PortfolioProjectsCard data={response} />;
}

export default PortfolioProjectsSection;
