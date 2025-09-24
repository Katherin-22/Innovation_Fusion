package com.proyectosena.backend.repository;

import com.proyectosena.backend.model.modulo_catalogo.Banner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
}
