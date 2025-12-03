import React from "react";
import styles from "../../styles/gestionusuarios/recuperarContraseña.module.css";
import img1 from "../../assets/ModuloUsuarios/RecuperarContrasena/img/img1.png";
import img2 from "../../assets/ModuloUsuarios/RecuperarContrasena/img/img2.png";

function RecuperarContraseña() {
  return (
    <div className={styles.paginaRecuperar}>
      <div className={styles.modalContenido}>

        <div className={styles["contenedor-formulario-imagenes-restablecer"]}>

          {/* Imagen izquierda */}
          <div className={styles["contenedor-imagen-izquierda-restablecer"]}>
            <img src={img1} alt="Imagen izquierda restablecer" />
          </div>

          {/* Formulario */}
          <form className={styles["form-restablecer-pass"]}>
            <h2 className={styles["titulo-restablecer"]}>
              RESTABLECER CONTRASEÑA
            </h2>

            <label className={styles["label-restablecer"]} htmlFor="telefono">
              Teléfono / móvil *
            </label>
            <input
              id="telefono"
              type="text"
              className={styles["input-correo-restablecer"]}
              placeholder="Teléfono / móvil"
              required
            />

            <label className={styles["label-restablecer"]} htmlFor="correo">
              Correo Electrónico *
            </label>
            <input
              id="correo"
              type="email"
              className={styles["input-correo-restablecer"]}
              placeholder="Correo electrónico"
              required
            />

            <label className={styles["label-restablecer"]} htmlFor="codigo">
              Código de verificación *
            </label>
            <input
              id="codigo"
              type="text"
              className={styles["input-codigo-restablecer"]}
              placeholder="Código"
              required
            />

            <label className={styles["label-restablecer"]} htmlFor="nueva_pass">
              Contraseña *
            </label>
            <input
              id="nueva_pass"
              type="password"
              className={styles["input-password-nueva"]}
              placeholder="Contraseña nueva"
              required
            />

            <label className={styles["label-restablecer"]} htmlFor="confirmar_pass">
              Confirmación *
            </label>
            <input
              id="confirmar_pass"
              type="password"
              className={styles["input-password-confirmar"]}
              placeholder="Confirmación"
              required
            />

            <button type="submit" className={styles["btn-cambiar-pass"]}>
              Cambiar contraseña
            </button>
          </form>

          {/* Imagen derecha */}
          <div className={styles["contenedor-imagen-derecha-restablecer"]}>
            <img src={img2} alt="Imagen derecha restablecer" />
          </div>

        </div>
      </div>
    </div>
  );
}

export default RecuperarContraseña;
