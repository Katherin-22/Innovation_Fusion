const BannerCarousel = ({ banners }) => {
  if (!banners || banners.length === 0) return null;

  return (
    <div
      id="carouselBanners"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`carousel-item ${index === 0 ? "active" : ""}`}
          >
            <img
              src={`http://localhost:8080${banner.url}`} // se construye la URL
              className="d-block w-100"
              alt={banner.titulo || `Banner ${index + 1}`}
              style={{ height: "400px", objectFit: "cover" }}
            />
            {(banner.titulo || banner.descripcion) && (
              <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
                {banner.titulo && <h5>{banner.titulo}</h5>}
                {banner.descripcion && <p>{banner.descripcion}</p>}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselBanners"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Anterior</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselBanners"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Siguiente</span>
      </button>
    </div>
  );
};

export default BannerCarousel;
