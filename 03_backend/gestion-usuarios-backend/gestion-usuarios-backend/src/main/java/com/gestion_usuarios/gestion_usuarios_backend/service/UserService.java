package com.gestion_usuarios.gestion_usuarios_backend.service;

import com.gestion_usuarios.gestion_usuarios_backend.model.Usuario;
import com.gestion_usuarios.gestion_usuarios_backend.repository.UsuarioRepository;
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

    // Verificar contraseñas
    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    // Buscar usuario por correo electrónico
    public Optional<Usuario> findByCorreoElectronico(String correo) {
        return usuarioRepository.findByCorreoElectronico(correo);
    }
}
