import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { useFavorites } from "@/context/FavoritesContext";
import { Heart, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/NavLink";

const Favorites = () => {
  const { favorites, favoritesCount } = useFavorites();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          Home / <span className="text-foreground">Favorites</span>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="bg-[#006A67]/10 rounded-full p-3">
              <Heart className="h-6 w-6 text-[#006A67] fill-[#006A67]" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">My Favorites</h1>
              <p className="text-muted-foreground">
                {favoritesCount} {favoritesCount === 1 ? "item" : "items"} in your wishlist
              </p>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {favorites.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-16">
            <div className="bg-muted/50 rounded-full p-8 w-fit mx-auto mb-6">
              <Heart className="h-24 w-24 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Your Wishlist is Empty
            </h2>
            <p className="text-muted-foreground mb-8">
              Start adding products to your favorites by clicking the heart icon on any product.
            </p>
            <NavLink to="/products">
              <Button
                size="lg"
                className="bg-[#006A67] text-white hover:bg-[#005552]"
              >
                <ShoppingBag className="mr-2 h-5 w-5" />
                Browse Products
              </Button>
            </NavLink>
          </div>
        ) : (
          <>
            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {favorites.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 bg-gradient-to-r from-[#006A67]/10 to-[#006A67]/5 rounded-lg p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-3">
                Ready to Shop?
              </h3>
              <p className="text-muted-foreground mb-6">
                Explore more amazing products and add them to your cart
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <NavLink to="/products">
                  <Button variant="outline" size="lg">
                    Continue Shopping
                  </Button>
                </NavLink>
                <NavLink to="/cart">
                  <Button
                    size="lg"
                    className="bg-[#006A67] text-white hover:bg-[#005552]"
                  >
                    View Cart
                  </Button>
                </NavLink>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Favorites;
