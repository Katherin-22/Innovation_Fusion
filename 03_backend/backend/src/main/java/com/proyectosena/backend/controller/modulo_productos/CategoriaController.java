package com.proyectosena.backend.controller.modulo_productos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyectosena.backend.DTO.modulo_productos.CategoriaDTO;
import com.proyectosena.backend.exception.modulo_productos.ResourceNotFoundException;
import com.proyectosena.backend.model.modulo_productos.Categoria;
import com.proyectosena.backend.model.modulo_productos.TipoProducto;
import com.proyectosena.backend.repository.modulo_productos.CategoriaRepository;
import com.proyectosena.backend.repository.modulo_productos.TipoProductoRepository;

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
        .orElseThrow(()->new ResourceNotFoundException("TipoProducto",categoriaDTO.getIdTipoProducto()));
    // Crear la nueva categoría
    Categoria newCategoria = new Categoria();
    newCategoria.setNombreCategoria(categoriaDTO.getNombreCategoria());
    newCategoria.setTipoProducto(tipoProducto);
    // Guardar en la BD
    return categoriaRepository.save(newCategoria);
}

    @GetMapping("/categorias")
    List<Categoria> getAllCategoria(){
        return categoriaRepository.findAll();
    }

    @GetMapping("/categoria/{idCategoria}")
    Categoria getOneCategoria(@PathVariable Integer idCategoria) {
        return categoriaRepository.findById(idCategoria)
                .orElseThrow(() -> new ResourceNotFoundException("Categoria", idCategoria));
    }

    @PutMapping("/categoria/{idCategoria}")
    Categoria updateCategoria (@RequestBody CategoriaDTO categoriaDTO, @PathVariable Integer idCategoria){
        return categoriaRepository.findById(idCategoria)    
            .map(categoria ->{
                // Actualizar el nombre de la categoría
                categoria.setNombreCategoria(categoriaDTO.getNombreCategoria());
                // Buscar y asignar el TipoProducto
                TipoProducto tipoProducto = tipoProductoRepository.findById(categoriaDTO.getIdTipoProducto())
                        .orElseThrow(() -> new RuntimeException("TipoProducto no encontrado"));
                // Asignar el objeto tipoProducto (no el id)
                categoria.setTipoProducto(tipoProducto);
                return categoriaRepository.save(categoria);
            }).orElseThrow(()->new ResourceNotFoundException("Categoria",idCategoria));
    }

    @DeleteMapping("/categoria/{idCategoria}")
    String deleteCategoria (@PathVariable Integer idCategoria){
        if(!categoriaRepository.existsById(idCategoria)){
            throw new ResourceNotFoundException("Categoria",idCategoria);
        }
        categoriaRepository.deleteById(idCategoria);
        return "La categoria con id " + idCategoria + " ha sido eliminado correctamente";
    }
} 
