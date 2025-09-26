package com.proyectosena.backend.controller.modulo_productos;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.proyectosena.backend.exception.modulo_productos.ResourceNotFoundException;
import com.proyectosena.backend.model.modulo_productos.Categoria;
import com.proyectosena.backend.model.modulo_productos.Marca;
import com.proyectosena.backend.model.modulo_productos.Material;
import com.proyectosena.backend.model.modulo_productos.Producto;
import com.proyectosena.backend.model.modulo_productos.TipoPublico;
import com.proyectosena.backend.model.modulo_promociones.Promocion;
import com.proyectosena.backend.repository.modulo_productos.CategoriaRepository;
import com.proyectosena.backend.repository.modulo_productos.MarcaRepository;
import com.proyectosena.backend.repository.modulo_productos.MaterialRepository;
import com.proyectosena.backend.repository.modulo_productos.ProductoRepository;
import com.proyectosena.backend.repository.modulo_productos.TipoPublicoRepository;
import com.proyectosena.backend.repository.modulo_promociones.PromocionRepository;

@RestController
public class ProductoController {

    @Value("${upload.path}")
    private String uploadPath;

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private CategoriaRepository categoriaRepository; 
    @Autowired
    private MaterialRepository materialRepository;   
    @Autowired
    private TipoPublicoRepository tipoPublicoRepository;  
    @Autowired
    private PromocionRepository promocionRepository; 
    @Autowired
    private MarcaRepository marcaRepository; 

    @PostMapping("/producto")
    ResponseEntity<String> guardarProducto(
        @RequestParam("nombreProducto") String nombreProducto,
        @RequestParam("codigoReferencia") String codigoReferencia,
        @RequestParam("descripcion") String descripcion,
        @RequestParam("precio") double precio,
        @RequestParam("urlImagen") MultipartFile urlImagen,
        @RequestParam("estadoProducto") Producto.EstadoProducto estadoProducto,
        @RequestParam("idCategoria") Integer idCategoria,
        @RequestParam("idMarca") Integer idMarca,
        @RequestParam("idMaterial") Integer idMaterial,
        @RequestParam("idPublico") Integer idPublico,
        @RequestParam(value = "idPromocion", required = false) Integer idPromocion
    ) throws IOException {
    try{
        if (urlImagen.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Crear carpeta si no existe
        File folder = new File(uploadPath);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // Generar nombre único
        String fileName = UUID.randomUUID() + "_" + urlImagen.getOriginalFilename();
        Path path = Paths.get(uploadPath, fileName);
        Files.write(path, urlImagen.getBytes());

        // URL pública para acceder al archivo
        String url = "/uploads/" + fileName;

        // Crear y llenar entidad
        Producto producto = new Producto();
        producto.setNombreProducto(nombreProducto);
        producto.setCodigoReferencia(codigoReferencia);
        producto.setDescripcion(descripcion);
        producto.setPrecio(precio);
        producto.setUrlImagen(url);
        producto.setFechaCreacion(LocalDate.now());
        producto.setFechaModificacion(LocalDate.now());
        producto.setEstadoProducto(estadoProducto);

        // Buscar y asignar entidades relacionadas (llaves foráneas)
        Categoria categoria = categoriaRepository.findById(idCategoria)
                .orElseThrow(()->new ResourceNotFoundException("Categoria",idCategoria));
        producto.setCategoria(categoria);

        Marca marca = marcaRepository.findById(idMarca)
                .orElseThrow(()->new ResourceNotFoundException("Marca",idMarca));
        producto.setMarca(marca);

        Material material = materialRepository.findById(idMaterial)
                .orElseThrow(()->new ResourceNotFoundException("Material",idMaterial));
        producto.setMaterial(material);

        TipoPublico tipoPublico = tipoPublicoRepository.findById(idPublico)
                .orElseThrow(()->new ResourceNotFoundException("Tipo Publico",idPublico));
        producto.setTipoPublico(tipoPublico);

        if (idPromocion != null) {
            Promocion promocion = promocionRepository.findById(idPromocion)
                    .orElseThrow(() -> new ResourceNotFoundException("Promocion", idPromocion));
            producto.setPromocion(promocion);
        } else {
            producto.setPromocion(null);
        }
        // solo la ruta relativa
        productoRepository.save(producto);
        return ResponseEntity.ok("Producto guardado exitosamente");

    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al guardar el producto");
    }
}

    @GetMapping("/productos")
    List<Producto> getAllProducto(){
        return productoRepository.findAll();
    }


     @GetMapping("/producto/{idProducto}")
    Producto getOneProducto(@PathVariable Integer idProducto) {
        return productoRepository.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));
    }

    @PutMapping("/producto/{idProducto}")
    ResponseEntity<String> updateProducto(
        @PathVariable Integer idProducto,
        @RequestParam("nombreProducto") String nombreProducto,
        @RequestParam("codigoReferencia") String codigoReferencia,
        @RequestParam("descripcion") String descripcion,
        @RequestParam("precio") double precio,
        @RequestParam("urlImagen") MultipartFile urlImagen,
        @RequestParam("estadoProducto") Producto.EstadoProducto estadoProducto,
        @RequestParam("idCategoria") Integer idCategoria,
        @RequestParam("idMarca") Integer idMarca,
        @RequestParam("idMaterial") Integer idMaterial, 
        @RequestParam("idPublico") Integer idPublico,
        @RequestParam(value = "idPromocion", required = false) Integer idPromocion
    ) throws IOException {
    try{
        if (urlImagen.isEmpty()) {
            return ResponseEntity.badRequest().build();
        }

        // Crear carpeta si no existe
        File folder = new File(uploadPath);
        if (!folder.exists()) {
            folder.mkdirs();
        }

        // Generar nombre único
        String fileName = UUID.randomUUID() + "_" + urlImagen.getOriginalFilename();
        Path path = Paths.get(uploadPath, fileName);
        Files.write(path, urlImagen.getBytes());

        // URL pública para acceder al archivo
        String url = "/uploads/" + fileName;

// Buscar producto existente
        Producto producto = productoRepository.findById(idProducto)
            .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));

        producto.setNombreProducto(nombreProducto);
        producto.setCodigoReferencia(codigoReferencia);
        producto.setDescripcion(descripcion);
        producto.setPrecio(precio);
        producto.setUrlImagen(url);
        producto.setFechaModificacion(LocalDate.now());
        producto.setEstadoProducto(estadoProducto);

        // Buscar y asignar entidades relacionadas (llaves foráneas)
        Categoria categoria = categoriaRepository.findById(idCategoria)
                .orElseThrow(()->new ResourceNotFoundException("Categoria",idCategoria));
        producto.setCategoria(categoria);

        Marca marca = marcaRepository.findById(idMarca)
                .orElseThrow(()->new ResourceNotFoundException("Marca",idMarca));
        producto.setMarca(marca);

        Material material = materialRepository.findById(idMaterial)
                .orElseThrow(()->new ResourceNotFoundException("Material",idMaterial));
        producto.setMaterial(material);

        TipoPublico tipoPublico = tipoPublicoRepository.findById(idPublico)
                .orElseThrow(()->new ResourceNotFoundException("Tipo Publico",idPublico));
        producto.setTipoPublico(tipoPublico);

        if (idPromocion != null) {
            Promocion promocion = promocionRepository.findById(idPromocion)
                    .orElseThrow(() -> new ResourceNotFoundException("Promocion", idPromocion));
            producto.setPromocion(promocion);
        } else {
            producto.setPromocion(null); // opcional, si quieres poder quitar promoción
        } 

        // solo la ruta relativa
        productoRepository.save(producto);
        return ResponseEntity.ok("Producto actualizado  exitosamente");

    } catch (IllegalArgumentException e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    } catch (Exception e) {
        e.printStackTrace();
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Error al guardar el producto");
    }
}

    @DeleteMapping("/producto/{idProducto}")
    String deleteProducto (@PathVariable Integer idProducto){
        if(!productoRepository.existsById(idProducto)){
            throw new ResourceNotFoundException("Producto",idProducto);
        }
        productoRepository.deleteById(idProducto);
        return "El Producto con id " + idProducto + " ha sido eliminado correctamente";
    }    
}