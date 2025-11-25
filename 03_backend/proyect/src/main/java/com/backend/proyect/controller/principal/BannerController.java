package com.backend.proyect.controller.principal;

import com.backend.proyect.model.principal.Banner;
import com.backend.proyect.repository.principal.BannerRepository;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/banners")
public class BannerController {

    @Value("${upload.path}")
    private String uploadPath;

    private final BannerRepository bannerRepository;

    public BannerController(BannerRepository bannerRepository) {
        this.bannerRepository = bannerRepository;
    }

    // 🔹 Subir archivo y registrar banner
    @PostMapping("/upload")
    public ResponseEntity<Banner> upload(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Crear carpeta si no existe
        File folder = new File(uploadPath);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // Generar nombre único
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path path = Paths.get(uploadPath, fileName);
        Files.write(path, file.getBytes());

        // URL pública para acceder al archivo
        String url = "/uploads/" + fileName;

        // Crear objeto Banner y guardar en DB
        Banner banner = new Banner(
                null, // id autogenerado
                null, // titulo (puede llenarse después)
                null, // descripcion
                null, // imagenUrl (si quieres usarla)
                fileName,
                url
        );
        bannerRepository.save(banner);

        return ResponseEntity.ok(banner);
    }

    // 🔹 Obtener todos los banners
    @GetMapping
    public List<Banner> getAll() {
        return bannerRepository.findAll();
    }
}
