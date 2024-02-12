import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Collapse } from 'react-bootstrap';
import { toast, ToastContainer} from 'react-toastify'; // Importa toast

import axios from 'axios';

const WatchList = () => {
  const [movies, setMovies] = useState([]);
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [openOverviewId, setOpenOverviewId] = useState(null); // Estado para el id de la película con el overview expandido

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const token = localStorage.getItem('token'); // Obtener el token de autenticación del almacenamiento local
        const config = {
          headers: {
            Authorization: `Token ${token}` // Configurar el token en la cabecera de la solicitud
          }
        };
        const response = await axios.get('http://localhost:8000/api/user-movies/', config);
        setMovies(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  const markAsWatched = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      await axios.put(`http://localhost:8000/api/update/${movieId}/`, { seen: true }, config);
      setMovies(prevMovies =>
        prevMovies.map(movie => (movie.id === movieId ? { ...movie, seen: true } : movie))
      );
      toast.success('¡Película marcada como vista correctamente!');
    } catch (error) {
      console.error('Error marking movie as watched:', error);
    }
  };

  const removeFromWatchList = async (movieId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Token ${token}`
        }
      };
      await axios.delete(`http://localhost:8000/api/movies/${movieId}/`, config);
      setMovies(movies.filter(movie => movie.id !== movieId)); // Eliminar la película de la lista localmente
      console.log("pelicula borrada correctamente");
      toast.success('¡Película borrada correctamente!');

    } catch (error) {
      console.error('Error removing movie from watch list:', error);
    }
  };

  const img_300 = 'https://image.tmdb.org/t/p/w300';

  return (
    <Container>
      <h2 className="text-center mt-5 mb-4">Lista de películas para ver</h2>
      {movies.length < 0 ? (
        <p className="text-center">Todavía no tienes películas en tu lista.</p>
      ) : (
        <Row>
          {movies.map((movie) => (
            <Col key={movie.id} md={4}>
              <div className="card mb-4">
                <img
                    src={movie.poster_path ? `${img_300}/${movie.poster_path}` : unavailable}
                    className="card-img-top pt-3 pb-0 px-3"
                    alt={movie.title}
                  />
                <div className="card-body">
                  <h5 className="card-title">{movie.title}</h5>
                  <p className="card-text">Descripción de la película: {movie.description}</p>
                  <p className="card-text">Rating: {movie.vote_average}</p>

                  <p className="card-text">Vista: {movie.seen ? 'Sí' : 'No'}</p>
                  <Collapse in={openOverviewId === movie.id}>
                    <div className="overview">
                      <p>{movie.overview}</p>
                    </div>
                  </Collapse>
                  <Button
                    onClick={() => setOpenOverviewId(openOverviewId === movie.id ? null : movie.id)}
                    aria-controls="example-collapse-text"
                    aria-expanded={openOverviewId === movie.id}
                    variant="outline-primary"
                  >
                    {openOverviewId === movie.id ? 'Cerrar' : 'Sinopsis'}
                  </Button>
                  <br></br>
                  <Button variant="primary" onClick={() => markAsWatched(movie.id)}>Marcar como vista</Button>
                  <Button variant="danger" className="ms-2" onClick={() => removeFromWatchList(movie.id)}>Eliminar de la lista</Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}
       <ToastContainer />
    </Container>
  );
};

export default WatchList;
