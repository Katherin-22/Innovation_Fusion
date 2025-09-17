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
import com.proyectosena.backend.model.modulo_productos.TipoPublico;
import com.proyectosena.backend.repository.modulo_productos.TipoPublicoRepository;

@RestController
public class TipoPublicoController {
    @Autowired
    // tipoProductoRepository este se pone en los return
    private TipoPublicoRepository tipoPublicoRepository;  

    @PostMapping("/tipo_publico")
    TipoPublico newTipoPublico(@RequestBody TipoPublico newTipoPublico) {
        return tipoPublicoRepository.save(newTipoPublico);
    }

    @GetMapping("/tipo_publicos")
    List<TipoPublico> getAllTipoPublico(){
        return tipoPublicoRepository.findAll();
    }

    @GetMapping("/tipo_publico/{idPublico}")
    TipoPublico getOneTipoPublico(@PathVariable Integer idPublico) {
        return tipoPublicoRepository.findById(idPublico)
                .orElseThrow(() -> new ResourceNotFoundException("TipoPublico", idPublico));
    }


    @PutMapping("/tipo_publico/{idPublico}")
    TipoPublico updateTipoPublico (@RequestBody TipoPublico updateTipoPublico, @PathVariable Integer idPublico){
        return tipoPublicoRepository.findById(idPublico)
            .map(tipoPublico ->{
                tipoPublico.setNombrePublico(updateTipoPublico.getNombrePublico());

                return tipoPublicoRepository.save(tipoPublico);
            }).orElseThrow(()->new ResourceNotFoundException("TipoPublico", idPublico));
    }

    @DeleteMapping("/tipo_publico/{idPublico}")
    String deleteTipoPublico (@PathVariable Integer idPublico){
        if(!tipoPublicoRepository.existsById(idPublico)){
            throw new ResourceNotFoundException("TipoPublico", idPublico);
        }
        tipoPublicoRepository.deleteById(idPublico);
        return "El TipoPublico con id " + idPublico + " ha sido eliminado correctamente";
    }
}