package com.backend.proyect.repository.principal;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.proyect.model.principal.Banner;

@Repository
public interface BannerRepository extends JpaRepository<Banner, Long> {
}
