package com.gestion_usuarios.gestion_usuarios_backend.repository;

import com.gestion_usuarios.gestion_usuarios_backend.model.TipoDocumento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoDocumentoRepository extends JpaRepository<TipoDocumento, Long> {
}
