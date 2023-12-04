import { Movie } from "../types";
import { tmdbApiClient } from "./tmdbApiClient";

type Props = {
  page: number,
  queryParameter: string
}

export const getMovieResults = async (props: Props) => {
  const movieResultInfo = await tmdbApiClient.get<{
    results: Movie[];
    total_results: number;
  }>(
    `search/movie?&language=en-US&query=${props.queryParameter}&page=${props.page}&include_adult=false`
  );

  return {results: movieResultInfo.data.results, totalResults: movieResultInfo.data.total_results}
}