import React from 'react';

export function AboutPage() {
  const features = [
    { icon:"📚", title:"Catálogo Extenso", text:"Accede a libros de todas las categorías: clásicos, ciencia ficción, fantasía, historia y mucho más." },
    { icon:"⏱️", title:"Alquiler Flexible", text:"Alquila libros por 7, 14, 21 o 30 días y extiende el plazo cuando lo necesites." },
    { icon:"🔍", title:"Búsqueda Inteligente", text:"Encuentra cualquier libro por título, autor, ISBN, categoría, idioma o descripción." },
    { icon:"⭐", title:"Reseñas y Valoraciones", text:"Consulta opiniones de otros lectores antes de elegir tu próximo libro." },
    { icon:"📱", title:"Acceso Universal", text:"Disponible en cualquier dispositivo, en cualquier momento y lugar." },
    { icon:"🔒", title:"Sin Registro Obligatorio", text:"Navega y alquila de forma anónima. Tu privacidad es nuestra prioridad." },
  ];
  return (
    <div className="about-page page">
      <div className="container">
        <div className="about-hero">
          <h1 className="about-hero__title">Nuestra Biblioteca</h1>
          <p style={{ color:"rgba(255,255,255,0.6)", maxWidth:"460px", margin:"0 auto", fontSize:"1rem" }}>
            Una plataforma moderna para conectar lectores con el conocimiento. Miles de libros, un solo lugar.
          </p>
        </div>
        <h2 className="section-title">¿Qué ofrecemos?</h2>
        <p className="section-subtitle">Todo lo que necesitas para disfrutar de la lectura</p>
        <div className="about-grid">
          {features.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
