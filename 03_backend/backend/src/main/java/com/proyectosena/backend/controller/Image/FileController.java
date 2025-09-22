package com.proyectosena.backend.controller.Image;

import com.proyectosena.backend.service.DriveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
public class FileController {

    @Autowired
    private DriveService driveService;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
        try {
            String url = driveService.uploadFile(file);
            return ResponseEntity.ok(url); // devuelve la URL pública
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error subiendo archivo: " + e.getMessage());
        }
    }
}
