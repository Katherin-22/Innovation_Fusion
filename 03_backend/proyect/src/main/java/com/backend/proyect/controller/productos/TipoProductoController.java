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

import org.springframework.security.access.prepost.PreAuthorize;

import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.productos.TipoProducto;
import com.backend.proyect.repository.productos.TipoProductoRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TipoProductoController {

    @Autowired
    // tipoProductoRepository este se pone en los return
    private TipoProductoRepository tipoProductoRepository;

    @PreAuthorize("hasAuthority('administrador')")
    @PostMapping("/tipo_producto")
    TipoProducto newTipoProducto(@RequestBody TipoProducto newTipoProducto) {
        return tipoProductoRepository.save(newTipoProducto);
    }

    @GetMapping("/publico/tipo_productos")
    List<TipoProducto> getAllTipoProducto() {
        return tipoProductoRepository.findAll();
    }

    @GetMapping("/publico/tipo_producto/{idTipoProducto}")
    TipoProducto getOneTipoProducto(@PathVariable Integer idTipoProducto) {
        return tipoProductoRepository.findById(idTipoProducto)
                .orElseThrow(() -> new ResourceNotFoundException("TipoProducto", idTipoProducto));
    }

    @PreAuthorize("hasAuthority('administrador')")
    @PutMapping("/tipo_producto/{idTipoProducto}")
    TipoProducto updateTipoProducto(@RequestBody TipoProducto updateTipoProducto, @PathVariable Integer idTipoProducto) {
        return tipoProductoRepository.findById(idTipoProducto)
                .map(tipoProducto -> {
                    tipoProducto.setNombreTipoProducto(updateTipoProducto.getNombreTipoProducto());

                    return tipoProductoRepository.save(tipoProducto);
                }).orElseThrow(() -> new ResourceNotFoundException("TipoProducto", idTipoProducto));
    }

    @PreAuthorize("hasAuthority('administrador')")
    @DeleteMapping("/tipo_producto/{idTipoProducto}")
    String deleteTipoProducto(@PathVariable Integer idTipoProducto) {
        if (!tipoProductoRepository.existsById(idTipoProducto)) {
            throw new ResourceNotFoundException("TipoProducto", idTipoProducto);
        }
        tipoProductoRepository.deleteById(idTipoProducto);
        return "El Tipo de producto con id " + idTipoProducto + " ha sido eliminado correctamente";
    }
}
