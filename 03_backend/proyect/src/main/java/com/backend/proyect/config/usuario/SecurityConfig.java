package com.backend.proyect.config.usuario;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.proyect.security.usuario.JwtFilter;

import java.util.stream.Collectors;

@Configuration
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(csrf -> csrf.disable()) // desactiva CSRF
                .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**", "/publico/**", "/uploads/**").permitAll() // login y registro públicos
                //para pruebas
                .requestMatchers("/categoria", "/categoria/{idCategoria}", "/promocion", "/stock/{idProducto}", "stock/variaciones/{idProducto}", "/stock/{idStock}", "/producto/{idProducto}/stock/{idStock}", "/promocion/{idPromocion}", "/productos", "/producto", "/producto/{idProducto}", "/producto/{idProducto}/imagenes","/producto/{idProducto}/imagen/{idImagen}", "/color", "/color/{idColor}", "/imagen/{idImagen}", "/marca","/marca/{idMarca}" , "/material/{idMaterial}", "/material","/api/banners").permitAll() // login y registro públicos
                .anyRequest().authenticated() // lo demás requiere autenticación
                )
                .sessionManagement(session -> session
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // sin sesiones
                )
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
        return authConfig.getAuthenticationManager();
    }

    @Bean
    public GrantedAuthoritiesMapper grantedAuthoritiesMapper() {
        return (authorities) -> authorities.stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                .collect(Collectors.toSet());
    }

}
