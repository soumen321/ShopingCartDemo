import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Products = {
  id: number;
  title: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
};
type InitialState = {
  products: Products[];
};

const initialState: InitialState = {
  products: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Products>) => {
      const newProduct = action.payload;
      const cartItem = state.products.find(
        item => item.id === newProduct.product.id,
      );

      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.products.push({...newProduct.product, quantity: 1});
      }
    },
    changeQuantity: (state, action: PayloadAction<any>) => {

      const {productId, qnty} = action.payload;
      const cartItem = state.products.find(item => item.id === productId);

      if (cartItem) {
        cartItem.quantity += qnty;
      }

      if (cartItem?.quantity <= 0) {
        state.products = state.products.filter(item => item != cartItem);
      }
    },
    clearCart: state => {
      state.products = [];
    },
  },
});

export const selectNumberOfItems = (state:any) => state.cart.products.length;

export const selectTotalPrice = (state:any) => state.cart.products.reduce(
  (sum,cartItem) => sum + cartItem.price * cartItem.quantity,
  0
);

export const {addToCart, changeQuantity,clearCart} = cartSlice.actions;

export default cartSlice.reducer;
