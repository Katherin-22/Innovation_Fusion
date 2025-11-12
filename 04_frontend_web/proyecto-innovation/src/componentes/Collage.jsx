import React, { useEffect } from 'react';
import "../styles/cuadricula.css";
import { initCollageEffect } from "../assets/ModuloUsuarios/IniciarSesion/js/java";


// Importa todas las imágenes estáticas desde la carpeta assets

import img1 from "../assets/ModuloUsuarios/IniciarSesion/img/img1.jfif";

import img2 from "../assets/ModuloUsuarios/IniciarSesion/img/img2.jpg";

import img3 from "../assets/ModuloUsuarios/IniciarSesion/img/img3.jfif";

import img4 from "../assets/ModuloUsuarios/IniciarSesion/img/img4.jpg";

import img5 from "../assets/ModuloUsuarios/IniciarSesion/img/img5.jpg";

import img6 from "../assets/ModuloUsuarios/IniciarSesion/img/img6.jpg";

import img7 from "../assets/ModuloUsuarios/IniciarSesion/img/img7.webp";

import img8 from "../assets/ModuloUsuarios/IniciarSesion/img/img8.png";

import img9 from "../assets/ModuloUsuarios/IniciarSesion/img/img9.jfif";

import img10 from "../assets/ModuloUsuarios/IniciarSesion/img/img10.webp";

import img11 from "../assets/ModuloUsuarios/IniciarSesion/img/img11.jpeg";

import img12 from "../assets/ModuloUsuarios/IniciarSesion/img/img12.webp";

import img13 from "../assets/ModuloUsuarios/IniciarSesion/img/img13_.jpg";

import img14 from "../assets/ModuloUsuarios/IniciarSesion/img/img14.jpg";

import img15 from "../assets/ModuloUsuarios/IniciarSesion/img/img15.jpg";

import img16 from "../assets/ModuloUsuarios/IniciarSesion/img/img16.webp";

import img17 from "../assets/ModuloUsuarios/IniciarSesion/img/img17.webp";

import img18 from "../assets/ModuloUsuarios/IniciarSesion/img/img18.jpg";

import img19 from "../assets/ModuloUsuarios/IniciarSesion/img/img19.jpg";

import img20 from "../assets/ModuloUsuarios/IniciarSesion/img/img20.webp";

import img21 from "../assets/ModuloUsuarios/IniciarSesion/img/img21.jpg";

import img22 from "../assets/ModuloUsuarios/IniciarSesion/img/img22.jpg";

import img23 from "../assets/ModuloUsuarios/IniciarSesion/img/img23.jpeg";

import img24 from "../assets/ModuloUsuarios/IniciarSesion/img/img24.webp";

// Array de datos para las tarjetas

const galleryImages = [
    { id: 1, src: img1, alt: "Imagen 1" },

    { id: 2, src: img2, alt: "Imagen 2" },

    { id: 3, src: img3, alt: "Imagen 3" },

    { id: 4, src: img4, alt: "Imagen 4" },

    { id: 5, src: img5, alt: "Imagen 5" },

    { id: 6, src: img6, alt: "Imagen 6" },

    { id: 7, src: img7, alt: "Imagen 7" },

    { id: 8, src: img8, alt: "Imagen 8" },

    { id: 9, src: img9, alt: "Imagen 9" },

    { id: 10, src: img10, alt: "Imagen 10" },

    { id: 11, src: img11, alt: "Imagen 11" },

    { id: 12, src: img12, alt: "Imagen 12" },

    { id: 13, src: img13, alt: "Imagen 13" },

    { id: 14, src: img14, alt: "Imagen 14" },

    { id: 15, src: img15, alt: "Imagen 15" },

    { id: 16, src: img16, alt: "Imagen 16" },

    { id: 17, src: img17, alt: "Imagen 17" },

    { id: 18, src: img18, alt: "Imagen 18" },

    { id: 19, src: img19, alt: "Imagen 19" },

    { id: 20, src: img20, alt: "Imagen 20" },

    { id: 21, src: img21, alt: "Imagen 21" },

    { id: 22, src: img22, alt: "Imagen 22" },

    { id: 23, src: img23, alt: "Imagen 23" },

    { id: 24, src: img24, alt: "Imagen 24" },
];

const Galeria = () => {

    useEffect(() => {
      initCollageEffect(); 
    }, []);

    return (
        <div className="main-content-wrapper">
            {" "}
            <div className="container-fluid grid-container">
                {" "}
                <div className="row g-2 justify-content-center">
                    {" "}
                    {/* Aquí se usa .map() para iterar sobre el array y renderizar cada tarjeta */}
                    {" "}
                    {galleryImages.map((image) => (
                        <div key={image.id} className="col-2">
                            {" "}
                            <div className="card custom-card">
                                {" "}
                                <div className="card-inner">
                                    {" "}
                                    <div className="card-front">
                                        <img src={image.src} alt={image.alt} />
                                        {" "}
                                    </div>
                                    {" "}
                                    <div className="card-back">
                                        {" "}
                                        <h5 className="text-dark">{image.alt}</h5>{" "}
                                    </div>
                                    {" "}
                                </div>
                                {" "}
                            </div>
                            {" "}
                        </div>
                    ))}
                    {" "}
                </div>
                {" "}
            </div>
            {" "}
        </div>
    );
};

export default Galeria;
