import { useEffect, useState } from "react";
import { Movie, MovieResult } from "../types";
import { createImageUrl } from "../utils/imageUrl";
import { Link, useLocation } from "react-router-dom";
import { createReleaseYear } from "../utils/releaseYear";
import { tmdbApiClient } from "../utils/tmdbApiClient";
import { useQuery } from "../hooks/useQuery";
import { getMovieResults } from "../utils/movieResults";

const MovieSearchResults: React.FC = () => {
  const { state } = useLocation<MovieResult>()
  const [movieResults, setMovieResults] = useState<{
    movies: Movie[];
    numberOfMovies: number;
  }>({ movies: [], numberOfMovies: 0 });
  const queryParameter = useQuery().get('query');

  const [page, setPage] = useState(1);

  useEffect(() => {
    const getResults = async () => {
      try {
        if (queryParameter) {
          if (page > 1) {
            const movieResultInfo = await getMovieResults({page: page, queryParameter: queryParameter})
            setMovieResults({
              movies: movieResults.movies.concat(movieResultInfo.results),
              numberOfMovies: movieResultInfo.totalResults
            });
          }
          else {
            setMovieResults({movies: state.movies, numberOfMovies: state.numberOfResults})
          }
        }
      } catch {
        console.log('error');
      }
    };
    getResults();
    // there is really no need to listen to results' changes, it just causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <div className="Container">
      <h1>Search results for '{queryParameter}'</h1>
      <p>{movieResults.numberOfMovies} results</p>
      <div className="GridWrapper">
        {movieResults.movies.map((result) => (
          <div className="PosterCard" key={result.id}>
            <Link className="PosterText" to={`/movies/${result.id}`}>
              {result.poster_path ? (
                <img
                  className="Poster"
                  src={createImageUrl(result.poster_path, { width: 300 })}
                  alt="Poster of movie"
                />
              ) : (
                <div className="NoPosterCard aspect-ratio-box">
                  No poster available
                </div>
              )}
              <h2>{result.title}</h2>
              <p>{createReleaseYear(result.release_date)}</p>
            </Link>
          </div>
        ))}
        </div>
        <div className="ButtonContainer">
        {state.movies.length < movieResults.numberOfMovies ? (
          <button
            className="SecondaryButton LoadButton"
            onClick={() => setPage(page + 1)}
          >
            Load more
          </button>
        ) : (
          <div className="BottomText">No more movies to show</div>
        )}
      </div>
    </div>
  )
}

export default MovieSearchResults