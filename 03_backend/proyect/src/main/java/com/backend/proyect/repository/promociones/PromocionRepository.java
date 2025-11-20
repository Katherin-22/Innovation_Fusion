package com.backend.proyect.repository.promociones;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.proyect.model.promociones.Promocion;

public interface PromocionRepository extends JpaRepository<Promocion,Integer>{

    // Verifica si ya existe un producto con ese código de referencia
    boolean existsByCodigoPromocion(String codigoPromocion);

    //Verifica si existe otro producto con el mismo código de referencia al actualizar
    boolean existsByCodigoPromocionAndIdPromocionNot (String codigoPromocion, Integer idPromocion);
}
