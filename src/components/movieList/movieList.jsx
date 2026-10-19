import React, { useEffect, useState } from "react"
import "./movieList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const MovieList = () => {

    const [movieList, setMovieList] = useState([]);
    const { type } = useParams()

    useEffect(() => {
        getData()
    }, [type])

    const getData = () => {
        const apiKey = (import.meta.env.VITE_TMDB_API_KEY || '').trim();
        fetch(`https://api.themoviedb.org/3/movie/${type ? type : "popular"}?api_key=${apiKey}&language=en-US`)
            .then(res => res.json())
            .then(data => setMovieList(data.results || []))
            .catch(err => console.error("Error fetching movie list: ", err));
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">{(type ? type : "POPULAR").toUpperCase()}</h2>
            <div className="list__cards">
                {
                    movieList && movieList.map(movie => (
                        <Cards key={movie.id} movie={movie} />
                    ))
                }
            </div>
        </div>
    )


}

export default MovieList
