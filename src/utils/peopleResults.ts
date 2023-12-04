import { Movie, PersonDetails } from "../types";
import { tmdbApiClient } from "./tmdbApiClient";

type Props = {
  page: number,
  queryParameter: string
}

export const getPeopleResults = async (props: Props) => {
  const personResultInfo = await tmdbApiClient.get<{
    results: PersonDetails[];
    total_results: number
  }>(
    `search/person?include_adult=false&language=en-US&query=${props.queryParameter}&page=${props.page}`
  )
  personResultInfo.data.results.sort((a, b) => (a.popularity > b.popularity ? -1 : 1))
  return {results: personResultInfo.data.results, totalResults: personResultInfo.data.total_results}
}