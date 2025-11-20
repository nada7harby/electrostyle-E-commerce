import { Star, ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/data/products";
import { NavLink } from "@/components/NavLink";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Card className="group overflow-hidden hover-lift border-border">
      <div className="relative aspect-square overflow-hidden bg-muted">
        <NavLink to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-smooth group-hover:scale-105"
          />
        </NavLink>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive">-{discount}%</Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary">Out of Stock</Badge>
          )}
        </div>

        {/* Quick Actions - Heart Button for Favorites */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            className={`h-9 w-9 rounded-full shadow-lg transition-all ${
              isProductFavorite
                ? "opacity-100 bg-[#006A67] hover:bg-[#005552]"
                : "opacity-0 group-hover:opacity-100"
            }`}
            onClick={(e) => {
              e.preventDefault();
              toggleFavorite(product);
            }}
          >
            <Heart
              className={`h-4 w-4 transition-all ${
                isProductFavorite ? "fill-white text-white" : "text-foreground"
              }`}
            />
          </Button>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">{product.category}</p>
          <NavLink to={`/product/${product.id}`}>
            <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-smooth">
              {product.name}
            </h3>
          </NavLink>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${
                  i < Math.floor(product.rating)
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({product.reviews})</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-2xl font-bold text-foreground">${product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${product.originalPrice}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary-hover"
          disabled={!product.inStock}
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardContent>
    </Card>
  );
};
