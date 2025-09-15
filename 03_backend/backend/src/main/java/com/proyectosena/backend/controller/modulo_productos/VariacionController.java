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
import com.proyectosena.backend.model.modulo_productos.Variacion;
import com.proyectosena.backend.repository.modulo_productos.VariacionRepository;

@RestController
public class VariacionController {
    @Autowired
    // tipoProductoRepository este se pone en los return
    private VariacionRepository variacionRepository;  

    @PostMapping("/variacion")
    Variacion newVariacion(@RequestBody Variacion newVariacion) {
        return variacionRepository.save(newVariacion);
    }

    @GetMapping("/variaciones")
    List<Variacion> getAllVariacion(){
        return variacionRepository.findAll();
    }

    @GetMapping("/variacion/{idVariacion}")
    Variacion getOneVariacion(@PathVariable Integer idVariacion) {
        return variacionRepository.findById(idVariacion)
                .orElseThrow(() -> new ResourceNotFoundException("Variacion", idVariacion));
    }


    @PutMapping("/variacion/{idVariacion}")
    Variacion updateVariacion (@RequestBody Variacion updateVariacion, @PathVariable Integer idVariacion){
        return variacionRepository.findById(idVariacion)
            .map(variacion ->{
                variacion.setNombre(updateVariacion.getNombre());

                return variacionRepository.save(variacion);
            }).orElseThrow(()->new ResourceNotFoundException("Variacion", idVariacion));
    }

    @DeleteMapping("/Variacion/{idVariacion}")
    String deleteVariacion (@PathVariable Integer idVariacion){
        if(!variacionRepository.existsById(idVariacion)){
            throw new ResourceNotFoundException("Variacion",idVariacion);
        }
        variacionRepository.deleteById(idVariacion);
        return "El Variacion con id " + idVariacion + " ha sido eliminado correctamente";
    }
}
