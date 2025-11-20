import React, { createContext, useContext, useEffect, useReducer } from "react";
import { Product } from "@/data/products";
import { cartReducer, initialCartState, CartItem } from "./cartReducer";
import { toast } from "@/hooks/use-toast";

interface CartContextType {
  items: CartItem[];
  cartCount: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  increaseQty: (productId: string) => void;
  decreaseQty: (productId: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItems: () => CartItem[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "electrostyle_cart";

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch({ type: "LOAD_CART", payload: parsedCart });
      } catch (error) {
        console.error("Failed to load cart from localStorage", error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product) => {
    if (!product.inStock) {
      toast({
        title: "Out of Stock",
        description: `${product.name} is currently out of stock.`,
        variant: "destructive",
      });
      return;
    }

    const existingItem = state.items.find((item) => item.id === product.id);
    const maxStock = 99;

    if (existingItem && existingItem.quantity >= maxStock) {
      toast({
        title: "Stock Limit Reached",
        description: `Cannot add more ${product.name} to cart.`,
        variant: "destructive",
      });
      return;
    }

    dispatch({ type: "ADD_TO_CART", payload: product });

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      className: "bg-[#006A67] text-white",
    });
  };

  const removeFromCart = (productId: string) => {
    const item = state.items.find((item) => item.id === productId);
    dispatch({ type: "REMOVE_FROM_CART", payload: productId });

    if (item) {
      toast({
        title: "Removed from Cart",
        description: `${item.name} has been removed from your cart.`,
      });
    }
  };

  const increaseQty = (productId: string) => {
    const item = state.items.find((item) => item.id === productId);
    const maxStock = item?.stock || 99;

    if (item && item.quantity >= maxStock) {
      toast({
        title: "Stock Limit Reached",
        description: `Cannot add more ${item.name} to cart.`,
        variant: "destructive",
      });
      return;
    }

    dispatch({ type: "INCREASE_QTY", payload: productId });

    if (item) {
      toast({
        title: "Quantity Updated",
        description: `${item.name} quantity increased.`,
      });
    }
  };

  const decreaseQty = (productId: string) => {
    const item = state.items.find((item) => item.id === productId);
    dispatch({ type: "DECREASE_QTY", payload: productId });

    if (item) {
      toast({
        title: "Quantity Updated",
        description: `${item.name} quantity decreased.`,
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });

    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItems = () => {
    return state.items;
  };

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        cartCount: state.cartCount,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        getCartTotal,
        getCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
