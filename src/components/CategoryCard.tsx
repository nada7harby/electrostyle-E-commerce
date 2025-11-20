import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface CategoryCardProps {
  name: string;
  image: string;
  count: number;
}

export const CategoryCard = ({ name, image, count }: CategoryCardProps) => {
  return (
    <Card className="group relative overflow-hidden hover-lift border-border cursor-pointer">
      <div className="aspect-square relative">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-2xl font-semibold mb-1">{name}</h3>
          <p className="text-sm text-white/90 mb-3">{count} products</p>
          <div className="flex items-center text-sm font-medium group-hover:translate-x-1 transition-smooth">
            Shop Now <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </div>
      </div>
    </Card>
  );
};
