package com.gestion_usuarios.gestion_usuarios_backend.security;

import com.gestion_usuarios.gestion_usuarios_backend.model.Usuario;
import com.gestion_usuarios.gestion_usuarios_backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        // Ignorar las rutas de autenticación
        if (request.getServletPath().startsWith("/api/auth/")) {
            filterChain.doFilter(request, response);
            return;
        }

        // Si no hay cabecera o no es un Bearer token, continuar la cadena sin autenticar
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        String token = authHeader.substring(7);
        String correo;

        try {
            correo = jwtUtil.extractUsername(token);
            // Si el correo es nulo o el contexto ya tiene autenticación, pasamos al siguiente filtro.
            if (correo == null || SecurityContextHolder.getContext().getAuthentication() != null) {
                filterChain.doFilter(request, response);
                return;
            }

            // Buscar al usuario en la base de datos
            Optional<Usuario> usuarioOpt = usuarioRepository.findByCorreoElectronico(correo);

            if (usuarioOpt.isPresent() && jwtUtil.isTokenValid(token, correo)) {
                // Si el token es válido, autenticar
                Usuario usuario = usuarioOpt.get();
                UsernamePasswordAuthenticationToken authToken =
                        new UsernamePasswordAuthenticationToken(usuario, null, null);
                authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(authToken);
            }
        } catch (Exception e) {
            // En caso de cualquier error (token inválido, expirado, etc.),
            // el filtro no continúa la cadena y la solicitud es rechazada con un 401 Unauthorized.
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        filterChain.doFilter(request, response);
    }
}