package com.gestion_usuarios.gestion_usuarios_backend.repository;

import com.gestion_usuarios.gestion_usuarios_backend.model.EstadoUsuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstadoUsuarioRepository extends JpaRepository<EstadoUsuario, Long>{
}
