import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../services/AuthContext.jsx';
import { toast, ToastContainer} from 'react-toastify';
import { Collapse, Button } from 'react-bootstrap';

const MovieList = () => {
  const { authenticated, user } = useAuth(); // Obtén el estado de autenticación del contexto

  const [movies, setMovies] = useState([]);
  const [watchLaterList, setWatchLaterList] = useState([]); // Estado para almacenar las películas a ver más tarde
  const [openOverviewId, setOpenOverviewId] = useState(null); // Estado para el id de la película con el overview expandido

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=5810176388f836ee0eb0bcc37d5e29ba`
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchData();
  }, []);

  const img_300 = 'https://image.tmdb.org/t/p/w300';
  const unavailable =
    'https://www.movienewz.com/img/films/poster-holder.jpg';

  // Función para agregar una película a la lista de "Ver más tarde"
  const addToWatchLater = async (movie) => {
    try {
      // Envía una solicitud POST al endpoint de creación de películas
      await axios.post('http://localhost:8000/api/movies/', {
        title: movie.title || movie.name,
        poster_path: movie.poster_path,
        overview: movie.overview,
        release_date: movie.release_date,
        vote_average: movie.vote_average,
        user: user.id // Pasa el ID del usuario
      });
      console.log(user.id);
      toast.success('¡Película añadida a la lista de ver más tarde!');

      console.log('¡Película añadida a la lista de ver más tarde!');
      setWatchLaterList([...watchLaterList, movie]);

    } catch (error) {
      toast.error('¡Error al añadir película a la lista de ver más tarde!');

      console.error('Error adding movie to watch later:', error);

    }
  };

  return (
    <div className="container">
      <div className="row">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="col-md-3 col-sm-4 py-3 d-flex justify-content-center g-4"
            id="card"
          >
            <div className="card bg-dark" key={movie.id}>
              <img
                src={movie.poster_path ? `${img_300}/${movie.poster_path}` : unavailable}
                className="card-img-top pt-3 pb-0 px-3"
                alt={movie.title}
              />
              <div className="card-body">
                <h5 className="card-title text-center fs-5  text-white">{movie.title || movie.name}</h5>
                <div className="d-flex fs-6 align-items-center justify-content-between text-white">
                  <div>{movie.first_air_date || movie.release_date}</div>
                  <div>{`Rating: ${movie.vote_average}`}</div>
                  
                </div>
                
                <Collapse in={openOverviewId === movie.id}>
                  <div className="overview">
                    <p className="text-white">{movie.overview}</p>
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
                {/* Mostrar botón "Ver más tarde" solo si el usuario está autenticado */}
                {authenticated ? (
                  
                  <>
                  <button
                    className="btn btn-primary"
                    onClick={() => addToWatchLater(movie)}
                  >
                    Ver más tarde
                  </button>
                  
                  </>
                ) : (
                  // Si el usuario no está autenticado, mostrar un enlace para registrarse
                  <Link to="/login">
                    <button className="btn btn-primary">
                      Logeate para ver mas tarde
                    </button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default MovieList;
