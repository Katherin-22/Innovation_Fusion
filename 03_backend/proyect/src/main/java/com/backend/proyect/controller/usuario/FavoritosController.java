package com.backend.proyect.controller.usuario;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.backend.proyect.model.productos.Producto;
import com.backend.proyect.model.usuario.Favoritos;
import com.backend.proyect.model.usuario.Usuario;
import com.backend.proyect.security.usuario.JwtUtil;
import com.backend.proyect.service.usuario.FavoritosService;
import com.backend.proyect.service.usuario.UserService;

@RestController
@RequestMapping("/api/favoritos")
public class FavoritosController {

    private final FavoritosService favoritosService;
    private final UserService userService;
    private final JwtUtil jwtUtil;

    public FavoritosController(FavoritosService favoritosService, UserService userService, JwtUtil jwtUtil) {
        this.favoritosService = favoritosService;
        this.userService = userService;
        this.jwtUtil = jwtUtil;
    }

    private Usuario getCurrentUser(String token) {
        String email = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        return userService.findByCorreoElectronico(email).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
    }

    @GetMapping
    public ResponseEntity<List<Favoritos>> getFavoritos(@RequestHeader("Authorization") String token) {
        Usuario usuario = getCurrentUser(token);
        List<Favoritos> favoritos = favoritosService.getFavoritos(usuario);
        return ResponseEntity.ok(favoritos);
    }

    @PostMapping
    public ResponseEntity<Favoritos> agregarFavorito(
            @RequestHeader("Authorization") String token,
            @RequestBody AgregarFavoritoRequest request) {
        Usuario usuario = getCurrentUser(token);
        Producto producto = new Producto(); producto.setIdProducto(request.getIdProducto());
        Favoritos favorito = favoritosService.agregarFavorito(usuario, producto);
        return ResponseEntity.ok(favorito);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarFavorito(@PathVariable Integer id) {
        favoritosService.eliminarFavorito(id);
        return ResponseEntity.noContent().build();
    }

    // DTO interno
    public static class AgregarFavoritoRequest {
        private Integer idProducto;
        public Integer getIdProducto() { return idProducto; }
        public void setIdProducto(Integer idProducto) { this.idProducto = idProducto; }
    }
}