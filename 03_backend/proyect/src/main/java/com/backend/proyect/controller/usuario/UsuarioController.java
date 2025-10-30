package com.backend.proyect.controller.usuario;

import com.backend.proyect.dto.usuario.UsuarioRequest;
import com.backend.proyect.exception.usuario.ResourceNotFoundException;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.repository.usuario.EstadoUsuarioRepository;
import com.backend.proyect.repository.usuario.RolRepository;
import com.backend.proyect.repository.usuario.TipoDocumentoRepository;
import com.backend.proyect.repository.usuario.UsuarioRepository;
import com.backend.proyect.service.usuario.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private RolRepository rolRepository;

    @Autowired
    private TipoDocumentoRepository tipoDocumentoRepository;

    @Autowired
    private EstadoUsuarioRepository estadoUsuarioRepository;

    // Ver todos los usuarios
    // El administrador puede ver a todos los usuarios
    @PreAuthorize("hasAuthority('administrador')")
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // Ver usuario por ID
    // El administrador puede ver cualquier usuario por ID.
    // Un cliente solo puede ver su propio perfil
    @PreAuthorize("hasAuthority('administrador') or #id.toString() == authentication.principal.idUsuario.toString()")
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> listarUsuarioPorId(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El usuario con ese ID no existe: " + id));
        return ResponseEntity.ok(usuario);
    }

    // Crear un usuario
    @PostMapping
    public ResponseEntity<Usuario> guardarUsuario(@RequestBody UsuarioRequest usuarioRequest) {
        Usuario usuario =  new Usuario();

        usuario.setNumeroDocumento(usuarioRequest.getNumeroDocumento());
        usuario.setNombreUsuario(usuarioRequest.getNombreUsuario());
        usuario.setPrimerApellido(usuarioRequest.getPrimerApellido());
        usuario.setSegundoApellido(usuarioRequest.getSegundoApellido());
        usuario.setTelefono(usuarioRequest.getTelefono());
        usuario.setPassword(usuarioRequest.getPassword());
        usuario.setCorreoElectronico(usuarioRequest.getCorreoElectronico());
        usuario.setDireccion(usuarioRequest.getDireccion());

        // 🔹 Cargar las tablas con el id
        usuario.setRol(rolRepository.findById(usuarioRequest.getIdRol())
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado")));
        usuario.setTipo_de_documento(tipoDocumentoRepository.findById(usuarioRequest.getIdTipoDeDocumento())
                .orElseThrow(() -> new ResourceNotFoundException("TipoDocumento no encontrado")));
        usuario.setEstado_usuario(estadoUsuarioRepository.findById(usuarioRequest.getIdEstadoUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("EstadoUsuario no encontrado")));

        Usuario newUsuario = userService.register(usuario);
        return new ResponseEntity<>(newUsuario, HttpStatus.CREATED);
    }

    // Actualizar usuario
    // Un cliente solo puede actualizar su propio perfil.
    // El administrador puede actualizar cualquier perfil.
    @PreAuthorize("hasAuthority('administrador') or #id.toString() == authentication.principal.idUsuario.toString()")
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioRequest usuarioRequest) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El usuario con ese ID no existe: " + id));

        usuario.setNumeroDocumento(usuarioRequest.getNumeroDocumento());
        usuario.setNombreUsuario(usuarioRequest.getNombreUsuario());
        usuario.setPrimerApellido(usuarioRequest.getPrimerApellido());
        usuario.setSegundoApellido(usuarioRequest.getSegundoApellido());
        usuario.setTelefono(usuarioRequest.getTelefono());
        usuario.setPassword(usuarioRequest.getPassword());
        usuario.setCorreoElectronico(usuarioRequest.getCorreoElectronico());
        usuario.setDireccion(usuarioRequest.getDireccion());

        // 🔹 Cargar de nuevo las relaciones
        usuario.setRol(rolRepository.findById(usuarioRequest.getIdRol())
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado")));
        usuario.setTipo_de_documento(tipoDocumentoRepository.findById(usuarioRequest.getIdTipoDeDocumento())
                .orElseThrow(() -> new ResourceNotFoundException("TipoDocumento no encontrado")));
        usuario.setEstado_usuario(estadoUsuarioRepository.findById(usuarioRequest.getIdEstadoUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("EstadoUsuario no encontrado")));

        Usuario usuarioActualizado = usuarioRepository.save(usuario);
        return ResponseEntity.ok(usuarioActualizado);
    }

    // Eliminar usuario
    // Solo el administrador puede eliminar usuarios
    @PreAuthorize("hasAuthority('administrador')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarUsuario(@PathVariable Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El usuario con ese ID no existe: " + id));

        usuarioRepository.delete(usuario);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}