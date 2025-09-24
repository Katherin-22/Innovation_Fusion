import { useEffect, useState } from "react";
import { getStock } from "../../services/admi/StockService";

export const useGetStock = () => {
  const [stock, setStock] = useState([]);
  const [loading, setLoad] = useState(true);

  useEffect(() => {
    getStock()
      .then((res) => setStock(res.data))
      .finally(() => setLoad(false));
  }, []);

  return { stock, loading };
};