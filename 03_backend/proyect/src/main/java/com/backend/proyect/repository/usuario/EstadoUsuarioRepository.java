package com.backend.proyect.repository.usuario;

import com.backend.proyect.model.usuario.EstadoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoUsuarioRepository extends JpaRepository<EstadoUsuario, Long>{
}
