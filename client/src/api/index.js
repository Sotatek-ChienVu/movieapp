import axios from 'axios';
import env from "react-dotenv";
const api = axios.create({
    baseURL: 'http://localhost:3001/api',
})
export const insertMovie = payload => axios.post(`/api/movie`, payload)
export const getAllMovies = () => axios.get(`/api/movies`)
export const updateMovieById = (id, payload) => axios.put(`/api/movie/${id}`, payload)
export const deleteMovieById = id => axios.delete(`/api/movie/${id}`)
export const getMovieById = id => axios.get(`/api/movie/${id}`)
export const login = payload => axios.post(`/api/login`, payload)
export const register = payload => axios.post(`/api/register`, payload)
export const searchAccount = keySearch => axios.get(`/api/search-account/${keySearch}`)
export const updateAccount = payload => axios.put('/api/update-account', payload)
export const forgotPassword = payload => axios.post(`/api/forgot`, payload)
export const createProduct = payload => axios.post(`/api/create-product`, payload)
export const getProduct = () => axios.get(`/api/get-product`)
export const getProductDetail = id => axios.get(`/api/product-detail/${id}`)
export const deleteProduct = payload => axios.delete(`/api/delete-product/${payload.id}`)
export const updateProduct = payload => axios.put(`/api/edit-product/${payload.id}`, payload.data)
export const searchProduct = payload => axios.get(`/api/search-product/${payload}`)
export const getProductPage = page => axios.get(`/api/product/${page}`)
export const CreateStore = payload => axios.post(`/api/create-store/${payload.id}`, payload.store)
export const getStore = userId => axios.get(`/api/get-store/${userId}`)
export const deleteStore = id => axios.delete(`/api/delete-store/${id}`);
export const deleteProductStore = payload => axios.post(`/api/delete-product-store`, payload);
export const getCity = () => axios.get(`/api/city`);
export const getDistrict = city => axios.get(`/api/district/${city}`);
export const getCommune = district => axios.get(`/api/commune/${district}`);
export const CreateOrder = payload => axios.post(`/api/create-order`, payload);
export const getOrder = id => axios.get(`/api/get-order/${id}`);
export const SearchOrder = keySearch => axios.get(`/api/search-order/${keySearch}`);
export const FilterProduct = type => axios.get(`/api/filter-product/${type}`);
export const getProfile = id => axios.get(`/api/get-profile/${id}`);


// admin

export const getAccount = () => axios.get(`/api/get-account`);
export const getAllOrder = () => axios.get(`/api/get-all-order`);
export const deleteAccount = id => axios.delete(`/api/delete-account/${id}`);
export const editAccount = payload => axios.put(`/api/edit-account`, payload);
export const deleteOrder = id => axios.delete(`/api/delete-order/${id}`);
export const editOrder = payload => axios.put(`/api/edit-order`, payload);
export const getNotify = () => axios.get(`/api/notify`);


const apis = {
    insertMovie,
    getAllMovies,
    updateMovieById,
    deleteMovieById,
    getMovieById,
    login,
    register,
    searchAccount,
    updateAccount,
    forgotPassword,
    createProduct,
    getProduct,
    getProductDetail,
    deleteProduct,
    updateProduct,
    searchProduct,
    getProductPage,
    CreateStore,
    deleteStore,
    getStore,
    deleteProductStore,
    getCity,
    getDistrict,
    getCommune,
    CreateOrder,
    getOrder,
    SearchOrder,
    FilterProduct,
    getProfile,
    // admin
    getAccount,
    deleteAccount,
    editAccount,
    getAllOrder,
    deleteOrder,
    editOrder,
    getNotify

}

export default apis
