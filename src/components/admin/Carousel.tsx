import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import {
  Database,
  DatabaseBackup,
  Laptop,
  Network,
  Server,
  Smartphone,
} from "lucide-react";

type Props = {
  projectsByTag: Record<string, number>;
};
const tagIcons = {
  mobile: Smartphone,
  frontend: Laptop,
  backend: Database,
  saas: Network,
  baas: DatabaseBackup,
  default: Server,
};

function CarouselSection({ projectsByTag }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-muted-foreground text-xl font-medium">
        Framework Used
      </h3>
      <Carousel className="w-4/6 self-center">
        <CarouselContent>
          {Object.entries(projectsByTag).map(([tag, count]) => (
            <CarouselItem
              key={tag}
              className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4"
            >
              <TagCard tag={tag} count={count} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}

function TagCard({ tag, count }: { tag: string; count: number }) {
  const Icon = tagIcons[tag as keyof typeof tagIcons] || tagIcons.default;

  return (
    <Card className="h-40 cursor-pointer rounded-sm p-0">
      <CardContent className="flex flex-col items-start gap-4 p-4">
        <div className="flex w-full items-start justify-between gap-2">
          <div className="bg-muted inline-block rounded-sm p-2">
            <Icon size={20} />
          </div>
          <h3 className="text-lg capitalize">{tag}</h3>
        </div>
        <p className="self-center text-2xl font-extrabold">{count}</p>
      </CardContent>
    </Card>
  );
}

export default CarouselSection;
