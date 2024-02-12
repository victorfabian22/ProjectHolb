import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext.jsx'; // Importa useAuth
import { useNavigate } from 'react-router-dom'; // Importa useNavigate

const Navbar = () => {

  const { authenticated, logout, user  } = useAuth(); // Obtiene el estado de autenticación y la función de logout del contexto de autenticación

  const navigate = useNavigate();
  
  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/auth/user_logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${localStorage.getItem('token')}` // Agrega el token de autenticación
        },
      });

      if (response.ok) {
        logout();
        navigate('/movies');

      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">PelisCRUD</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/movies" className="nav-link">Ver catálogo</Link>
            </li>
            
            {authenticated ? (

              
              <>
              <li className="nav-item">
                  <span className="nav-link">Bienvenido, {user.username}</span>
                </li>
              
              <li className="nav-item">
                <Link to="/watch_list" className="nav-link">Mi lista</Link>
              </li>

              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button>
              </li>
              </>

              
            ) : (
              <>
              <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
              </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
