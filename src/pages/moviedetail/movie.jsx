import React, { useEffect, useState } from "react"
import "./movie.css"
import { useParams } from "react-router-dom"

const Movie = () => {
    const [currentMovieDetail,setMovie] = useState()
    const {id} = useParams()

    useEffect (()=> {
        getData()
        window.scrollTo(0,0)
    },[id])

    const getData = () => {
        const apiKey = (import.meta.env.VITE_TMDB_API_KEY || '').trim();
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US&page=1`)
            .then(res => res.json())
            .then(data => setMovie(data))
            .catch(err => console.error("Error fetching movie detail: ", err));
    }

    return (
        <div className="movie">
            <div className="movie_intro">
                <img src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`}  className="movie_backdrop" />
            </div>
            <div className="movie_detail">
                <div className="movie_detailLeft">
                    <div className="movie_posterBox">
                        <img src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`}  className="movie_poster" />
                    </div>
                </div>
                <div className="movie_detailRight">
                    <div className="moviedetailRightTop">
                        <div className="movie_name">
                            {currentMovieDetail ? currentMovieDetail.original_title : ""}
                        </div>
                        <div className="movie_tagline">
                            {currentMovieDetail ? currentMovieDetail.tagline : ""}
                        </div>
                        <div className="movie_rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average : ""}
                            <i className="fas fa-star"/>
                            <span className="movie_voteCount">
                                {currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}
                            </span>
                        </div>
                        <div className="movie_runtime">
                            {currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}
                        </div>
                        <div className="movie_genres">
                            {currentMovieDetail && currentMovieDetail.genres ? currentMovieDetail.genres.map(genre => (
                                <span className="movie_genre" key={genre.id}>{genre.name}</span>
                            )): ""}
                        </div>
                    </div>
                    <div className="movie_detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>
                            {currentMovieDetail ? currentMovieDetail.overview : ""}
                        </div>
                    </div>

                </div>
                <div className="movie_links">
                    <div className="movie_heading">Useful Links</div>
                    {currentMovieDetail &&currentMovieDetail.homepage && 
                    <a href = {currentMovieDetail.homepage} 
                    target="_blank" style={{textDecoration: "none"}}>
                    <p><span className="movie_homeButton">Homepage 
                        <i className="newTab"></i></span></p></a>}
                    {currentMovieDetail && currentMovieDetail.imdb_id &&
                    <a href={"https://www.imdb.com/title/" + 
                    currentMovieDetail.imdb_id} target="_blank" 
                    style={{textDecoration: "none"}}>
                    <p><span className="movie__imdbButton ">IMDb<i className="newTab"></i></span></p></a>}
    
                </div>
                <div className="movie_heading">Production companies</div>
                <div className="movie_production">
                    {
                        currentMovieDetail && currentMovieDetail.production_companies &&
                        currentMovieDetail.production_companies.map(company => (
                            <React.Fragment key={company.id}>
                            {
                                company.logo_path && 
                                <span className="productionCOmpanyImage">
                                    <img src={"https://image.tmdb.org/t/p/original" + company.logo_path}  className="movie_prodCompany" />
                                    <span>{company.name}</span>
                                </span>
                            }
                            </React.Fragment>
                        ))
        
                    }
                </div>
            </div>
        </div>
    )
}   

export default Movie
