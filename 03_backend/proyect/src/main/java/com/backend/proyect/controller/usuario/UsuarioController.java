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
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.backend.proyect.security.usuario.UsuarioPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    // ----------------------------------------------------------------------
    // 1. GESTIÓN DE PERFIL PROPIO DEL USUARIO
    // ----------------------------------------------------------------------

    /**
     * Endpoint para ver el perfil del usuario logeado (GET /api/usuarios/perfil).
     */
    @GetMapping("/perfil")
    public ResponseEntity<Usuario> verMiPerfil() {
        // 1. Obtener el objeto Authentication del contexto de seguridad
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 2. El 'principal' es el objeto Usuario que colocamos en el JwtFilter
        // Esto evita una consulta extra por correo electrónico.
        UsuarioPrincipal usuarioPrincipalWrapper = (UsuarioPrincipal) authentication.getPrincipal();
        Usuario usuarioLogeado = usuarioPrincipalWrapper.getUsuario(); // Obtener la entidad Usuario real

        // 3. Buscar el usuario completo por ID para asegurar datos frescos
        Usuario usuario = usuarioRepository.findById(usuarioLogeado.getIdUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Usuario logeado no encontrado."));

        // 4. Devolver el usuario
        return ResponseEntity.ok(usuario);
    }

    /**
     * Endpoint para actualizar el perfil del usuario logeado (PUT /api/usuarios/perfil).
     */
    @PutMapping("/perfil")
    public ResponseEntity<Usuario> actualizarMiPerfil(@RequestBody UsuarioRequest usuarioRequest) {
        // 1. Obtener el ID del usuario logeado del contexto de seguridad
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        UsuarioPrincipal usuarioPrincipalWrapper = (UsuarioPrincipal) authentication.getPrincipal();
        Usuario usuarioLogeado = usuarioPrincipalWrapper.getUsuario();
        Integer idUsuarioLogeado = usuarioLogeado.getIdUsuario();

        // 2. Buscar al usuario existente
        Usuario usuarioExistente = usuarioRepository.findById(idUsuarioLogeado)
                .orElseThrow(() -> new ResourceNotFoundException("Usuario logeado no encontrado para actualizar."));

        usuarioExistente.setNumeroDocumento(usuarioRequest.getNumeroDocumento());
        usuarioExistente.setNombreUsuario(usuarioRequest.getNombreUsuario());
        usuarioExistente.setPrimerApellido(usuarioRequest.getPrimerApellido());
        usuarioExistente.setSegundoApellido(usuarioRequest.getSegundoApellido());
        usuarioExistente.setTelefono(usuarioRequest.getTelefono());
        usuarioExistente.setCorreoElectronico(usuarioRequest.getCorreoElectronico());
        usuarioExistente.setDireccion(usuarioRequest.getDireccion());

        // 💡 Permitir al usuario cambiar su propia contraseña
        if (usuarioRequest.getPassword() != null && !usuarioRequest.getPassword().isEmpty()) {
            usuarioExistente.setPassword(userService.encodePassword(usuarioRequest.getPassword()));
        }

        // 🔹 Cargar las tablas con el id
        usuarioExistente.setRol(rolRepository.findById(usuarioExistente.getRol().getIdRol())
                .orElseThrow(() -> new ResourceNotFoundException("Rol del usuario no encontrado")));
        usuarioExistente.setTipo_de_documento(tipoDocumentoRepository.findById(usuarioExistente.getTipo_de_documento().getIdTipoDeDocumento())
                .orElseThrow(() -> new ResourceNotFoundException("TipoDocumento del usuario no encontrado")));
        usuarioExistente.setEstado_usuario(estadoUsuarioRepository.findById(usuarioExistente.getEstado_usuario().getIdestado_usuario())
                .orElseThrow(() -> new ResourceNotFoundException("EstadoUsuario del usuario no encontrado")));


        // 5. Guardar y devolver el usuario actualizado
        Usuario usuarioActualizado = usuarioRepository.save(usuarioExistente);
        return ResponseEntity.ok(usuarioActualizado);
    }

    // ----------------------------------------------------------------------
    // 2. GESTIÓN DE USUARIOS POR ADMINISTRADOR Y USUARIO
    // ----------------------------------------------------------------------

    // Ver todos los usuarios
    // El administrador puede ver a todos los usuarios
    @PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    @GetMapping
    public List<Usuario> listarUsuarios() {
        return usuarioRepository.findAll();
    }

    // Ver usuario por ID
    // El administrador puede ver cualquier usuario por ID.
    // Un cliente solo puede ver su propio perfil
    @PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR') or #id.equals(authentication.principal.getUsuario().idUsuario)")
    @GetMapping("/{id}")
    public ResponseEntity<Usuario> listarUsuarioPorId(@PathVariable Integer id) {
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
    @PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR') or #id.equals(authentication.principal.getUsuario().idUsuario)")
    @PutMapping("/{id}")
    public ResponseEntity<Usuario> actualizarUsuario(@PathVariable Integer id, @RequestBody UsuarioRequest usuarioRequest) {

        Optional<Usuario> optionalUsuario = usuarioRepository.findById(id);

        if (optionalUsuario.isEmpty()) {
            // Retorna 404 si el usuario con ese ID no existe
            return ResponseEntity.notFound().build();
        }

        Usuario usuarioExistente = optionalUsuario.get();

        usuarioExistente.setNumeroDocumento(usuarioRequest.getNumeroDocumento());
        usuarioExistente.setNombreUsuario(usuarioRequest.getNombreUsuario());
        usuarioExistente.setPrimerApellido(usuarioRequest.getPrimerApellido());
        usuarioExistente.setSegundoApellido(usuarioRequest.getSegundoApellido());
        usuarioExistente.setTelefono(usuarioRequest.getTelefono());
        usuarioExistente.setPassword(usuarioRequest.getPassword());
        usuarioExistente.setCorreoElectronico(usuarioRequest.getCorreoElectronico());
        usuarioExistente.setDireccion(usuarioRequest.getDireccion());

        // 🔹 Cargar de nuevo las relaciones
        usuarioExistente.setRol(rolRepository.findById(usuarioRequest.getIdRol())
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado")));
        usuarioExistente.setTipo_de_documento(tipoDocumentoRepository.findById(usuarioRequest.getIdTipoDeDocumento())
                .orElseThrow(() -> new ResourceNotFoundException("TipoDocumento no encontrado")));
        usuarioExistente.setEstado_usuario(estadoUsuarioRepository.findById(usuarioRequest.getIdEstadoUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("EstadoUsuario no encontrado")));

        Usuario usuarioActualizado = usuarioRepository.save(usuarioExistente);
        return ResponseEntity.ok(usuarioActualizado);
    }

    // Eliminar usuario
    // Solo el administrador puede eliminar usuarios
    @PreAuthorize("hasAuthority('ROLE_ADMINISTRADOR')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarUsuario(@PathVariable Integer id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("El usuario con ese ID no existe: " + id));

        usuarioRepository.delete(usuario);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }

}