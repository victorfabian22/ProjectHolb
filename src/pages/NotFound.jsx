import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center" style={{ height: '100vh' }}>
      <h1 className="mb-4">404 Not Found</h1>
      <p className="mb-4">La página que buscas no se encuentra.</p>
      <Link to="/" className="btn btn-primary">Volver al inicio</Link>
    </div>
  );
}

export default NotFound;
