import MenuAdmin from "../../layouts/Administrador/Menu/menuAdmin";
import "../../styles/Administrador/gestion_producto.css";
import "../../styles/Administrador/inventario.css";

import Banner from "../../layouts/menuHome/carrousel/carrousel";

const GestionPagina = () => {
    return (
        <div className="all" >
            <MenuAdmin />
            <div class="main-content">
                <div class="container">
                    <div class="row border-bottom border-1 border-black p-2">
                        <h1 class="d-flex justify-content-center fs-1">Gestion pagina</h1>
                    </div>
                    <div class="row ">
                        <div class="col d-flex justify-content-center flex-column" />
                            <h2>cambiar banner</h2>
                            <input type="file" name="image" class="form-control" />
                        </div>
                    </div>

                    <div class="row">
                        <h2 class="d-flex justify-content-center">Imagenes</h2>
                        <img src="" alt="" class="imagen-gc" />
                    </div>

                    <div className="visualizarBanner">
                        <Banner />
                    </div>

                    <div class="row d-flex justify-content-center">
                        <button type="submit" class="btn mt-3 w-25 custom-btn">Guardar Banner</button>
                    </div>
                </div>
            </div>
    )
}

export default GestionPagina;
