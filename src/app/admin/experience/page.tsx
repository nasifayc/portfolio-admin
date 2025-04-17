import { getExperiences } from "@/actions/experiance";
import ExperianceList from "@/components/admin/experiance/ExperianceList";

async function ExperiencePage() {
  const response = await getExperiences();
  return <ExperianceList data={response} />;
}

export default ExperiencePage;
