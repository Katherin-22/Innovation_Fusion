package com.backend.proyect.controller.promociones;

import java.time.LocalDate;
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

import com.backend.proyect.dto.promociones.PromocionDTO;
import com.backend.proyect.exception.productos.ConflictException;
import com.backend.proyect.exception.productos.ResourceNotFoundException;
import com.backend.proyect.model.promociones.Promocion;
import com.backend.proyect.repository.promociones.PromocionRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class PromocionController {

    @Autowired
    // tipoProductoRepository este se pone en los return
    private PromocionRepository promocionRepository;

    //@PreAuthorize("hasAuthority('administrador')")
    @PostMapping("/promocion")
    Promocion newPromocion(@RequestBody PromocionDTO promocionDTO) {
        Promocion promocion = new Promocion();

        // Siempre la fecha de inicio es el día actual
        promocion.setFechaInicio(LocalDate.now());

        // Validar que la fechaFin ingresada no sea anterior a hoy
        if (promocionDTO.getFechaFin().isBefore(LocalDate.now())) {
            throw new IllegalArgumentException("La fecha fin no puede ser anterior a la fecha actual.");
        }
        promocion.setFechaFin(promocionDTO.getFechaFin());

        String codigoPromocion = promocionDTO.getCodigoPromocion().toLowerCase();

        if (promocionRepository.existsByCodigoPromocion(codigoPromocion)) {
            throw new ConflictException("Ya existe un producto con el código " + codigoPromocion);
        }

        if (promocionDTO.getDescuento() < 0) {
            throw new IllegalArgumentException("El precio no puede ser negativo");
        }

        
        // Solo actualizamos lo que viene en el DTO
        promocion.setNombrePromocion(promocionDTO.getNombrePromocion());
        promocion.setCodigoPromocion(codigoPromocion);
        promocion.setDescuento(promocionDTO.getDescuento());
        promocion.setDescripcion(promocionDTO.getDescripcion());
        promocion.setEstadoPromocion(promocionDTO.getEstadoPromocion());

        return promocionRepository.save(promocion);
    }

    @GetMapping("/publico/promociones")
    List<Promocion> getAllPromocion() {
        return promocionRepository.findAll();
    }

    @GetMapping("/publico/promocion/{idPromocion}")
    Promocion getOnePromocion(@PathVariable Integer idPromocion) {
        return promocionRepository.findById(idPromocion)
                .orElseThrow(() -> new ResourceNotFoundException("Promocion", idPromocion));
    }

    //@PreAuthorize("hasAuthority('administrador')")
    @PutMapping("/promocion/{idPromocion}")
    Promocion updatePromocion(@RequestBody PromocionDTO promocionDTO, @PathVariable Integer idPromocion) {
        return promocionRepository.findById(idPromocion)
                .map(promocion -> {

                    String codigoNuevo = promocionDTO.getCodigoPromocion().toLowerCase();
                    String codigoActual = promocion.getCodigoPromocion();

                    if (!codigoActual.equals(codigoNuevo)){
                        if (promocionRepository.existsByCodigoPromocionAndIdPromocionNot(codigoNuevo, idPromocion))
                        throw new ConflictException("Ya existe un producto con el código " + promocionDTO.getCodigoPromocion()); 
                    }

                    if (promocionDTO.getDescuento() < 0) {
                        throw new IllegalArgumentException("El precio no puede ser negativo");
                    }


                    // Validar que la fechaFin ingresada no sea anterior a hoy
                    if (promocionDTO.getFechaFin().isBefore(LocalDate.now())) {
                        throw new IllegalArgumentException("La fecha fin no puede ser anterior a la fecha actual.");
                    }
                    promocion.setFechaFin(promocionDTO.getFechaFin());

                    // Solo actualizamos lo que viene en el DTO
                    promocion.setNombrePromocion(promocionDTO.getNombrePromocion());
                    promocion.setCodigoPromocion(codigoNuevo);
                    promocion.setDescuento(promocionDTO.getDescuento());
                    promocion.setDescripcion(promocionDTO.getDescripcion());
                    promocion.setEstadoPromocion(promocionDTO.getEstadoPromocion());

                    return promocionRepository.save(promocion);
                }).orElseThrow(() -> new ResourceNotFoundException("Promocion", idPromocion));
    }

    //@PreAuthorize("hasAuthority('administrador')")
    @DeleteMapping("/promocion/{idPromocion}")
    String deletePromocion(@PathVariable Integer idPromocion) {
        if (!promocionRepository.existsById(idPromocion)) {
            throw new ResourceNotFoundException("Promocion", idPromocion);
        }
        promocionRepository.deleteById(idPromocion);
        return "La promocion con id " + idPromocion + " ha sido eliminado correctamente";
    }
}
