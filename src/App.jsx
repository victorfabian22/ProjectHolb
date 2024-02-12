
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import WatchList from './pages/WatchList.jsx';
import NotFound from './pages/NotFound.jsx';

import MovieList from './components/MovieList.jsx'; // Ajusta la ruta de importación según la ubicación real de tu página de inicio de sesión
import Navbar from './components/Navbar.jsx'; // Ajusta la ruta de importación según la ubicación real de tu página de inicio de sesión

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movies" element={<MovieList />} />
        <Route path="/watch_list" element={<WatchList />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>

  )
}

export default App
