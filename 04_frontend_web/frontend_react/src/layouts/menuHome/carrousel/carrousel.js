
const Banner = () => {
  return (
    <div
      id="carouselExampleAutoplaying"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/banner_prueba/oferta3.jpg"
            className="d-block w-100"
            alt="Oferta 1"
          />
        </div>
        <div className="carousel-item">
          <img
            src="/banner_prueba/oferta1.jpeg"
            className="d-block w-100"
            alt="Oferta 2"
          />
        </div>
        <div className="carousel-item">
          <img
            src="/banner_prueba/oferta2.jpeg"
            className="d-block w-100"
            alt="Oferta 3"
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Banner;
