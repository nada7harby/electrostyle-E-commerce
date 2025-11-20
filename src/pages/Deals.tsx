import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Tag } from "lucide-react";

const Deals = () => {
  const dealsProducts = products.filter(product => product.originalPrice);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Special Deals</h1>
          </div>
          <p className="text-muted-foreground">Don't miss out on our limited-time offers and discounts</p>
          <div className="mt-4 inline-block bg-primary/10 text-primary px-4 py-2 rounded-full">
            <span className="font-semibold">{dealsProducts.length} Products</span> on sale
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dealsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {dealsProducts.length === 0 && (
          <div className="text-center py-16">
            <Tag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No deals available</h3>
            <p className="text-muted-foreground">Check back soon for new special offers!</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Deals;
