import { useEffect, useState } from "react";
import { PersonDetails, PersonResult } from "../types";
import { createImageUrl } from "../utils/imageUrl";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "../hooks/useQuery";
import { getPeopleResults } from "../utils/peopleResults";

const PeopleSearchResults: React.FC = () => {
  const { state } = useLocation<PersonResult>()
  const [personResults, setPersonResults] = useState<{
    people: PersonDetails[];
    numberOfPeople: number;
  }>({ people: [], numberOfPeople: 0 });
  const queryParameter = useQuery().get('query');

  const [page, setPage] = useState(1);

  useEffect(() => {
    const getResults = async () => {
      try {
        if (queryParameter) {
          if (page > 1) {
            const personResultInfo = await getPeopleResults({page: page, queryParameter: queryParameter})
            setPersonResults({
              people: personResults.people.concat(personResultInfo.results),
              numberOfPeople: personResultInfo.totalResults
            });
          }
          else {
            setPersonResults({people: state.people, numberOfPeople: state.numberOfResults})
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
      <p>{personResults.numberOfPeople} results</p>
      <div className="GridWrapper">
        {personResults.people.map((result) => (
          <div className='PosterCard' key={result.id}>
          <Link className='PosterText' to={`/actors/${result.id}`}>
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
          </Link>
        </div>
        ))}
        </div>
        <div className="ButtonContainer">
        {state.people.length < personResults.numberOfPeople ? (
          <button
            className="SecondaryButton LoadButton"
            onClick={() => setPage(page + 1)}
          >
            Load more
          </button>
        ) : (
          <div className="BottomText">No more results to show</div>
        )}
      </div>
    </div>
  )
}

export default PeopleSearchResults