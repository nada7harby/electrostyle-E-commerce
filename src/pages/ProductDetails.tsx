import { useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Heart, ShoppingCart, Truck, Shield, RefreshCw } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-2">Product Not Found</h1>
            <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedProducts = products.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    // Add items based on quantity
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-muted-foreground mb-6">
          Home / Products / {product.category} / <span className="text-foreground">{product.name}</span>
        </div>

        {/* Product Details */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div>
            <div className="aspect-square rounded-xl overflow-hidden bg-muted mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-smooth ${
                    selectedImage === i ? "border-primary" : "border-border"
                  }`}
                >
                  <img
                    src={product.image}
                    alt={`${product.name} view ${i + 1}`}
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge className="mb-2 bg-primary text-primary-foreground">{product.category}</Badge>
                <h1 className="text-4xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-muted-foreground">{product.brand}</p>
              </div>
              <Button
                size="icon"
                variant={isFavorite(product.id) ? "default" : "outline"}
                className={`rounded-full transition-all ${
                  isFavorite(product.id)
                    ? "bg-[#006A67] hover:bg-[#005552] text-white"
                    : ""
                }`}
                onClick={() => toggleFavorite(product)}
              >
                <Heart
                  className={`h-5 w-5 transition-all ${
                    isFavorite(product.id) ? "fill-white" : ""
                  }`}
                />
              </Button>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating)
                        ? "fill-primary text-primary"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-bold text-foreground">${product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    ${product.originalPrice}
                  </span>
                  <Badge variant="destructive">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.inStock ? (
                <Badge className="bg-success text-success-foreground">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
            </div>

            {/* Description */}
            <p className="text-muted-foreground mb-6">{product.description}</p>

            {/* Quantity and Add to Cart */}
            <div className="flex gap-4 mb-8">
              <div className="flex items-center border border-border rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4"
                >
                  -
                </Button>
                <span className="px-4 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4"
                >
                  +
                </Button>
              </div>
              <Button
                size="lg"
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary-hover"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-muted rounded-lg">
              <div className="text-center">
                <Truck className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">2 Year Warranty</p>
              </div>
              <div className="text-center">
                <RefreshCw className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">30-Day Returns</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="specs" className="mb-16">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="specs">Specifications</TabsTrigger>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Technical Specifications</h3>
              <dl className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="border-b border-border pb-3">
                    <dt className="text-sm text-muted-foreground mb-1">{key}</dt>
                    <dd className="font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </TabsContent>

          <TabsContent value="description" className="mt-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <p className="text-muted-foreground">Customer reviews coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetails;
