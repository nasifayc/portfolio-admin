import { getExperiences } from "@/actions/experiance";
import WorkExpCard from "./WorkExpCard";

async function WorkExp() {
  const response = await getExperiences();
  return <WorkExpCard data={response} />;
}

export default WorkExp;
