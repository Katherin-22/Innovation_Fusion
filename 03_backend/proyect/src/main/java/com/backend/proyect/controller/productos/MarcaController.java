package com.backend.proyect.backend.controller.modulo_productos;

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

import com.backend.proyect.backend.exception.modulo_productos.ResourceNotFoundException;
import com.backend.proyect.backend.model.modulo_productos.Marca;
import com.backend.proyect.backend.repository.modulo_productos.MarcaRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MarcaController {
    @Autowired
    // tipoProductoRepository este se pone en los return
    private MarcaRepository marcaRepository;  

    @PostMapping("/marca")
    Marca newMarca(@RequestBody Marca newMarca) {
        return marcaRepository.save(newMarca);
    }

    @GetMapping("/marcas")
    List<Marca> getAllMarca(){
        return marcaRepository.findAll();
    }

    @GetMapping("/marca/{idMarca}")
    Marca getOneidMarca(@PathVariable Integer idMarca) {
        return marcaRepository.findById(idMarca)
                .orElseThrow(() -> new ResourceNotFoundException("Marca", idMarca));
    }


    @PutMapping("/marca/{idMarca}")
    Marca updateMarca (@RequestBody Marca updateMarca, @PathVariable Integer idMarca){
        return marcaRepository.findById(idMarca)
            .map(marca ->{
                marca.setNombreMarca(updateMarca.getNombreMarca());

                return marcaRepository.save(marca);
            }).orElseThrow(()->new ResourceNotFoundException("Marca",idMarca));
    }

    @DeleteMapping("/marca/{idMarca}")
    String deleteMarca (@PathVariable Integer idMarca){
        if(!marcaRepository.existsById(idMarca)){
            throw new ResourceNotFoundException("Marca",idMarca);
        }
        marcaRepository.deleteById(idMarca);
        return "La marca con id " + idMarca + " ha sido eliminado correctamente";
    }
}


