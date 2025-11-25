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
import com.backend.proyect.exception.productos.ConflictException;
import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.Categoria;
import com.backend.proyect.model.productos.Marca;
import com.backend.proyect.model.productos.Material;
import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.productos.TipoPublico;
import com.backend.proyect.model.promociones.Promocion;
import com.backend.proyect.repository.productos.CategoriaRepository;
import com.backend.proyect.repository.productos.MarcaRepository;
import com.backend.proyect.repository.productos.MaterialRepository;
import com.backend.proyect.repository.productos.ProductoRepository;
import com.backend.proyect.repository.productos.TipoPublicoRepository;
import com.backend.proyect.repository.promociones.PromocionRepository;

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

    //@PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    @PostMapping("/producto")
    ResponseEntity<Producto> newProducto(@RequestBody ProductoDTO productoDTO) {

        String codigoReferencia = productoDTO.getCodigoReferencia().toLowerCase();

        if (productoRepository.existsByCodigoReferencia(codigoReferencia)) {
            throw new ConflictException("Ya existe una promocion con el código " + codigoReferencia);
        }

        if (productoDTO.getPrecio() < 0) {
            throw new IllegalArgumentException("El descuento no puede ser negativo");
        }

        Producto producto = new Producto();
        // Buscar y asignar entidades relacionadas (llaves foráneas)
        Categoria categoria = categoriaRepository.findById(productoDTO.getIdCategoria())
                .orElseThrow(()->new ResourceNotFoundException("Categoria",productoDTO.getIdCategoria()));
        
        Marca marca = marcaRepository.findById(productoDTO.getIdMarca())
                .orElseThrow(()->new ResourceNotFoundException("Marca",productoDTO.getIdMarca()));
        
        Material material = materialRepository.findById(productoDTO.getIdMaterial())
                .orElseThrow(()->new ResourceNotFoundException("Material",productoDTO.getIdMaterial()));
        
        TipoPublico tipoPublico = tipoPublicoRepository.findById(productoDTO.getIdPublico())
                .orElseThrow(()->new ResourceNotFoundException("Tipo Publico",productoDTO.getIdPublico()));
        
        producto.setNombreProducto(productoDTO.getNombreProducto());
        producto.setCodigoReferencia(codigoReferencia);
        producto.setDescripcion(productoDTO.getDescripcion());
        producto.setPrecio(productoDTO.getPrecio());
        producto.setFechaCreacion(LocalDate.now());
        producto.setFechaModificacion(LocalDate.now());
        producto.setEstadoProducto(productoDTO.getEstadoProducto());
        // 
        producto.setCategoria(categoria);    
        producto.setMarca(marca);    
        producto.setMaterial(material);
        producto.setTipoPublico(tipoPublico);

        if (productoDTO.getIdPromocion() != null) {
            Promocion promocion = promocionRepository.findById(productoDTO.getIdPromocion())
                    .orElseThrow(() -> new ResourceNotFoundException("Promocion", productoDTO.getIdPromocion()));
            producto.setPromocion(promocion);
        } else {
            producto.setPromocion(null);
        }     
        Producto saved = productoRepository.save(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved); // 201 Created
    }

//OJO: Aca se muestra todos los productos, tanto activos como inactivos
//@PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
@GetMapping("/productos")
ResponseEntity<List<ProductoDTO>> getProductos() {
    List<ProductoDTO> lista = productoRepository.findAll().stream().map(producto -> {
        ProductoDTO dto = new ProductoDTO();
        dto.setIdProducto(producto.getIdProducto());
        dto.setNombreProducto(producto.getNombreProducto());
        dto.setNombreTipoProducto(producto.getCategoria().getTipoProducto().getNombreTipoProducto());
        dto.setCodigoReferencia(producto.getCodigoReferencia());
        dto.setDescripcion(producto.getDescripcion());
        dto.setPrecio(producto.getPrecio());
        dto.setNombreCategoria(producto.getCategoria().getNombreCategoria());
        dto.setNombreMarca(producto.getMarca().getNombreMarca());
        dto.setNombreMaterial(producto.getMaterial().getNombreMaterial());
        dto.setNombrePublico(producto.getTipoPublico().getNombrePublico());
        dto.setEstadoProducto(producto.getEstadoProducto());
        dto.setFechaCreacion(producto.getFechaCreacion());
        dto.setFechaModificacion(producto.getFechaModificacion());

        return dto;
    }).toList();

    return ResponseEntity.ok(lista);
}

//OJO: Aca se muestra solo los productos activos- para el cliente final
    @GetMapping("/publico/productos_activos")
    ResponseEntity<List<Producto>> getProductosActivos(){
        List<Producto> productos = productoRepository.findByEstadoProducto(Producto.EstadoProducto.Activo);
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
    ResponseEntity<Producto> updateProducto( @RequestBody ProductoDTO productoDTO, @PathVariable Integer idProducto) {
    return productoRepository.findById(idProducto)
            .map(producto -> {
        String codigoNuevo = productoDTO.getCodigoReferencia().toLowerCase();
        String codigoActual = producto.getCodigoReferencia();

        if (!codigoActual.equals(codigoNuevo)){
            if (productoRepository.existsByCodigoReferenciaAndIdProductoNot(codigoNuevo, idProducto))
            throw new ConflictException("Ya existe una promoción con el código " + productoDTO.getCodigoReferencia()); 
        }

        if (productoDTO.getPrecio() < 0) {
            throw new IllegalArgumentException("El descuento no puede ser negativo");
        }
        // Buscar y asignar entidades relacionadas (llaves foráneas)
        Categoria categoria = categoriaRepository.findById(productoDTO.getIdCategoria())
                .orElseThrow(()->new ResourceNotFoundException("Categoria",productoDTO.getIdCategoria()));
        
        Marca marca = marcaRepository.findById(productoDTO.getIdMarca())
                .orElseThrow(()->new ResourceNotFoundException("Marca",productoDTO.getIdMarca()));
        
        Material material = materialRepository.findById(productoDTO.getIdMaterial())
                .orElseThrow(()->new ResourceNotFoundException("Material",productoDTO.getIdMaterial()));
        
        TipoPublico tipoPublico = tipoPublicoRepository.findById(productoDTO.getIdPublico())
                .orElseThrow(()->new ResourceNotFoundException("Tipo Publico",productoDTO.getIdPublico()));
        
        producto.setNombreProducto(productoDTO.getNombreProducto());
        producto.setCodigoReferencia(codigoNuevo);
        producto.setDescripcion(productoDTO.getDescripcion());
        producto.setPrecio(productoDTO.getPrecio());
        producto.setFechaModificacion(LocalDate.now());
        producto.setEstadoProducto(productoDTO.getEstadoProducto());
        // Asignar el objeto tipoProducto (no el id)
        producto.setCategoria(categoria);    
        producto.setMarca(marca);    
        producto.setMaterial(material);
        producto.setTipoPublico(tipoPublico);

        if (productoDTO.getIdPromocion() != null) {
            Promocion promocion = promocionRepository.findById(productoDTO.getIdPromocion())
                    .orElseThrow(() -> new ResourceNotFoundException("Promocion", productoDTO.getIdPromocion()));
            producto.setPromocion(promocion);
        } else {
            producto.setPromocion(null);
        }     
        Producto actualizado = productoRepository.save(producto);
        return ResponseEntity.ok(actualizado); // 200 OK
        })
        .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));
}

    //@PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    @DeleteMapping("/producto/{idProducto}")
    public ResponseEntity<String> deleteProducto(@PathVariable Integer idProducto) {
        if (!productoRepository.existsById(idProducto)) {
            throw new ResourceNotFoundException("Producto", idProducto);
        }

        try {
            productoRepository.deleteById(idProducto);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (DataIntegrityViolationException e) {
            // Si hay registros en stock relacionados
            return ResponseEntity.status(409)
                    .body("No se puede eliminar el producto porque tiene stocks asociados");
        }
    }
}