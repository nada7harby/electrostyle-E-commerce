import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CategoryCard } from "@/components/CategoryCard";
import { categories } from "@/data/products";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Shop by Category</h1>
          <p className="text-muted-foreground">Browse our full range of electronic appliances</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              onClick={() => navigate(`/products?category=${encodeURIComponent(category.name)}`)}
            >
              <CategoryCard
                name={category.name}
                image={category.image}
                count={category.count}
              />
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
