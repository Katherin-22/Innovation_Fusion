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
import com.proyectosena.backend.model.modulo_productos.Color;
import com.proyectosena.backend.repository.modulo_productos.ColorRepository;

@RestController
public class ColorController {
    @Autowired
    // tipoProductoRepository este se pone en los return
    private ColorRepository colorRepository;  

    @PostMapping("/color")
    Color newColor(@RequestBody Color newColor) {
        return colorRepository.save(newColor);
    }

    @GetMapping("/colores")
    List<Color> getAllColor(){
        return colorRepository.findAll();
    }

    @GetMapping("/color/{idColor}")
    Color getOneColor(@PathVariable Integer idColor) {
        return colorRepository.findById(idColor)
                .orElseThrow(() -> new ResourceNotFoundException("Color", idColor));
    }


    @PutMapping("/color/{idColor}")
    Color updateColor (@RequestBody Color updateColor, @PathVariable Integer idColor){
        return colorRepository.findById(idColor)
            .map(color ->{
                color.setNombreColor(updateColor.getNombreColor());

                return colorRepository.save(color);
            }).orElseThrow(()->new ResourceNotFoundException("Color",idColor));
    }

    @DeleteMapping("/color/{idColor}")
    String deleteColor (@PathVariable Integer idColor){
        if(!colorRepository.existsById(idColor)){
            throw new ResourceNotFoundException("Color",idColor);
        }
        colorRepository.deleteById(idColor);
        return "El Color con id " + idColor + " ha sido eliminado correctamente";
    }
}
