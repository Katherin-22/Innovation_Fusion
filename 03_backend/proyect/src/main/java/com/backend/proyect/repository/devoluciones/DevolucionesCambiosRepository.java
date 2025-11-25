package com.backend.proyect.repository.devoluciones;

import com.backend.proyect.model.devoluciones.DevolucionesCambios;
import com.backend.proyect.model.usuario.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface  DevolucionesCambiosRepository extends JpaRepository<DevolucionesCambios, Integer> {
    List<DevolucionesCambios> findByUsuario(Usuario usuario);
}
