import api from "./axiosInstance";

const getAllCategories = async () => {
    const response = await api.get("/api/categories");
    return response.data;
}; 

export default { getAllCategories }