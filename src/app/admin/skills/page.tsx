import { getAllSkills } from "@/actions/skill";
import TechStackList from "@/components/admin/techstack/TechStackList";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

async function SkillsPage() {
  const response = await getAllSkills();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills</CardTitle>
        <CardDescription>Manage Skills</CardDescription>
      </CardHeader>
      <CardContent>
        <TechStackList data={response} />
      </CardContent>
      <CardFooter>
        <Link href="/admin/skills/form">
          <Button variant="outline" className="cursor-pointer">
            Add More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default SkillsPage;
