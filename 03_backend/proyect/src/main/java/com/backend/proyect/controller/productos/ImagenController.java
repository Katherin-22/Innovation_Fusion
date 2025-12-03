package com.backend.proyect.controller.productos;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.Imagen;
import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.repository.productos.ImagenRepository;
import com.backend.proyect.repository.productos.ProductoRepository;


@RestController
public class ImagenController {
    @Autowired
    private ImagenRepository imagenRepository;
    @Autowired
    private ProductoRepository productoRepository;


    @Value("${upload.path}")
    private String uploadPath;

    @PostMapping("/producto/{idProducto}/imagenes")
    ResponseEntity<Imagen> newImagen(
        @PathVariable Integer idProducto,
        @RequestParam("urlImagen") MultipartFile file
        )throws IOException {
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

        Imagen imagen = new Imagen();

    // Buscar el producto
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));

System.out.println("Producto encontrado: " + producto);
System.out.println("ID producto: " + producto.getIdProducto()); // imprime el valor del ID real
                
        imagen.setUrlImagen(url);
        imagen.setProducto(producto);

        imagenRepository.save(imagen);

        return ResponseEntity.ok(imagen);
    }

    @GetMapping("/publico/producto/imagenes")
    ResponseEntity<List<Imagen>> getAllimagenes() {
        List<Imagen> productos = imagenRepository.findAll();
        return ResponseEntity.ok(productos); // 200 OK
    }

    //para mostrar todas las imagenes de un producto en especifico
    @GetMapping("/publico/producto/{idProducto}/imagenes")
    public ResponseEntity<List<Imagen>> getAllImagenesId(@PathVariable Integer idProducto) {
        List<Imagen> imagenes = imagenRepository.findByProductoIdProducto(idProducto);
        return ResponseEntity.ok(imagenes);
    }

    //para mostrar una imagen en especifico de un producto
    @GetMapping("/publico/producto/{idProducto}/imagen/{idImagen}")
    public ResponseEntity<Imagen> getOneImagen(@PathVariable Integer idProducto, @PathVariable Integer idImagen) {
        Imagen imagen = imagenRepository.findById(idImagen)
                .orElseThrow(() -> new ResourceNotFoundException("Imagen", idImagen));

        // Validar que la imagen pertenece al producto
        if (!imagen.getProducto().getIdProducto().equals(idProducto)) {
            throw new ResourceNotFoundException("La imagen no pertenece al producto con id " + idProducto, idProducto);
        }
        return ResponseEntity.ok(imagen);
    }    

    @PutMapping("/producto/{idProducto}/imagen/{idImagen}")
    public ResponseEntity<Imagen> updateImagen(
        @PathVariable Integer idProducto,
        @PathVariable Integer idImagen,
        @RequestParam("urlImagen") MultipartFile file) throws IOException {

        // 1. Verificar que el producto exista
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));

        // 2. Buscar la imagen
        Imagen imagen = imagenRepository.findById(idImagen)
                .orElseThrow(() -> new ResourceNotFoundException("Imagen", idImagen));

        // 3. Validar que la imagen pertenezca al producto
        if (!imagen.getProducto().getIdProducto().equals(idProducto)) {
            throw new ResourceNotFoundException("La imagen no pertenece al producto con id " + idProducto, idProducto);
        }
        // 4. Subir nuevo archivo si viene en la request
        if (file != null && !file.isEmpty()) {
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

            // (Opcional) eliminar archivo viejo
            String oldFile = imagen.getUrlImagen();
            if (oldFile != null) {
                Path oldPath = Paths.get(uploadPath, oldFile.replace("/uploads/", ""));
                Files.deleteIfExists(oldPath);
            }

            // Actualizar URL en la entidad
            imagen.setUrlImagen(url);
        }

            // 5. Reasignar producto (aunque no cambia, lo aseguramos)
            imagen.setProducto(producto);

            // 6. Guardar cambios
            Imagen updated = imagenRepository.save(imagen);

            return ResponseEntity.ok(updated);
        }

    @DeleteMapping("/imagen/{idImagen}")
        ResponseEntity<Void> deleteImagen(@PathVariable Integer idImagen){
        if (!imagenRepository.existsById(idImagen)) {
            throw new ResourceNotFoundException("Imagen", idImagen);
        }
        imagenRepository.deleteById(idImagen);
        return ResponseEntity.noContent().build();// 204 No Content
    }
}

