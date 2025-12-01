package com.backend.proyect.config.usuario;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.backend.proyect.security.usuario.JwtFilter;


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

                .cors(Customizer.withDefaults())

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/v3/api-docs/**", "/swagger-ui/**", "/swagger-ui.html").permitAll()  // swagger

                        .requestMatchers("/api/auth/**").permitAll() // login y registro públicos

                        .requestMatchers("/publico/**").permitAll()

                        .requestMatchers("/uploads/**").permitAll()

                        // Endpoints públicos para clientes
                        .requestMatchers("/publico/**").permitAll()

                        // Endpoints de administración - requieren autenticación de admin
                        .requestMatchers(
                                "/categoria",
                                "/categoria/*",
                                "/promocion",
                                "/promocion/*",
                                "/productos", // lista completa para admin
                                "/producto", // crear
                                "/producto/*", // actualizar, eliminar
                                "/color",
                                "/color/*",
                                "/marca",
                                "/marca/*",
                                "/material",
                                "/material/*",
                                "/api/banners/*"
                        ).hasAuthority("ROLE_ADMINISTRADOR")

                        // Endpoints de productos para clientes
                        .requestMatchers(
                                "/producto/*/imagenes",
                                "/producto/*/imagen/*"
                        ).permitAll()

                        // Endpoints del carrito - requieren autenticación
                        .requestMatchers("/api/carrito/**").authenticated()

                        // Endpoints de pedidos - requieren autenticación
                        .requestMatchers("/api/pedidos/**").authenticated()

                        // Endpoints de favoritos - requieren autenticación
                        .requestMatchers("/api/favoritos/**").authenticated()

                        .requestMatchers("/api/usuarios/perfil").authenticated()

                        .requestMatchers("/api/usuarios", "/api/usuarios/{id}").hasAuthority("ROLE_ADMINISTRADOR") //Rutas de Administración (Requieren el rol explícito)

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

}