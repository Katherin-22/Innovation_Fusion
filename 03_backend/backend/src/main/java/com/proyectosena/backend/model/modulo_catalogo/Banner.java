    package com.proyectosena.backend.model.modulo_catalogo;

    import jakarta.persistence.Entity;
    import jakarta.persistence.GeneratedValue;
    import jakarta.persistence.GenerationType;
    import jakarta.persistence.Id;

    import lombok.AllArgsConstructor;
    import lombok.Getter;
    import lombok.NoArgsConstructor;
    import lombok.Setter;


    @Entity
    @Getter @Setter @NoArgsConstructor @AllArgsConstructor
    public class Banner{
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long id;

        private String titulo;
        private String descripcion;
        private String imagenUrl;  // se mapea con "imagen_url"

        private String fileName;
        private String url;
    }
