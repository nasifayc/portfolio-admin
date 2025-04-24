export const dynamic = "force-dynamic";

import { getExperiences } from "@/actions/experiance";
import dynamic2 from "next/dynamic";
const WorkExpCard = dynamic2(() => import("./WorkExpCard"));

async function WorkExp() {
  const response = await getExperiences();
  if (response.errorMessage) {
    return <h1>No Work Experience</h1>;
  }
  return <WorkExpCard data={response} />;
}

export default WorkExp;
