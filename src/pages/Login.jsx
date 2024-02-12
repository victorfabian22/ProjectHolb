
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import LoginForm from "../components/LoginForm.jsx"; 
import { Link, useNavigate } from 'react-router-dom'; // Importa Link y useNavigate


const Login = () => {

  const navigate = useNavigate(); // Inicializa useNavigate

  
  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Login</h2>
          
            <LoginForm />
            <p className="text-center mt-3">
            ¿No tienes cuenta?{' '}
            <Link to="/register">Regístrate</Link> {/* Enlace para redirigir a la página de registro */}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
