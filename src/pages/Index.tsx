import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "@/components/Hero";
import { ProductCard } from "@/components/ProductCard";
import { CategoryCard } from "@/components/CategoryCard";
import { products, categories } from "@/data/products";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star, Package, Truck, HeadphonesIcon } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const Index = () => {
  const featuredProducts = products.filter((p) => p.isFeatured);
  const newArrivals = products.filter((p) => p.isNew);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <section className="border-y border-border bg-muted/30">
          <div className="container mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Truck className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Free Shipping</h3>
                  <p className="text-sm text-muted-foreground">On orders over $500</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Easy Returns</h3>
                  <p className="text-sm text-muted-foreground">30-day return policy</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <HeadphonesIcon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">24/7 Support</h3>
                  <p className="text-sm text-muted-foreground">Always here to help</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Star className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Premium Quality</h3>
                  <p className="text-sm text-muted-foreground">Top-rated products</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <span className="inline-block text-sm font-semibold text-primary mb-3">BROWSE CATEGORIES</span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Shop by Category</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of premium electronic appliances
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div 
                key={category.name}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CategoryCard {...category} />
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
          <div className="container mx-auto px-4 py-20">
            <div className="flex items-center justify-between mb-12">
              <div>
                <span className="inline-block text-sm font-semibold text-primary mb-3">BEST SELLERS</span>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">Featured Products</h2>
                <p className="text-lg text-muted-foreground">Handpicked deals on top-rated appliances</p>
              </div>
              <NavLink to="/products">
                <Button className="hidden md:flex bg-primary text-primary-foreground hover:bg-primary-hover group shadow-lg shadow-primary/20">
                  View All Products
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </NavLink>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="flex items-center justify-between mb-12">
            <div>
              <span className="inline-block text-sm font-semibold text-primary mb-3">JUST ARRIVED</span>
              <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3">New Arrivals</h2>
              <p className="text-lg text-muted-foreground">Check out the latest additions to our collection</p>
            </div>
            <NavLink to="/products">
              <Button variant="outline" className="hidden md:flex border-2 border-primary text-primary hover:bg-primary/5 group">
                Explore New Products
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </Button>
            </NavLink>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary to-primary-hover text-primary-foreground py-20 mt-8">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl" />
          </div>
          
          <div className="container mx-auto px-4 text-center relative z-10">
            <div className="max-w-3xl mx-auto">
              <span className="inline-block text-sm font-semibold mb-4 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                EXCLUSIVE OFFER
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Upgrade Your Home?</h2>
              <p className="text-lg md:text-xl mb-10 text-primary-foreground/90 leading-relaxed">
                Join 50,000+ happy customers and get exclusive deals, early access to new products, and expert home appliance tips.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 rounded-xl text-foreground border-0 shadow-lg"
                />
                <Button
                  size="lg"
                  className="bg-background text-foreground hover:bg-background/90 shadow-lg px-8 hover-scale"
                >
                  Subscribe Now
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
