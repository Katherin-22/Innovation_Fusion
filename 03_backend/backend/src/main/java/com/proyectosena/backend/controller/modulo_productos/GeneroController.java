package com.proyectosena.backend.controller.modulo_productos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.proyectosena.backend.exception.modulo_productos.ResourceNotFoundException;
import com.proyectosena.backend.model.modulo_productos.Genero;
import com.proyectosena.backend.repository.modulo_productos.GeneroRepository;

@RestController
public class GeneroController {
    @Autowired
    // tipoProductoRepository este se pone en los return
    private GeneroRepository generoRepository;  

    @PostMapping("/genero")
    Genero newGenero(@RequestBody Genero newGenero) {
        return generoRepository.save(newGenero);
    }

    @GetMapping("/generos")
    List<Genero> getAllGenero(){
        return generoRepository.findAll();
    }

    @GetMapping("/genero/{idGenero}")
    Genero getOneGenero(@PathVariable Integer idGenero) {
        return generoRepository.findById(idGenero)
                .orElseThrow(() -> new ResourceNotFoundException("Genero", idGenero));
    }


    @PutMapping("/genero/{idGenero}")
    Genero updateGenero (@RequestBody Genero updateGenero, @PathVariable Integer idGenero){
        return generoRepository.findById(idGenero)
            .map(genero ->{
                genero.setNombreGenero(updateGenero.getNombreGenero());

                return generoRepository.save(genero);
            }).orElseThrow(()->new ResourceNotFoundException("Genero", idGenero));
    }

    @DeleteMapping("/genero/{idGenero}")
    String deleteGenero (@PathVariable Integer idGenero){
        if(!generoRepository.existsById(idGenero)){
            throw new ResourceNotFoundException("Genero", idGenero);
        }
        generoRepository.deleteById(idGenero);
        return "El Genero con id " + idGenero + " ha sido eliminado correctamente";
    }
}