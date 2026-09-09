import React, { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { Link, useParams } from 'react-router-dom';
import MovieList from '../../components/movieList/movieList';
import './home.css';


const Home = () => {
  const [popularMovies, setpopularMovies] = useState([])
  const { type } = useParams()

  useEffect(() => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_TMDB_API_KEY}&language=en-US&page=1')
      .then(res => res.json())
      .then(data => {
        setpopularMovies(data.results);
      })
      .catch(err => console.error("Error fetching data: ", err));
  }, []);

  return (
    <>
      <div className="poster">
        {popularMovies.length > 0 && (
          <Carousel
            showThumbs={false}
            autoPlay={true}
            transitionTime={500}
            interval={3000}
            infiniteLoop={true}
            showStatus={false}
          >
            {popularMovies.map(movie => (
              <Link key={movie.id} to={`/movie/${movie.id}`}>
                <div className="posterImage_container">
                  <div className="posterImage">
                    <img src={`https://image.tmdb.org/t/p/original/${movie && movie.backdrop_path}`} alt={movie ? movie.title : "Poster"} />
                  </div>
                  <div className="posterImage__overlay">
                    <div className="posterImage__title">
                      {movie ? movie.title : ""} 
                    </div>
                    <div className="posterImage__runtime">
                      <span className="posterImage__date">
                        <i className="fas fa-calendar-alt" /> {movie ? movie.release_date : ""}
                      </span>
                      <span className="posterImage__rating">
                        {movie ? movie.vote_average : ""}
                        <i className="fas fa-star" />
                      </span>
                    </div>
                    <div className="posterImage__description">
                      {movie ? movie.overview : ""}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </Carousel>
        )}
        <MovieList />
      </div>
    </>
  );
};

export default Home;
