import { SEARCH_USERS } from "../graphql/queries";
import { useQuery } from "@apollo/client";

type SearchResultTypes = {
  id: string;
  username: string;
  profile_image: string;
};

const useSearch = (inputString: string) => {
  const { data, loading } = useQuery(SEARCH_USERS, {
    variables: { query: `%${inputString}%` },
  });
  if (loading) return [];
  const searchResults: SearchResultTypes[] = data ? data.user : [];
  return searchResults;
};

export default useSearch;
