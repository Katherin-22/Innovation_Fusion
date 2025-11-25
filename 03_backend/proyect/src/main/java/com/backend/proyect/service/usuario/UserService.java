package com.backend.proyect.service.usuario;

import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.repository.usuario.UsuarioRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service

public class UserService {

    private final UsuarioRepository usuarioRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    public UserService(UsuarioRepository usuarioRepository, BCryptPasswordEncoder passwordEncoder) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // Registrar usuario con contraseña encriptada
    public Usuario register(Usuario usuario) {

        Optional<Usuario> existente = usuarioRepository.findByCorreoElectronico(usuario.getCorreoElectronico());

        if (existente.isPresent()) {
            throw new RuntimeException("El correo ya está registrado: " + usuario.getCorreoElectronico());
        }

        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));
        return usuarioRepository.save(usuario);
    }

    // conexion con el metodo que encripta las contraseñas
    public String encodePassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    // Verificar contraseñas
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    // Buscar usuario por correo electrónico
    public Optional<Usuario> findByCorreoElectronico(String correo) {
        return usuarioRepository.findByCorreoElectronico(correo);
    }
}
