import MenuHome from "../../layouts/menuHome/menuHome"
import Banner from "../../layouts/menuHome/carrousel/carrousel"


import Footer from "../../layouts/menuHome/footer"

import "../../styles/home/paginaInicio.css"

const Home = () =>{
    return (
    <div className="allHome">
            <MenuHome />
        <div className="body-color">
            <Banner />
            {/*vista produacto 1*/}
            
                <div className="container-fluid">

                    {/* Sección: Colección */}
                    <div className="row">
                        <h1 className="text-center text-white mt-4">Crea tu colección</h1>
                        <div className="col-12 text-center">
                        <a href="../../colecciones/html/coleccion.html">
                            <div classNameName="addColecccion" />
                        </a>
                        </div>
                    </div>

                        {/* Sección: estilo de calzados*/}
                    <div className="row mt-5">
                        <h1 className="text-center text-white mb-4">Compra por estilos de calzado</h1>

                        {/* card 1 */}
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
                        <div className="card text-center h-100">
                            <img src="/iamgenes_prueba/zapato/im11.jpg" className="card-img-top" alt="Zapato 1" />
                            <div className="card-body">
                            <h5 className="card-title">Zapato</h5>
                            <p className="card-text">Texto de ejemplo para el producto.</p>
                            <a href="#" className="btn custom-btn">Carrito</a>
                            <a href="../../productos/html/producto.html" className="btn custom-btn">Ver</a>
                            </div>
                        </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
                        <div className="card text-center h-100">
                            <img src="/iamgenes_prueba/zapato/im7.jpg" className="card-img-top" alt="Zapato 2" />
                            <div className="card-body">
                            <h5 className="card-title">Zapato</h5>
                            <p className="card-text">Texto de ejemplo para el producto.</p>
                            <a href="#" className="btn custom-btn">Carrito</a>
                            <a href="../../productos/html/producto.html" className="btn custom-btn">Ver</a>
                            </div>
                        </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
                        <div className="card text-center h-100">
                            <img src="/iamgenes_prueba/zapato/im8.jpg" className="card-img-top" alt="Zapato 3" />
                            <div className="card-body">
                            <h5 className="card-title">Zapato</h5>
                            <p className="card-text">Texto de ejemplo para el producto.</p>
                            <a href="../" className="btn custom-btn">Carrito</a>
                            <a href="../../productos/html/producto.html" className="btn custom-btn">Ver</a>
                            </div>
                        </div>
                        </div>

                        {/* Card 4 */}
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
                        <div className="card text-center h-100">
                            <img src="/iamgenes_prueba/zapato/im6.jpg" className="card-img-top" alt="Zapato 4" />
                            <div className="card-body">
                            <h5 className="card-title">Zapato</h5>
                            <p className="card-text">Texto de ejemplo para el producto.</p>
                            <a href="#" className="btn custom-btn">Carrito</a>
                            <a href="../../productos/html/producto.html" className="btn custom-btn">Ver</a>
                            </div>
                        </div>
                        </div>
                    </div>

                        {/* seccion estilo de bolsos */}
                    <div className="row mt-5">
                        <h1 className="text-center text-white mb-4">Compra por estilos de bolsos</h1>

                        {/* Card 1 */}
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
                        <div className="card text-center h-100">
                            <img src="../../principal/img/im13.jpg" className="card-img-top" alt="Bolso 1" />
                            <div className="card-body">
                            <h5 className="card-title">Bolso</h5>
                            <p className="card-text">Texto de ejemplo para el producto.</p>
                            <a href="#" className="btn custom-btn">Carrito</a>
                            <a href="../../productos/html/producto.html" className="btn custom-btn">Ver</a>
                            </div>
                        </div>
                        </div>

                        {/* Card 2 */}
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
                        <div className="card text-center h-100">
                            <img src="../../principal/img/im14.jpg" className="card-img-top" alt="Bolso 2" />
                            <div className="card-body">
                            <h5 className="card-title">Bolso</h5>
                            <p className="card-text">Texto de ejemplo para el producto.</p>
                            <a href="#" className="btn custom-btn">Carrito</a>
                            <a href="../../productos/html/producto.html" className="btn custom-btn">Ver</a>
                            </div>
                        </div>
                        </div>

                        {/* Card 3 */}
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
                        <div className="card text-center h-100">
                            <img src="../../principal/img/im15.jpg" className="card-img-top" alt="Bolso 3" />
                            <div className="card-body">
                            <h5 className="card-title">Bolso</h5>
                            <p className="card-text">Texto de ejemplo para el producto.</p>
                            <a href="#" className="btn custom-btn">Carrito</a>
                            <a href="../../productos/html/producto.html" className="btn custom-btn">Ver</a>
                            </div>
                        </div>
                        </div>

                        {/* Card 4 */}
                        <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4">
                        <div className="card text-center h-100">
                            <img src="../../principal/img/im17.jpg" className="card-img-top" alt="Bolso 4" />
                            <div className="card-body">
                            <h5 className="card-title">Bolso</h5>
                            <p className="card-text">Texto de ejemplo para el producto.</p>
                            <a href="../" className="btn custom-btn">Carrito</a>
                            <a href="../../productos/html/producto.html" className="btn custom-btn">Ver</a>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>

            <Footer />
        </div>
    </div>
    );
}

export default Home;