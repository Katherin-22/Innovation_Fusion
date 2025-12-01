package com.backend.proyect.service.productos;

import com.backend.proyect.dto.productos.ProductoDTO;
import com.backend.proyect.exception.productos.ConflictException;
import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.*;
import com.backend.proyect.repository.productos.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class ProductoService {

    @Autowired
    private ProductoRepository productoRepository;
    @Autowired
    private CategoriaRepository categoriaRepository;
    @Autowired
    private MarcaRepository marcaRepository;
    @Autowired
    private MaterialRepository materialRepository;
    @Autowired
    private TipoPublicoRepository tipoPublicoRepository;
    @Autowired
    private PromocionRepository promocionRepository;

    public Producto crearProducto(ProductoDTO productoDTO) {
        String codigoReferencia = productoDTO.getCodigoReferencia().toLowerCase();

        if (productoRepository.existsByCodigoReferencia(codigoReferencia)) {
            throw new ConflictException("Ya existe un producto con el código " + codigoReferencia);
        }

        if (productoDTO.getPrecio() < 0) {
            throw new IllegalArgumentException("El precio no puede ser negativo");
        }

        Producto producto = new Producto();
        // Buscar y asignar entidades relacionadas
        Categoria categoria = categoriaRepository.findById(productoDTO.getIdCategoria())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", productoDTO.getIdCategoria()));

        Marca marca = marcaRepository.findById(productoDTO.getIdMarca())
                .orElseThrow(() -> new ResourceNotFoundException("Marca", productoDTO.getIdMarca()));

        Material material = materialRepository.findById(productoDTO.getIdMaterial())
                .orElseThrow(() -> new ResourceNotFoundException("Material", productoDTO.getIdMaterial()));

        TipoPublico tipoPublico = tipoPublicoRepository.findById(productoDTO.getIdPublico())
                .orElseThrow(() -> new ResourceNotFoundException("Tipo Publico", productoDTO.getIdPublico()));

        producto.setNombreProducto(productoDTO.getNombreProducto());
        producto.setCodigoReferencia(codigoReferencia);
        producto.setDescripcion(productoDTO.getDescripcion());
        producto.setPrecio(productoDTO.getPrecio());
        producto.setFechaCreacion(LocalDate.now());
        producto.setFechaModificacion(LocalDate.now());
        producto.setEstadoProducto(productoDTO.getEstadoProducto());
        producto.setCategoria(categoria);
        producto.setMarca(marca);
        producto.setMaterial(material);
        producto.setTipoPublico(tipoPublico);

        if (productoDTO.getIdPromocion() != null) {
            Promocion promocion = promocionRepository.findById(productoDTO.getIdPromocion())
                    .orElseThrow(() -> new ResourceNotFoundException("Promocion", productoDTO.getIdPromocion()));
            producto.setPromocion(promocion);
        }

        return productoRepository.save(producto);
    }

    public void eliminarProducto(Integer idProducto) {
        if (!productoRepository.existsById(idProducto)) {
            throw new ResourceNotFoundException("Producto", idProducto);
        }
        productoRepository.deleteById(idProducto);
    }

    public List<ProductoDTO> obtenerTodosLosProductos() {
        return productoRepository.findAll().stream()
                .map(this::convertirADTO)
                .collect(Collectors.toList());
    }

    public List<Producto> obtenerProductosActivos() {
        return productoRepository.findByEstadoProducto(Producto.EstadoProducto.Activo);
    }

    public Producto actualizarProducto(Integer idProducto, ProductoDTO productoDTO) {
        Producto producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new ResourceNotFoundException("Producto", idProducto));

        String codigoNuevo = productoDTO.getCodigoReferencia().toLowerCase();
        String codigoActual = producto.getCodigoReferencia();

        if (!codigoActual.equals(codigoNuevo)) {
            if (productoRepository.existsByCodigoReferenciaAndIdProductoNot(codigoNuevo, idProducto)) {
                throw new ConflictException("Ya existe un producto con el código " + productoDTO.getCodigoReferencia());
            }
        }

        if (productoDTO.getPrecio() < 0) {
            throw new IllegalArgumentException("El precio no puede ser negativo");
        }

        // Buscar y asignar entidades relacionadas
        Categoria categoria = categoriaRepository.findById(productoDTO.getIdCategoria())
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", productoDTO.getIdCategoria()));

        Marca marca = marcaRepository.findById(productoDTO.getIdMarca())
                .orElseThrow(() -> new ResourceNotFoundException("Marca", productoDTO.getIdMarca()));

        Material material = materialRepository.findById(productoDTO.getIdMaterial())
                .orElseThrow(() -> new ResourceNotFoundException("Material", productoDTO.getIdMaterial()));

        TipoPublico tipoPublico = tipoPublicoRepository.findById(productoDTO.getIdPublico())
                .orElseThrow(() -> new ResourceNotFoundException("Tipo Publico", productoDTO.getIdPublico()));

        producto.setNombreProducto(productoDTO.getNombreProducto());
        producto.setCodigoReferencia(codigoNuevo);
        producto.setDescripcion(productoDTO.getDescripcion());
        producto.setPrecio(productoDTO.getPrecio());
        producto.setFechaModificacion(LocalDate.now());
        producto.setEstadoProducto(productoDTO.getEstadoProducto());
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

        return productoRepository.save(producto);
    }

    private ProductoDTO convertirADTO(Producto producto) {
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
    }
}