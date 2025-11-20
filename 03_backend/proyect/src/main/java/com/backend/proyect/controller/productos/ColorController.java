package com.backend.proyect.controller.productos;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.Color;
import com.backend.proyect.repository.productos.ColorRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ColorController {

    @Autowired
    // tipoProductoRepository este se pone en los return
    private ColorRepository colorRepository;

    //@PreAuthorize("hasAuthority('administrador')")
    @PostMapping("/color")
    Color newColor(@RequestBody Color newColor) {
        return colorRepository.save(newColor);
    }

    @GetMapping("/publico/colores")
    List<Color> getAllColor() {
        return colorRepository.findAll();
    }

    @GetMapping("/publico/color/{idColor}")
    Color getOneColor(@PathVariable Integer idColor) {
        return colorRepository.findById(idColor)
                .orElseThrow(() -> new ResourceNotFoundException("Color", idColor));
    }

    //@PreAuthorize("hasAuthority('administrador')")
    @PutMapping("/color/{idColor}")
    Color updateColor(@RequestBody Color updateColor, @PathVariable Integer idColor) {
        return colorRepository.findById(idColor)
                .map(color -> {
                    color.setNombreColor(updateColor.getNombreColor());

                    return colorRepository.save(color);
                }).orElseThrow(() -> new ResourceNotFoundException("Color", idColor));
    }

    //@PreAuthorize("hasAuthority('administrador')")
    @DeleteMapping("/color/{idColor}")
    String deleteColor(@PathVariable Integer idColor) {
        if (!colorRepository.existsById(idColor)) {
            throw new ResourceNotFoundException("Color", idColor);
        }
        colorRepository.deleteById(idColor);
        return "El Color con id " + idColor + " ha sido eliminado correctamente";
    }
}
