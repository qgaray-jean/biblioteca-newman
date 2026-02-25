import React from 'react';

export function StarRating({ rating }) {
  return (
    <span style={{ color:"#c8860a", fontSize:"0.82rem" }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5-Math.round(rating))}
      <span style={{ marginLeft:"0.3rem", opacity:0.65 }}>{rating.toFixed(1)}</span>
    </span>
  );
}
