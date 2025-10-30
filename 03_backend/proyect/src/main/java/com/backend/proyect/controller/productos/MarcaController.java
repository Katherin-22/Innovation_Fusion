package com.backend.proyect.controller.productos;

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

import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.Marca;
import com.backend.proyect.repository.productos.MarcaRepository;

import org.springframework.security.access.prepost.PreAuthorize;


@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MarcaController {

    @Autowired
    // tipoProductoRepository este se pone en los return
    private MarcaRepository marcaRepository;

    @PreAuthorize("hasAuthority('administrador')")
    @PostMapping("/marca")
    Marca newMarca(@RequestBody Marca newMarca) {
        return marcaRepository.save(newMarca);
    }


    @GetMapping("/publico/marcas")
    List<Marca> getAllMarca() {
        return marcaRepository.findAll();
    }

    @GetMapping("/publico/marca/{idMarca}")
    Marca getOneidMarca(@PathVariable Integer idMarca) {
        return marcaRepository.findById(idMarca)
                .orElseThrow(() -> new ResourceNotFoundException("Marca", idMarca));
    }

    @PreAuthorize("hasAuthority('administrador')")
    @PutMapping("/marca/{idMarca}")
    Marca updateMarca(@RequestBody Marca updateMarca, @PathVariable Integer idMarca) {
        return marcaRepository.findById(idMarca)
                .map(marca -> {
                    marca.setNombreMarca(updateMarca.getNombreMarca());

                    return marcaRepository.save(marca);
                }).orElseThrow(() -> new ResourceNotFoundException("Marca", idMarca));
    }

    @PreAuthorize("hasAuthority('administrador')")
    @DeleteMapping("/marca/{idMarca}")
    String deleteMarca(@PathVariable Integer idMarca) {
        if (!marcaRepository.existsById(idMarca)) {
            throw new ResourceNotFoundException("Marca", idMarca);
        }
        marcaRepository.deleteById(idMarca);
        return "La marca con id " + idMarca + " ha sido eliminado correctamente";
    }
}
