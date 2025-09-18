package com.proyectosena.backend.controller.modulo_productos;

import java.io.File;
import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    private final String UPLOAD_DIR = System.getProperty("user.dir") + "/uploads/";

    @PostMapping("/producto")
    ResponseEntity<String> guardarProducto(
        @RequestParam("nombreProducto") String nombreProducto,
        @RequestParam("codigoReferencia") String codigoReferencia,
        @RequestParam("descripcion") String descripcion,
        @RequestParam("precio") double precio,
        @RequestParam("urlImagen") MultipartFile urlImagen,
        @RequestParam("fechaModificacion") LocalDate fechaModificacion,
        @RequestParam("estadoProducto") Producto.EstadoProducto estadoProducto,
        @RequestParam("idCategoria") Integer idCategoria,
        @RequestParam("idMarca") Integer idMarca,
        @RequestParam("idMaterial") Integer idMaterial,
        @RequestParam("idPublico") Integer idPublico,
        @RequestParam("idPromocion") Integer idPromocion
    ){
    try {
        // Crear carpeta si no existe
        File directory = new File(UPLOAD_DIR);
        if (!directory.exists()) {
            directory.mkdirs();
            System.out.println("Carpeta creada en: " + UPLOAD_DIR);
        }
        
        // Ruta donde se guardará
        String ruta = UPLOAD_DIR + urlImagen.getOriginalFilename();

        try {
            urlImagen.transferTo(new File(ruta));
            System.out.println("Imagen guardada en: " + ruta);
        } catch (Exception ex) {
            ex.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al guardar la imagen: " + ex.getMessage());
        }

        // Validar que la fechaFin ingresada no sea anterior a hoy
        if(fechaModificacion.isBefore(LocalDate.now())){
            throw new IllegalArgumentException("La fecha fin no puede ser anterior a la fecha actual.");
        }

        // Crear y llenar entidad
        Producto producto = new Producto();
        producto.setNombreProducto(nombreProducto);
        producto.setCodigoReferencia(codigoReferencia);
        producto.setDescripcion(descripcion);
        producto.setPrecio(precio);
        producto.setUrlImagen("/uploads/" + urlImagen.getOriginalFilename());
        producto.setFechaCreacion(LocalDate.now());
        producto.setFechaModificacion(fechaModificacion);
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
                .orElseThrow(()->new ResourceNotFoundException("Promocion",idPromocion));
            producto.setPromocion(promocion);
        }

        

        // solo la ruta relativa
        productoRepository.save(producto);

        return ResponseEntity.ok("Producto guardado exitosamente");

        

        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            e.printStackTrace(); // esto muestra el error exacto en consola
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al guardar el producto");
        }
    }

    @GetMapping("/productos")
    List<Producto> getAllProducto(){
        return productoRepository.findAll();
    }
}