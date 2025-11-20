import { ShoppingCart, Search, Menu, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";

export const Navbar = () => {
  const { cartCount } = useCart();
  const { favoritesCount } = useFavorites();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-xl font-bold text-primary-foreground">E</span>
            </div>
            <span className="text-xl font-bold text-foreground hidden sm:inline">ElectroShop</span>
          </NavLink>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
              activeClassName="text-primary"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
              activeClassName="text-primary"
            >
              Products
            </NavLink>
            <NavLink
              to="/categories"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
              activeClassName="text-primary"
            >
              Categories
            </NavLink>
            <NavLink
              to="/deals"
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
              activeClassName="text-primary"
            >
              Deals
            </NavLink>
          </nav>

          {/* Search Bar - Hidden on mobile */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search for products..."
                className="pl-10 w-full"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <NavLink to="/favorites">
              <Button variant="ghost" size="icon" className="hidden md:flex relative">
                <Heart className="h-5 w-5" />
                {favoritesCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-[#006A67] text-white">
                    {favoritesCount}
                  </Badge>
                )}
              </Button>
            </NavLink>
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
            </Button>
            <NavLink to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </NavLink>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 w-full"
              />
            </div>
            <NavLink
              to="/"
              className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              activeClassName="bg-accent text-accent-foreground"
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              activeClassName="bg-accent text-accent-foreground"
            >
              Products
            </NavLink>
            <NavLink
              to="/categories"
              className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              activeClassName="bg-accent text-accent-foreground"
            >
              Categories
            </NavLink>
            <NavLink
              to="/deals"
              className="block px-4 py-2 text-sm font-medium rounded-md hover:bg-accent"
              activeClassName="bg-accent text-accent-foreground"
            >
              Deals
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
};
