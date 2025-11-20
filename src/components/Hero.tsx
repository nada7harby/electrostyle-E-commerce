import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, Shield, TrendingUp } from "lucide-react";
import { NavLink } from "@/components/NavLink";

export const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-accent/10 backdrop-blur-sm border border-primary/20 rounded-full px-5 py-2">
              <Zap className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-semibold text-primary">New Collection 2024</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold leading-[1.1] text-foreground">
              Transform Your
              <span className="block mt-2 bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                Living Space
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Experience cutting-edge technology with our curated selection of premium appliances. Quality, innovation, and style for modern homes.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <NavLink to="/products">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary-hover hover-scale shadow-lg shadow-primary/20 group">
                  Explore Collection
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-smooth" />
                </Button>
              </NavLink>
              <NavLink to="/deals">
                <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary/5 hover-scale">
                  View Deals
                </Button>
              </NavLink>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">2 Year</div>
                  <div className="text-xs text-muted-foreground">Warranty</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Free</div>
                  <div className="text-xs text-muted-foreground">Delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">50K+</div>
                  <div className="text-xs text-muted-foreground">Customers</div>
                </div>
              </div>
            </div>
          </div>

          {/* Image Grid */}
          <div className="relative animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <div className="grid grid-cols-2 gap-4">
              {/* Large Image */}
              <div className="col-span-2 relative aspect-[16/9] rounded-3xl overflow-hidden group hover-lift shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800&q=80"
                  alt="Premium TV"
                  className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="text-2xl font-bold">4K Smart TVs</div>
                  <div className="text-sm opacity-90">Starting at $1,299</div>
                </div>
              </div>

              {/* Small Images */}
              <div className="relative aspect-square rounded-2xl overflow-hidden group hover-lift shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=400&q=80"
                  alt="Refrigerator"
                  className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-lg font-bold">Refrigerators</div>
                </div>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden group hover-lift shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&q=80"
                  alt="Small Appliances"
                  className="h-full w-full object-cover transition-smooth group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="text-lg font-bold">Kitchen</div>
                </div>
              </div>
            </div>

            {/* Floating Promo Card */}
            <div className="absolute -bottom-6 -left-6 bg-card border-2 border-primary/20 rounded-2xl p-6 shadow-2xl backdrop-blur-sm z-10 hover-scale hidden md:block">
              <div className="flex items-center gap-4">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-2xl">
                  ⚡
                </div>
                <div>
                  <div className="font-bold text-foreground text-lg">Save up to 30%</div>
                  <div className="text-sm text-muted-foreground">Limited time offer</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
