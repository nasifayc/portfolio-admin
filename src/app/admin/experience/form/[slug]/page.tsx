import { getExperienceById } from "@/actions/experiance";
import ExperianceForm from "@/components/admin/experiance/ExperianceForm";

// interface Props {
//   params: { slug: string };
// }

export default async function UpdateExperiencePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { experience } = await getExperienceById(slug);
  return <ExperianceForm experiance={experience} />;
}
