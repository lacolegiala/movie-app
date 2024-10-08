import React, { useCallback, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '../hooks/useQuery';
import { MovieCredit, MovieCredits, PersonDetails } from '../types';
import { createImageUrl } from '../utils/imageUrl';
import { createReleaseYear } from '../utils/releaseYear';
import { tmdbApiClient } from '../utils/tmdbApiClient';

type Success = {
  type: 'success';
  personData: PersonDetails;
  movieCredits: MovieCredits;
};

type Loading = {
  type: 'loading';
};

type ErrorData = {
  type: 'error';
};

type Case = Success | Loading | ErrorData;

const ActorPage = () => {
  const [actorPageState, setActorPageState] = useState<Case>({
    type: 'loading',
  });
  const [showMore, setShowMore] = useState<boolean>(false);
  const queryParameter = useQuery().get('sortmoviesby');
  const [sortMoviesBy, setSortMoviesBy] = useState<string>(
    queryParameter ?? 'newest'
  );

  const { id } = useParams<{ id: string }>();

  const getActorInfo = useCallback(async () => {
    try {
      const personInfo = await tmdbApiClient.get(`person/${id}`);
      const movieInfo = await tmdbApiClient.get(`person/${id}/movie_credits`);
      setActorPageState({
        type: 'success',
        personData: personInfo.data,
        movieCredits: movieInfo.data,
      });
    } catch (error) {
      setActorPageState({ type: 'error' });
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    getActorInfo();
  }, [getActorInfo]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const sortMovies = () => {
    if (actorPageState.type === 'success') {
      let sortedMovies;
      if (sortMoviesBy === 'oldest') {
        sortedMovies = ([] as MovieCredit[])
          .concat(actorPageState.movieCredits.cast)
          .sort((a, b) => (a.release_date < b.release_date ? -1 : 1));
      } else if (sortMoviesBy === 'most_popular') {
        sortedMovies = ([] as MovieCredit[])
          .concat(actorPageState.movieCredits.cast)
          .sort((a, b) => (a.popularity > b.popularity ? -1 : 1));
      } else if (sortMoviesBy === 'top_rated') {
        sortedMovies = ([] as MovieCredit[])
          .concat(actorPageState.movieCredits.cast)
          .sort((a, b) => (a.vote_average > b.vote_average ? -1 : 1));
      } else {
        sortedMovies = ([] as MovieCredit[])
          .concat(actorPageState.movieCredits.cast)
          .sort((a, b) => (a.release_date > b.release_date ? -1 : 1));
      }
      return sortedMovies.map((movie) => (
        <div className="PosterCard" key={movie.id}>
          <Link className="PosterText" to={`/movies/${movie.id}`}>
            {movie.poster_path ? (
              <img
                src={createImageUrl(movie.poster_path, { width: 300 })}
                alt={`Poster of ${movie.title}`}
                className="Poster"
              />
            ) : (
              <div className="NoPosterCard aspect-ratio-box">
                No poster available
              </div>
            )}
            <h3 className="SmallMargin">{movie.title}</h3>
            <p className="SmallMargin">
              {createReleaseYear(movie.release_date)}
            </p>
            <p>{movie.character}</p>
          </Link>
        </div>
      ));
    }
  };

  const handleSelectOptionChange: React.ChangeEventHandler<
    HTMLSelectElement
  > = (event) => {
    setSortMoviesBy(event.target.value);
    // eslint-disable-next-line no-restricted-globals
    history.replaceState(
      sortMoviesBy,
      'sortmoviesby',
      `?sortmoviesby=${event.target.value}`
    );
  };

  return (
    <div className="Container">
      {actorPageState.type === 'success' && (
        <div>
          <h1>{actorPageState.personData.name}</h1>
          {actorPageState.personData.profile_path && (
            <img
              src={createImageUrl(actorPageState.personData.profile_path, {
                width: 300,
              })}
              alt="Actor"
            />
          )}
          {actorPageState.personData.birthday && (
            <div>
              <h2>Date of birth</h2>
              <div>{formatDate(actorPageState.personData.birthday)}</div>
            </div>
          )}
          {actorPageState.personData.deathday && (
            <div>
              <h2>Date of death</h2>
              <div>{formatDate(actorPageState.personData.deathday)}</div>
            </div>
          )}
          <div>
            <h2>Biography</h2>
            <div className="ActorInfo">
              {actorPageState.personData.biography.length <= 640 ? (
                actorPageState.personData.biography
              ) : (
                <>
                  {showMore
                    ? actorPageState.personData.biography
                    : actorPageState.personData.biography
                        .slice(0, 640)
                        .concat('...')}
                  {!showMore && (
                    <button
                      className="ShowMore"
                      onClick={() => setShowMore(true)}
                    >
                      Show more
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          <h2>Movies</h2>
          <select
            value={sortMoviesBy}
            className="Select"
            onChange={handleSelectOptionChange}
            name="sortBy"
            id="sortBy"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="most_popular">Most popular</option>
            <option value="top_rated">Top rated</option>
          </select>
          <div className="ActorMovieGrid">{sortMovies()}</div>
        </div>
      )}
    </div>
  );
};

export default ActorPage;
