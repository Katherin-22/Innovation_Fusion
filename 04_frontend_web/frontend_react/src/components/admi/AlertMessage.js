import React, { useEffect, useState } from "react";

export default function AlertMessage({ type, icon, message, duration = 3000 }) {
  const [visible, setVisible] = useState(true);

  // Oculta el alert automáticamente después del tiempo indicado
  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  return (
    <>

      {/* Alerta con animación */}
      <div
        className={`alert alert-${type} d-flex align-items-center fade show`}
        role="alert"
        style={{
          position: "fixed",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1050,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
      <div className="bi flex-shrink-0 me-2" role="alert" aria-label={type}></div>
        <div>{message}</div>
      </div>
    </>
  );
}
