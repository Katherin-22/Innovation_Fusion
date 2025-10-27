package com.backend.proyect.controller.productos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.proyect.dto.productos.CategoriaDTO;
import com.backend.proyect.dto.productos.ProductoDTO;
import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.Categoria;
import com.backend.proyect.model.productos.TipoProducto;
import com.backend.proyect.repository.productos.CategoriaRepository;
import com.backend.proyect.repository.productos.TipoProductoRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class CategoriaController {

    @Autowired
    // tipoProductoRepository este se pone en los return
    private CategoriaRepository categoriaRepository;

    @Autowired
    private TipoProductoRepository tipoProductoRepository;

    @PostMapping("/categoria")
    Categoria newCategoria(@RequestBody CategoriaDTO categoriaDTO) {
        // Buscar el tipo de producto por ID
        TipoProducto tipoProducto = tipoProductoRepository.findById(categoriaDTO.getIdTipoProducto())
                .orElseThrow(() -> new ResourceNotFoundException("TipoProducto", categoriaDTO.getIdTipoProducto()));
        // Crear la nueva categoría
        Categoria newCategoria = new Categoria();
        newCategoria.setNombreCategoria(categoriaDTO.getNombreCategoria());
        newCategoria.setTipoProducto(tipoProducto);
        // Guardar en la BD
        return categoriaRepository.save(newCategoria);
    }

@GetMapping("/categorias")
ResponseEntity<List<CategoriaDTO>> getAllCategoria() {
    List<CategoriaDTO> lista = categoriaRepository.findAll().stream().map(categoria -> {
        CategoriaDTO dto = new CategoriaDTO();
        dto.setIdCategoria(categoria.getIdCategoria());
        dto.setNombreCategoria(categoria.getNombreCategoria());
        dto.setNombreTipoProducto(categoria.getTipoProducto().getNombreTipoProducto());
        return dto;
    }).toList();

    return ResponseEntity.ok(lista);
}

    @GetMapping("/categoria/{idCategoria}")
    Categoria getOneCategoria(@PathVariable Integer idCategoria) {
        return categoriaRepository.findById(idCategoria)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", idCategoria));
    }

    @PutMapping("/categoria/{idCategoria}")
    Categoria updateCategoria(@RequestBody CategoriaDTO categoriaDTO, @PathVariable Integer idCategoria) {
        return categoriaRepository.findById(idCategoria)
                .map(categoria -> {
                    // Actualizar el nombre de la categoría
                    categoria.setNombreCategoria(categoriaDTO.getNombreCategoria());
                    // Buscar y asignar el TipoProducto
                    TipoProducto tipoProducto = tipoProductoRepository.findById(categoriaDTO.getIdTipoProducto())
                            .orElseThrow(() -> new RuntimeException("TipoProducto no encontrado"));
                    // Asignar el objeto tipoProducto (no el id)
                    categoria.setTipoProducto(tipoProducto);
                    return categoriaRepository.save(categoria);
                }).orElseThrow(() -> new ResourceNotFoundException("Categoria", idCategoria));
    }

    @DeleteMapping("/categoria/{idCategoria}")
    public ResponseEntity<String> deleteCategoria(@PathVariable Integer idCategoria) {
        if (!categoriaRepository.existsById(idCategoria)) {
            throw new ResourceNotFoundException("Categoria", idCategoria);
        }

        try {
            categoriaRepository.deleteById(idCategoria);
            return ResponseEntity.noContent().build(); // 204 No Content
        } catch (DataIntegrityViolationException e) {
            // Si hay registros en productos relacionados
            return ResponseEntity.status(409)
                    .body("No se puede eliminar la categoria porque tiene un producto asociados");
        }
    }
}
