package com.proyectosena.backend.service;
import com.google.api.client.http.FileContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

@Service
public class DriveService {

    private final Drive drive;
    private final String folderId = "1oln0NNM85Uq75AWJcVVK5ZrOQPcsT-g0"; // tu folderId real

    public DriveService(Drive drive) {
        this.drive = drive;
    }

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        // Metadata del archivo
        File fileMetadata = new File();
        fileMetadata.setName(multipartFile.getOriginalFilename());
        fileMetadata.setParents(Collections.singletonList(folderId));

        // Contenido
        java.io.File filePath = java.io.File.createTempFile("temp", multipartFile.getOriginalFilename());
        multipartFile.transferTo(filePath);

        FileContent mediaContent = new FileContent(multipartFile.getContentType(), filePath);

        File uploadedFile = drive.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();

        // Hacer público el archivo
        drive.permissions().create(uploadedFile.getId(),
                        new com.google.api.services.drive.model.Permission()
                                .setRole("reader")
                                .setType("anyone"))
                .execute();

        // Retornar URL pública
        return "https://drive.google.com/uc?id=" + uploadedFile.getId();
    }
}
