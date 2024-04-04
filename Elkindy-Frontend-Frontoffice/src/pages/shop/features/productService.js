import axios from "axios";
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const getProducts = async () => {
    const response = await axios.get("http://localhost:9090/api/product");
    if (response.data) {
        return response.data;
    }
};

const getSingleProduct = async (id) => {
    const response = await axios.get(`http://localhost:9090/api/product/${id}`);
    if (response.data) {
        return response.data;
    }
};

const addToWishlist = async (prodId) => {
    try {
        const storedToken = Cookies.get('token');
        const decodedToken = jwtDecode(storedToken);
        const userId = decodedToken.userId;
        
        const response = await axios.put(`http://localhost:9090/api/product/wishlist/${userId}`, { prodId });
        
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Error adding to wishlist:', error);
        throw error;
    }
};

const getUserWishlist = async () => {
    const storedToken = Cookies.get('token');
    const decodedToken = jwtDecode(storedToken);
    const userId = decodedToken;
    const response = await axios.get(`http://localhost:9090/api/product/wishlist/${userId.userId}`);
    if (response.data) {
        return response.data;
    }
};

const addToCart = async (cartData) => {
    const storedToken = Cookies.get('token');
    const decodedToken = jwtDecode(storedToken);
    const userId = decodedToken;
    const response = await axios.post(`http://localhost:9090/api/cart/add/${userId.userId}`, cartData);
    if (response.data) {
        return response.data;
    }
}

const getCart = async () => {
    const storedToken = Cookies.get('token');
    const decodedToken = jwtDecode(storedToken);
    const userId = decodedToken;
    const response = await axios.get(`http://localhost:9090/api/cart/get/${userId.userId}`);
    if (response.data) {
        return response.data;
    }
};

const removeProductFromCart = async (cartItemId) => {
    const storedToken = Cookies.get('token');
    const decodedToken = jwtDecode(storedToken);
    const userId = decodedToken;
    const response = await axios.delete(`http://localhost:9090/api/cart/delete-product-cart/${userId.userId}/${cartItemId}`);
    if (response.data) {
        return response.data;
    }
};

const updateProductFromCart = async (cartDetail) => {
    const storedToken = Cookies.get('token');
    const decodedToken = jwtDecode(storedToken);
    const userId = decodedToken;
    const response = await axios.put(`http://localhost:9090/api/cart/update-product-cart/${userId.userId}/${cartDetail.cartItemId}/${cartDetail.quantity}`);
    if (response.data) {
        return response.data;
    }
};

const rateProduct = async (data) => {
    try {
        const storedToken = Cookies.get('token');
        const decodedToken = jwtDecode(storedToken);
        const userId = decodedToken.userId;
        const response = await axios.put(`http://localhost:9090/api/product/rating/${userId}`, data);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Error rating a product:', error);
        throw error;
    }
};

const createOrder = async (orderDetail) => {
    try {
        const storedToken = Cookies.get('token');
        const decodedToken = jwtDecode(storedToken);
        const userId = decodedToken.userId;
        const response = await axios.post(`http://localhost:9090/api/order/cash-order/${userId}`, orderDetail);
        if (response.data) {
            return response.data;
        }
    } catch (error) {
        console.error('Error adding order:', error);
        throw error;
    }
};

const getUserOrders = async () => {
        const storedToken = Cookies.get('token');
        const decodedToken = jwtDecode(storedToken);
        const userId = decodedToken.userId;
        const response = await axios.get(`http://localhost:9090/api/order/getmyorders/${userId}`);
        if (response.data) {
            return response.data;
        }
};

const emptyUserCart = async () => {
    const storedToken = Cookies.get('token');
    const decodedToken = jwtDecode(storedToken);
    const userId = decodedToken.userId;
    const response = await axios.delete(`http://localhost:9090/api/cart/empty-cart/${userId}`);
    if (response.data) {
        return response.data;
    }
};


export const productService = {
    getProducts,
    addToWishlist,
    getUserWishlist,
    getSingleProduct,
    addToCart,
    getCart,
    removeProductFromCart,
    updateProductFromCart,
    rateProduct,
    createOrder,
    getUserOrders,
    emptyUserCart,
}