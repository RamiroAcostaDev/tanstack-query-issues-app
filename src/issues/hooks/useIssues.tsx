import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.action";

export const useIssues = () => {
  const issuesQuery = useQuery({
    queryKey: ["issues"],
    queryFn: getIssues,
  });
  console.log("issuesQuery", issuesQuery);
  return { issuesQuery };
};
