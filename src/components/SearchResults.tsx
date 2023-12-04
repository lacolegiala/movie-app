import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import { createImageUrl } from '../utils/imageUrl';
import { tmdbApiClient } from '../utils/tmdbApiClient';
import { Movie, PersonDetails } from '../types';
import SearchBar from './SearchBar';
import { useHistory } from 'react-router-dom';
import { createReleaseYear } from '../utils/releaseYear';
import { getMovieResults } from '../utils/movieResults';

const SearchResults: React.FC = () => {
  const [movieResults, setMovieResults] = useState<{
    movies: Movie[];
    numberOfMovies: number;
  }>({ movies: [], numberOfMovies: 0 });
  const [personResults, setPersonResults] = useState<{
    people: PersonDetails[];
    numberOfPeople: number;
  }>({ people: [], numberOfPeople: 0 })
  const queryParameter = useQuery().get('query');
  const [searchBarValue, setSearchBarValue] = useState<string>(
    queryParameter ?? ''
  );
  const [page, setPage] = useState(1);

  const history = useHistory();

  useEffect(() => {
    const getResults = async () => {
      try {
        if (queryParameter) {
          const movieResultInfo = await getMovieResults({page: 1, queryParameter: queryParameter})
          const personResultInfo = await tmdbApiClient.get<{
            results: PersonDetails[];
            total_results: number
          }>(
            `search/person?include_adult=false&language=en-US&query=${queryParameter}&page=${page}`
          )
          personResultInfo.data.results.sort((a, b) => (a.popularity > b.popularity ? -1 : 1))
          setMovieResults({
            movies: movieResults.movies.concat(movieResultInfo.results),
            numberOfMovies: movieResultInfo.totalResults,
          });
          setPersonResults({
            people: personResultInfo.data.results,
            numberOfPeople: personResultInfo.data.total_results
          })
        }
      } catch {
        console.log('error');
      }
    };
    getResults();
    // there is really no need to listen to results' changes, it just causes an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, queryParameter]);

  const movieDataToPass = {
    movies: movieResults.movies,
    numberOfResults: movieResults.numberOfMovies
  }

  function handleSubmit(event: React.ChangeEvent<HTMLFormElement>) {
    history.push(`/search?query=${searchBarValue}`);
    setPage(1);
    event.preventDefault();
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchBarValue(event.target.value);
  }

  return (
    <div className="Container">
      <SearchBar
        value={searchBarValue}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
      />
      <h1>Search results for '{queryParameter}'</h1>
      <h2> Top movie results</h2>
      <p>{movieResults.numberOfMovies} results</p>
      <div className="GridWrapper">
        {movieResults.movies.slice(0, 6).map((result) => (
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
        <Link to={{ pathname: `/search/movies?query=${queryParameter}`, state: movieDataToPass }}>See all</Link>
        <h2>Top people results</h2>
        {personResults.people.slice(0, 6).map((result) => (
          <div key={result.id}>
            {result.profile_path ? (
              <img
                src={createImageUrl(result.profile_path, {
                  width: 300
                })}
                alt={result.name}
              />
            ) : (
              <div className="NoPosterCard aspect-ratio-box">
                No poster available
              </div>
            )}
            <div>{result.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
