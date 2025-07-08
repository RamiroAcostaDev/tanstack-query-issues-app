import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.action";
import { State } from "../interfaces/issue.interface";

interface Props {
  state: State;
  selectedLabel: string[];
}
export const useIssues = ({ state, selectedLabel }: Props) => {
  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabel }],
    queryFn: () => getIssues(state, selectedLabel),
    staleTime: 1000 * 60, // 1 minute
  });

  return { issuesQuery };
};
