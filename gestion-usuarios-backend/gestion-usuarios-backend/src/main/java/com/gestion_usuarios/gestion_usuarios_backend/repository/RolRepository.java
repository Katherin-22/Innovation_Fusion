package com.gestion_usuarios.gestion_usuarios_backend.repository;

import com.gestion_usuarios.gestion_usuarios_backend.model.Rol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
}
