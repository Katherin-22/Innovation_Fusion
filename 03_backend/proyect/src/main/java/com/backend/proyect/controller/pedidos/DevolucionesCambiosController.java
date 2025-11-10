package com.backend.proyect.controller.pedidos;

import com.backend.proyect.dto.pedidos.DevolucionesCambiosRequest;
import com.backend.proyect.exception.usuario.ResourceNotFoundException;
import com.backend.proyect.model.pedidos.DevolucionesCambios;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.repository.pedidos.DevolucionesCambiosRepository;
import com.backend.proyect.repository.usuario.UsuarioRepository;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/devoluciones")

public class DevolucionesCambiosController {

    @Autowired
    private DevolucionesCambiosRepository devolucionesCambiosRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    // Ver todas las devoluciones
    // El administrador puede ver  todas las devoluciones
    @PreAuthorize("hasAuthority('administrador')")
    @GetMapping
    public List<DevolucionesCambios> listarDevoluciones() {
        return devolucionesCambiosRepository.findAll();
    }

    // Ver  una devolucion de un usuario por ID
    // El administrador puede ver cualquier devolucion por ID.
    // Un cliente solo puede ver su propia devolucion
    @PreAuthorize("hasAuthority('administrador') or hasAuthority('cliente')")
    @GetMapping("/{id}")
    public ResponseEntity<DevolucionesCambios> listarDevolucionPorId(@PathVariable Long id) {
        DevolucionesCambios devolucionescambios = devolucionesCambiosRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La devolucion con ese ID no existe: " + id));

        String authenticatedUserId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (devolucionescambios.getUsuario().getIdUsuario().toString().equals(authenticatedUserId) ||
                SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("administrador"))) {

            return ResponseEntity.ok(devolucionescambios);

        } else {
            throw new AccessDeniedException("No tiene permiso para acceder a esta devolucion.");
        }
    }

    // Crear una devolucion
    @PreAuthorize("hasAuthority('cliente') or hasAuthority('administrador')")
    @PostMapping
    public ResponseEntity<DevolucionesCambios> guardarDevolucion(@RequestBody DevolucionesCambiosRequest devolucionesCambiosRequest) {
        DevolucionesCambios devolucionescambios =  new DevolucionesCambios();

        devolucionescambios.setMotivo(devolucionesCambiosRequest.getMotivo());
        devolucionescambios.setTipoSolicitud(devolucionesCambiosRequest.getTipoSolicitud());
        devolucionescambios.setEstadoSolicitud(devolucionesCambiosRequest.getEstadoSolicitud());
        devolucionescambios.setFechaSolicitud(devolucionesCambiosRequest.getFechaSolicitud());
        devolucionescambios.setFechaRespuesta(devolucionesCambiosRequest.getFechaRespuesta());

        // 🔹 Cargar las tablas con el id
        Usuario usuario = usuarioRepository.findById(devolucionesCambiosRequest.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
        devolucionescambios.setUsuario(usuario);

        DevolucionesCambios newDevolucionesCambios = devolucionesCambiosRepository.save(devolucionescambios);
        return new ResponseEntity<>(newDevolucionesCambios, HttpStatus.CREATED);
    }

    // Actualizar devolucion
    // Un cliente solo puede actualizar su propia devolucion.
    // El administrador puede actualizar cualquier devolucion.
    @PreAuthorize("hasAuthority('administrador') or hasAuthority('cliente')")
    @PutMapping("/{id}")
    public ResponseEntity<DevolucionesCambios> actualizarDevolucion(@PathVariable Long id, @RequestBody DevolucionesCambiosRequest devolucionesCambiosRequest) {
        DevolucionesCambios devolucionescambios = devolucionesCambiosRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La devolucion con ese ID no existe: " + id));

        String authenticatedUserId = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        if (devolucionescambios.getUsuario().getIdUsuario().toString().equals(authenticatedUserId) ||
                SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream().anyMatch(a -> a.getAuthority().equals("administrador"))) {

          devolucionescambios.setMotivo(devolucionesCambiosRequest.getMotivo());
          devolucionescambios.setTipoSolicitud(devolucionesCambiosRequest.getTipoSolicitud());
          devolucionescambios.setEstadoSolicitud(devolucionesCambiosRequest.getEstadoSolicitud());
          devolucionescambios.setFechaSolicitud(devolucionesCambiosRequest.getFechaSolicitud());
          devolucionescambios.setFechaRespuesta(devolucionesCambiosRequest.getFechaRespuesta());

          // 🔹 Cargar de nuevo las relaciones
          if (devolucionesCambiosRequest.getIdUsuario() != null) {
             Usuario usuario = usuarioRepository.findById(devolucionesCambiosRequest.getIdUsuario())
                    .orElseThrow(() -> new ResourceNotFoundException("Usuario no encontrado"));
             devolucionescambios.setUsuario(usuario);
          }

          DevolucionesCambios devolucionActualizada = devolucionesCambiosRepository.save(devolucionescambios);
          return ResponseEntity.ok(devolucionActualizada);

        } else {
            // 7. Lanzar Acceso Denegado si la verificación falla
            throw new AccessDeniedException("No tiene permiso para actualizar esta devolucion. Solo puede actualizar sus propias devoluciones.");
        }
    }

    // Eliminar devolucion
    // Solo el administrador puede eliminar devoluciones
    @PreAuthorize("hasAuthority('administrador')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarDevolucion(@PathVariable Long id) {
        DevolucionesCambios devolucionescambios = devolucionesCambiosRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("La devolucion con ese ID no existe: " + id));

        devolucionesCambiosRepository.delete(devolucionescambios);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
