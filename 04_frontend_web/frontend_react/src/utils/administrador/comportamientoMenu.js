import { useEffect } from "react";

const ComportamientoMenu = () => {
  useEffect(() => {
    const toggle = document.querySelector(".toggle");
    const slidebar = document.querySelector(".slidebar");

    if (toggle && slidebar) {
      toggle.addEventListener("click", () => {
        slidebar.classList.toggle("close");
      });
    }

    // Limpieza: quitar el listener cuando el componente se desmonte
    return () => {
      if (toggle) {
        toggle.removeEventListener("click", () => {
          slidebar.classList.toggle("close");
        });
      }
    };
  }, []);

  return null; // no renderiza nada, solo agrega el comportamiento
};

export default ComportamientoMenu;
