export const dynamic = "force-dynamic";

import { getExperiences } from "@/actions/experiance";
import dynamic2 from "next/dynamic";
const WorkExpCard = dynamic2(() => import("./WorkExpCard"));

async function WorkExp() {
  const response = await getExperiences();
  if (response.errorMessage) {
    return <p className="py-5">Work Experience Loading...</p>;
  }
  return <WorkExpCard data={response} />;
}

export default WorkExp;
