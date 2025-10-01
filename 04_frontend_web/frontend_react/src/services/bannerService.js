import api_url from "./administrador/api";

// Obtener todos los banners
export const getBanners = async () => {
  return await api_url.get("/banners");
};
