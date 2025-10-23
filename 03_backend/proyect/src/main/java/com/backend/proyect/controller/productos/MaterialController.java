package com.backend.proyect.controller.modulo_productos;

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

import com.backend.proyect.exception.modulo_productos.ResourceNotFoundException;
import com.backend.proyect.model.modulo_productos.Material;
import com.backend.proyect.repository.modulo_productos.MaterialRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class MaterialController {
    @Autowired
    // tipoProductoRepository este se pone en los return
    private MaterialRepository materialRepository;  

    @PostMapping("/material")
    Material newMaterial(@RequestBody Material newMaterial) {
        return materialRepository.save(newMaterial);
    }

    @GetMapping("/materiales")
    List<Material> getAllMaterial(){
        return materialRepository.findAll();
    }

    @GetMapping("/material/{idMaterial}")
    Material getOneMaterial(@PathVariable Integer idMaterial) {
        return materialRepository.findById(idMaterial)
                .orElseThrow(() -> new ResourceNotFoundException("Material", idMaterial));
    }


    @PutMapping("/material/{idMaterial}")
    Material updateMaterial (@RequestBody Material updateMaterial, @PathVariable Integer idMaterial){
        return materialRepository.findById(idMaterial)
            .map(material ->{
                material.setNombreMaterial(updateMaterial.getNombreMaterial());

                return materialRepository.save(material);
            }).orElseThrow(()->new ResourceNotFoundException("Material", idMaterial));
    }

    @DeleteMapping("/material/{idMaterial}")
    String deleteMaterial (@PathVariable Integer idMaterial){
        if(!materialRepository.existsById(idMaterial)){
            throw new ResourceNotFoundException("Material",idMaterial);
        }
        materialRepository.deleteById(idMaterial);
        return "El Material con id " + idMaterial + " ha sido eliminado correctamente";
    }
}
