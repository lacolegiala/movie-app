import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { createImageUrl } from '../utils/imageUrl';
import { Movie } from '../types';
import { createReleaseYear } from '../utils/releaseYear';
import ScrollButtons from './ScrollButtons';

type MovieProps = {
  title: string;
  movies: Movie[];
};

const MovieScrollList: React.FC<MovieProps> = (props: MovieProps) => {
  const movieListElement = useRef<HTMLDivElement | null>(null);

  return (
    <div>
      <div className="ScrollListHeader">
        <h2>{props.title}</h2>
        <ScrollButtons
          listElement={movieListElement}
          scrollDistance={180}
        ></ScrollButtons>
      </div>
      <div ref={movieListElement} className="MovieList">
        {props.movies.map((movie) => (
          <div className="MovieCard" key={movie.id}>
            <Link className="MovieCard" to={`/movies/${movie.id}`}>
              {movie.poster_path ? (
                <img
                  src={createImageUrl(movie.poster_path, { width: 185 })}
                  alt="Poster of movie"
                  className="Poster"
                />
              ) : (
                <div className="NoPosterCard">No poster available</div>
              )}
              <h3 className="SmallMargin">{movie.title}</h3>
              <p className="SmallMargin">
                {createReleaseYear(movie.release_date)}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieScrollList;
