export const dynamic = "force-dynamic";

import { getProjects } from "@/actions/project";
import dynamic2 from "next/dynamic";
const PortfolioProjectsCard = dynamic2(() => import("./PortfolioProjectsCard"));

async function PortfolioProjectsSection() {
  const response = await getProjects();
  if (response.errorMessage) {
    return <p>Projects Loading...</p>;
  }
  return <PortfolioProjectsCard data={response} />;
}

export default PortfolioProjectsSection;
