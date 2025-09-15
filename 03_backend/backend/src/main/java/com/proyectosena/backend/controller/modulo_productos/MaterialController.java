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
import com.proyectosena.backend.repository.modulo_productos.MaterialRepository;
import com.proyectosena.backend.model.modulo_productos.Material;

@RestController
public class MaterialController {
    @Autowired
    // tipoProductoRepository este se pone en los return
    private MaterialRepository materialRepository;  

    @PostMapping("/Material")
    Material newMaterial(@RequestBody Material newMaterial) {
        return materialRepository.save(newMaterial);
    }

    @GetMapping("/Materiales")
    List<Material> getAllMaterial(){
        return materialRepository.findAll();
    }

    @GetMapping("/Material/{idMaterial}")
    Material getOneMaterial(@PathVariable Integer idMaterial) {
        return materialRepository.findById(idMaterial)
                .orElseThrow(() -> new ResourceNotFoundException("Material", idMaterial));
    }


    @PutMapping("/Material/{idMaterial}")
    Material updateMaterial (@RequestBody Material updateMaterial, @PathVariable Integer idMaterial){
        return materialRepository.findById(idMaterial)
            .map(material ->{
                material.setNombreMaterial(updateMaterial.getNombreMaterial());

                return materialRepository.save(material);
            }).orElseThrow(()->new ResourceNotFoundException("Material", idMaterial));
    }

    @DeleteMapping("/Material/{idMaterial}")
    String deleteMaterial (@PathVariable Integer idMaterial){
        if(!materialRepository.existsById(idMaterial)){
            throw new ResourceNotFoundException("Material",idMaterial);
        }
        materialRepository.deleteById(idMaterial);
        return "El Material con id " + idMaterial + " ha sido eliminado correctamente";
    }
}
