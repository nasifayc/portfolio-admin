import { getExperienceById } from "@/actions/experiance";
import ExperianceForm from "@/components/admin/experiance/ExperianceForm";

async function UpdateExperiencePage({ params }: { params: { slug: string } }) {
  const { experience } = await getExperienceById(params.slug);
  return <ExperianceForm experiance={experience} />;
}

export default UpdateExperiencePage;
