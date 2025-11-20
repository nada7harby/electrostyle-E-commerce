import { Product } from "@/data/products";

export interface CartItem extends Product {
  quantity: number;
  stock?: number;
}

export interface CartState {
  items: CartItem[];
  cartCount: number;
}

export type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "INCREASE_QTY"; payload: string }
  | { type: "DECREASE_QTY"; payload: string }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

export const initialCartState: CartState = {
  items: [],
  cartCount: 0,
};

export const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      let newItems: CartItem[];

      if (existingItemIndex > -1) {
        // Item already exists, increase quantity
        const existingItem = state.items[existingItemIndex];
        const maxStock = action.payload.inStock ? 99 : 0; // Default max stock to 99 if in stock
        
        if (existingItem.quantity >= maxStock) {
          // Don't add if at max stock
          return state;
        }

        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item, add to cart
        if (!action.payload.inStock) {
          return state;
        }

        newItems = [
          ...state.items,
          {
            ...action.payload,
            quantity: 1,
            stock: 99, // Default stock
          },
        ];
      }

      const newCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        cartCount: newCount,
      };
    }

    case "REMOVE_FROM_CART": {
      const newItems = state.items.filter((item) => item.id !== action.payload);
      const newCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        cartCount: newCount,
      };
    }

    case "INCREASE_QTY": {
      const newItems = state.items.map((item) => {
        if (item.id === action.payload) {
          const maxStock = item.stock || 99;
          if (item.quantity >= maxStock) {
            return item; // Don't increase if at max stock
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });

      const newCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        cartCount: newCount,
      };
    }

    case "DECREASE_QTY": {
      const newItems = state.items.map((item) =>
        item.id === action.payload
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );

      const newCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return {
        items: newItems,
        cartCount: newCount,
      };
    }

    case "CLEAR_CART": {
      return {
        items: [],
        cartCount: 0,
      };
    }

    case "LOAD_CART": {
      const newCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      return {
        items: action.payload,
        cartCount: newCount,
      };
    }

    default:
      return state;
  }
};
