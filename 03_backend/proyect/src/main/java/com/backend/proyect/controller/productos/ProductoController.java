package com.backend.proyect.controller.productos;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.proyect.dto.productos.ProductoDTO;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.backend.proyect.exception.productos.ConflictException;
import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.Categoria;
import com.backend.proyect.model.productos.Marca;
import com.backend.proyect.model.productos.Material;
import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.productos.TipoPublico;
import com.backend.proyect.model.promociones.Promocion;
import com.backend.proyect.service.productos.ProductoService;

@RestController
public class ProductoController {

    private static final Logger logger = LoggerFactory.getLogger(ProductoController.class);

    @Autowired
    private ProductoService productoService;
    @Autowired
    private ProductoRepository productoRepository;

    //@PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    @PostMapping("/producto")
    ResponseEntity<Producto> newProducto(@RequestBody ProductoDTO productoDTO) {
        logger.info("Creando nuevo producto: {}", productoDTO.getNombreProducto());
        Producto saved = productoService.crearProducto(productoDTO);
        logger.info("Producto creado exitosamente: {} con ID: {}", saved.getNombreProducto(), saved.getIdProducto());
        return ResponseEntity.status(HttpStatus.CREATED).body(saved); // 201 Created
    }

//OJO: Aca se muestra todos los productos, tanto activos como inactivos
//@PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
@GetMapping("/productos")
ResponseEntity<List<ProductoDTO>> getProductos() {
    logger.debug("Consultando todos los productos - potencial N+1 query");
    List<ProductoDTO> lista = productoService.obtenerTodosLosProductos();
    return ResponseEntity.ok(lista);
}

//OJO: Aca se muestra solo los productos activos- para el cliente final
 @GetMapping("/publico/productos_activos")
 ResponseEntity<List<Producto>> getProductosActivos(){
     List<Producto> productos = productoService.obtenerProductosActivos();
     return ResponseEntity.ok(productos); // 200 OK
 }

    @GetMapping("/publico/producto/{idProducto}")
    ResponseEntity<Producto> getOneProducto(@PathVariable Integer idProducto) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));
    return ResponseEntity.ok(producto); // 200 OK
    }

    @PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    @GetMapping("/buscar_producto/{codigoReferencia}")
    public ResponseEntity<?> buscarPorCodigo(@PathVariable String codigoReferencia) {
        return productoRepository.findByCodigoReferencia(codigoReferencia.toLowerCase())
                .<ResponseEntity<?>>map(producto -> ResponseEntity.ok(producto))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(Map.of("error", "El producto con código " + codigoReferencia + " no existe.")));
    }

    //@PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    @PutMapping("/producto/{idProducto}")
    ResponseEntity<Producto> updateProducto(@RequestBody ProductoDTO productoDTO, @PathVariable Integer idProducto) {
        Producto actualizado = productoService.actualizarProducto(idProducto, productoDTO);
        return ResponseEntity.ok(actualizado); // 200 OK
    }

    //@PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    @DeleteMapping("/producto/{idProducto}")
    public ResponseEntity<String> deleteProducto(@PathVariable Integer idProducto) {
        try {
            productoService.eliminarProducto(idProducto);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (DataIntegrityViolationException e) {
            // Si hay registros en stock relacionados
            return ResponseEntity.status(409)
                    .body("No se puede eliminar el producto porque tiene stocks asociados");
        }
    }
}