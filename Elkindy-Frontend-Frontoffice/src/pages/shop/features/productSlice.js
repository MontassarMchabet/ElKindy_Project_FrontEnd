import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productService } from "./productService";
import { BsCartCheck } from "react-icons/bs";
import 'bootstrap/dist/js/bootstrap.bundle.min'; // Import Bootstrap JavaScript
import { Toast } from 'bootstrap';
import Swal from "sweetalert2";



export const getAllProducts = createAsyncThunk(
  "product/get",
  async (thunkAPI) => {
    try {
      return await productService.getProducts();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getAProduct = createAsyncThunk(
  "product/getAProduct",
  async (id, thunkAPI) => {
    try {
      return await productService.getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addToWishlist = createAsyncThunk(
  "product/wishlist",
  async (prodId, thunkAPI) => {
    try {
      const response = await productService.addToWishlist(prodId);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);


export const getUserProductWishlist = createAsyncThunk(
  "product/wishlist/get",
  async (thunkAPI) => {
    try {
      return await productService.getUserWishlist();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addProdToCart = createAsyncThunk(
  "product/cart/add",
  async (cartData, thunkAPI) => {
    try {
      return await productService.addToCart(cartData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getUserCart = createAsyncThunk(
  "product/cart/get",
  async (thunkAPI) => {
    try {
      return await productService.getCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteACartProduct = createAsyncThunk(
  "product/cart/product/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.removeProductFromCart(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateACartProduct = createAsyncThunk(
  "product/cart/product/update",
  async (cartDetail, thunkAPI) => {
    try {
      return await productService.updateProductFromCart(cartDetail);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const addRating = createAsyncThunk(
  "product/rating",
  async (data, thunkAPI) => {
    try {
      const response = await productService.rateProduct(data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const createAnOrder = createAsyncThunk(
  "product/cart/create-order",
  async (orderDetail, thunkAPI) => {
    try {
      const response = await productService.createOrder(orderDetail);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const getOrders = createAsyncThunk(
  "product/order/get",
  async (thunkAPI) => {
    try {
      return await productService.getUserOrders()
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const emptyCart = createAsyncThunk(
  "product/cart/emptyCart",
  async (thunkAPI) => {
    try {
      return await productService.emptyUserCart();
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);



const productState = {
  product: "",
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
}

export const productSlice = createSlice({
  name: "product",
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      })
      .addCase(addToWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.addToWishlist = action.payload;
        state.message = "product added to wishlist successfully"
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserProductWishlist.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProductWishlist.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.wishlist = action.payload;
        state.message = " success "
      })
      .addCase(getUserProductWishlist.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getAProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.product = action.payload;
        state.message = "product fetched successfully"
      })
      .addCase(getAProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(addProdToCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addProdToCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProduct = action.payload;
        if (state.isSuccess) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product added successfully to cart",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .addCase(addProdToCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(getUserCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.cartProducts = action.payload;
      })
      .addCase(getUserCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(deleteACartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteACartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.deletedCartProduct = action.payload;
        if (state.isSuccess) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product Deleted From Cart Succussfully!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .addCase(deleteACartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "oops... Something went wrong!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .addCase(updateACartProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateACartProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.updatedCartProduct = action.payload;
        if (state.isSuccess) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product Updated From Cart Succussfully!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .addCase(updateACartProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "oops... Something went wrong!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .addCase(addRating.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addRating.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.rateing = action.payload;
        if (state.isSuccess) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Rating Added Succussfully!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .addCase(addRating.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "oops... Something went wrong!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .addCase(createAnOrder.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createAnOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.orderedProduct = action.payload;
        if (state.isSuccess) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "order Added Succussfully!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .addCase(createAnOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
        if (state.isError) {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "oops... Something went wrong!",
            showConfirmButton: false,
            timer: 1500
          });
        }
      })
      .addCase(getOrders.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.getuserorders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      })
      .addCase(emptyCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = true;
        state.emptedCart = action.payload;
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.error;
      });
  },
});

export default productSlice.reducer;