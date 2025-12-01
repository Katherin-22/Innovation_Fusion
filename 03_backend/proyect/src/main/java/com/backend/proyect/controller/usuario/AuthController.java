package com.backend.proyect.controller.usuario;

import com.backend.proyect.dto.usuario.UsuarioRequest;
import com.backend.proyect.exception.usuario.ResourceNotFoundException;
import com.backend.proyect.model.usuario.EstadoUsuario;
import com.backend.proyect.model.usuario.Rol;
import com.backend.proyect.model.usuario.TipoDocumento;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.repository.usuario.EstadoUsuarioRepository;
import com.backend.proyect.repository.usuario.RolRepository;
import com.backend.proyect.repository.usuario.TipoDocumentoRepository;
import com.backend.proyect.repository.usuario.UsuarioRepository;
import com.backend.proyect.security.usuario.JwtUtil;
import com.backend.proyect.service.usuario.UserService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    private final UsuarioRepository usuarioRepository;
    private final RolRepository rolRepository;
    private final TipoDocumentoRepository tipoDocumentoRepository;
    private final EstadoUsuarioRepository estadoUsuarioRepository;
    private final JwtUtil jwtUtil;

    public AuthController(UserService userService,
                          UsuarioRepository usuarioRepository,
                          RolRepository rolRepository,
                          TipoDocumentoRepository tipoDocumentoRepository,
                          EstadoUsuarioRepository estadoUsuarioRepository,
                          JwtUtil jwtUtil) {

        this.userService = userService;
        this.usuarioRepository = usuarioRepository;
        this.rolRepository = rolRepository;
        this.tipoDocumentoRepository = tipoDocumentoRepository;
        this.estadoUsuarioRepository = estadoUsuarioRepository;
        this.jwtUtil = jwtUtil;
    }

    // Registrar usuario
    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody UsuarioRequest usuarioRequest) {

        // Buscar las entidades por ID, si no existen, lanza una excepción
        Rol rol = rolRepository.findById(usuarioRequest.getIdRol())
                .orElseThrow(() -> new ResourceNotFoundException("Rol no encontrado"));

        TipoDocumento tipoDocumento = tipoDocumentoRepository.findById(usuarioRequest.getIdTipoDeDocumento())
                .orElseThrow(() -> new ResourceNotFoundException("Tipo de documento no encontrado"));

        EstadoUsuario estadoUsuario = estadoUsuarioRepository.findById(usuarioRequest.getIdEstadoUsuario())
                .orElseThrow(() -> new ResourceNotFoundException("Estado de usuario no encontrado"));

        // Crear la entidad Usuario
        Usuario usuario = new Usuario();
        usuario.setNumeroDocumento(usuarioRequest.getNumeroDocumento());
        usuario.setNombreUsuario(usuarioRequest.getNombreUsuario());
        usuario.setPrimerApellido(usuarioRequest.getPrimerApellido());
        usuario.setSegundoApellido(usuarioRequest.getSegundoApellido());
        usuario.setTelefono(usuarioRequest.getTelefono());
        usuario.setPassword(usuarioRequest.getPassword());
        usuario.setCorreoElectronico(usuarioRequest.getCorreoElectronico());
        usuario.setDireccion(usuarioRequest.getDireccion());

        // Asignar los objetos de las entidades a la entidad principal
        usuario.setRol(rol);
        usuario.setTipo_de_documento(tipoDocumento);
        usuario.setEstado_usuario(estadoUsuario);

        Usuario saved = userService.register(usuario);

        Map<String, Object> userData = Map.of(
                "id", saved.getIdUsuario(),
                "nombre", saved.getNombreUsuario(),
                "email", saved.getCorreoElectronico()
        );

        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Usuario registrado con éxito");
        response.put("data", userData);

        return ResponseEntity.ok(response);
    }

    // Login con JWT
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String email = body.get("email");
        String password = body.get("password");

        if (email == null || password == null) {
            throw new IllegalArgumentException ("Email y la contraseña son requeridos");
        }

        Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreoElectronico(email);
        if (usuarioOpt.isEmpty()) {
            throw new ResourceNotFoundException("El email no existe");
        }

        Usuario usuario = usuarioOpt.get();
        Map<String, Object> response = new HashMap<>();

        if (userService.checkPassword(password, usuario.getPassword())) {
            String token = jwtUtil.generateToken(usuario);

            Map<String, Object> userData = Map.of(
                    "id", usuario.getIdUsuario(),
                    "nombre", usuario.getNombreUsuario(),
                    "email", usuario.getCorreoElectronico(),
                    "rol", usuario.getRol().getIdRol()
            );

            response.put("success", true);
            response.put("message", "Usuario autenticado");
            response.put("data", userData);
            response.put("token", token);

            return ResponseEntity.ok(response);
        } else {
            response.put("success", false);
            response.put("message", "Contraseña incorrecta");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }
}
