import { createSlice } from "@reduxjs/toolkit";

let initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  cartShow: false,
};

let cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    SetShowCart: (state, action) => {
      state.cartShow = action.payload;
    },
    SetCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    ClearCartItems: (state) => {
      state.cartItems = [];
      localStorage.clear("cartItems");
    },
    addToCart: (state, action) => {
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.cartItems.push(action.payload);
      }

      try {
        localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      } catch (error) {
        console.error("Error saving to local storage:", error);
      }
    },
    increaseQuantity: (state, action) => {
      const payload = action.payload;
      const updatedCartItems = state.cartItems.map((item) => {
        if (item.id === payload.id) {
          return {
            ...item,
            qty: item.qty + 1,
          };
        }
        return item;
      });
      state.cartItems = updatedCartItems;
      try {
        localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      } catch (error) {
        console.error("Error updating local storage:", error);
      }
    },
    // decreaseQuantity: (state, action) => {
    //   const payload = action.payload;
    //   // Find the item in the cart
    //   const itemIndex = state.cartItems.findIndex(
    //     (item) => item.id === payload.id
    //   );
    //   if (itemIndex !== -1) {
    //     const updatedCartItems = [...state.cartItems];
    //     const updatedItem = { ...updatedCartItems[itemIndex] };

    //     // Decrease the quantity by 1
    //     if (updatedItem.qty > 1) {
    //       updatedItem.qty -= 1;
    //     } else {
    //       // If quantity reaches 0, remove the item from the cart
    //       updatedCartItems.splice(itemIndex, 1);
    //     }

    //     updatedCartItems[itemIndex] = updatedItem;

    //     state.cartItems = updatedCartItems;

    //     try {
    //       localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
    //     } catch (error) {
    //       console.error("Error updating local storage:", error);
    //     }
    //   }
    // },
    decreaseQuantity: (state, action) => {
      const payload = action.payload;
      const index = state.cartItems.findIndex((item) => item.id === payload.id);

      if (index !== -1) {
        if (state.cartItems[index].qty > 1) {
          state.cartItems[index].qty -= 1;
        } else {
          // If quantity is 1 or less, remove the item from the cart
          state.cartItems.splice(index, 1);
        }

        try {
          localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        } catch (error) {
          console.error("Error updating local storage", error);
        }
      }
    },
  },
});

export let {
  SetShowCart,
  SetCartItems,
  ClearCartItems,
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
