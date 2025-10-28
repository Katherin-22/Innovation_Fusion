import "../styles/recuperarcontraseña.css";
import img1 from '../assets/ModuloUsuarios/RecuperarContrasena/img/img1.png'
import img2 from '../assets/ModuloUsuarios/RecuperarContrasena/img/img2.png'

function RecuperarContraseña() {
  return (
    <div>
        
        <div className="contenedor">
        <div className="formulario-con-imagenes">
            <div className="imagen-izquierda-contenedor">
                <img src={img1} alt="Imagen Izquierda" />
            </div>
            <form>
                <h2>RESTABLECER CONTRASEÑA</h2>

                <label htmlFor="telefono">Teléfono / móvil *</label>
                <input type="text" id="telefono" placeholder="Teléfono / móvil" required />

                <label htmlFor="correo">Correo Electrónico *</label>
                <input type="email" id="correo" placeholder="Correo Electrónico" required />

                <label htmlFor="codigo">Código de verificación *</label>
                <input type="text" id="codigo" placeholder="Código" required />

                <label htmlFor="nueva_contraseña">Contraseña *</label>
                <input type="password" id="nueva_contraseña" placeholder="Contraseña" required />

                <label htmlFor="confirmacion">Confirmación de Contraseña *</label>
                <input type="password" id="confirmacion" placeholder="Confirmación de Contraseña" required />

                <div className="boton-iniciar">
                    <input type="submit" className="btn-1" value="Cambiar contraseña" />
                </div>
            </form>
            <div className="imagen-derecha-contenedor">
                <img src={img2} alt="Imagen Derecha" />
            </div>
        </div>
    </div>

    </div>
  )
}
export default RecuperarContraseña;