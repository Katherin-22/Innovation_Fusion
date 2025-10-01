// src/services/bannerService.js
import api_url from "./api";

// Obtener todos los banners
export const getBanners = async () => {
  const res = await api_url.get("/banners");
  return res.data;
};

// Crear un nuevo banner
export const addBanner = async (bannerData) => {
  const res = await api_url.post("/banners", bannerData);
  return res.data;
};

// Eliminar un banner
export const deleteBanner = async (id) => {
  const res = await api_url.delete(`/banners/${id}`);
  return res.data;
};

// Actualizar un banner
export const updateBanner = async (id, bannerData) => {
  const res = await api_url.put(`/banners/${id}`, bannerData);
  return res.data;
};
