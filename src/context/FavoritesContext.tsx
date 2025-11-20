import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/data/products";
import { toast } from "@/hooks/use-toast";

interface FavoritesContextType {
  favorites: Product[];
  favoritesCount: number;
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
  toggleFavorite: (product: Product) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = "electrostyle_favorites";

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
    if (savedFavorites) {
      try {
        const parsedFavorites = JSON.parse(savedFavorites);
        setFavorites(parsedFavorites);
      } catch (error) {
        console.error("Failed to load favorites from localStorage", error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  /**
   * Add a product to favorites
   * @param product - The product to add
   */
  const addToFavorites = (product: Product) => {
    // Check if product already exists in favorites
    const existingProduct = favorites.find((fav) => fav.id === product.id);
    
    if (existingProduct) {
      // Product already in favorites, don't add again
      return;
    }

    setFavorites((prev) => [...prev, product]);

    toast({
      title: "Added to Favorites ❤️",
      description: `${product.name} has been added to your wishlist.`,
      className: "bg-[#006A67] text-white",
    });
  };

  /**
   * Remove a product from favorites by ID
   * @param productId - The ID of the product to remove
   */
  const removeFromFavorites = (productId: string) => {
    const product = favorites.find((fav) => fav.id === productId);
    
    setFavorites((prev) => prev.filter((fav) => fav.id !== productId));

    if (product) {
      toast({
        title: "Removed from Favorites",
        description: `${product.name} has been removed from your wishlist.`,
      });
    }
  };

  /**
   * Check if a product is in favorites
   * @param productId - The ID of the product to check
   * @returns true if product is in favorites, false otherwise
   */
  const isFavorite = (productId: string): boolean => {
    return favorites.some((fav) => fav.id === productId);
  };

  /**
   * Toggle a product's favorite status
   * If favorited, remove it. If not favorited, add it.
   * @param product - The product to toggle
   */
  const toggleFavorite = (product: Product) => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  const favoritesCount = favorites.length;

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

/**
 * Custom hook to use the Favorites context
 * Must be used within a FavoritesProvider
 */
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
