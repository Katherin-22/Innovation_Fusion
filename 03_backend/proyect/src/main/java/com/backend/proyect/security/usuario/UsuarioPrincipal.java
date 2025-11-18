package com.backend.proyect.security.usuario;

import com.backend.proyect.model.usuario.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import java.util.Collection;
import java.util.Collections;

public class UsuarioPrincipal implements UserDetails {

    private final Usuario usuario;

    public UsuarioPrincipal(Usuario usuario) {
        this.usuario = usuario;
    }

    // 🔑 MÉTODO CLAVE: Convierte el RolEnum del usuario a la GrantedAuthority que Spring Security entiende.
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String roleName = usuario.getRol().getNombreRol().toString();
        // Genera la autoridad EXACTA que espera @PreAuthorize: "ROLE_ADMINISTRADOR"
        return Collections.singletonList(
                new SimpleGrantedAuthority("ROLE_" + roleName.toUpperCase())
        );
    }

    // --- Métodos Delegados ---
    // Usamos el correo como nombre de usuario para el login
    @Override
    public String getUsername() { return usuario.getCorreoElectronico(); }

    @Override
    public String getPassword() { return usuario.getPassword(); }

    // Por ahora, asumimos que todas las cuentas están activas, no expiradas, ni bloqueadas.
    @Override
    public boolean isAccountNonExpired() { return true; }

    @Override
    public boolean isAccountNonLocked() { return true; }

    @Override
    public boolean isCredentialsNonExpired() { return true; }

    @Override
    public boolean isEnabled() { return true; }

    // Método de acceso para obtener la entidad Usuario si es necesario en el controlador.
    public Usuario getUsuario() { return usuario; }

}
