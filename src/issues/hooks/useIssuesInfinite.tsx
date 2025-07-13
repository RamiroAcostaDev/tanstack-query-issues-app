import { useInfiniteQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.action";
import { State } from "../interfaces/issue.interface";

interface Props {
  state: State;
  selectedLabel: string[];
}
export const useIssuesInfinite = ({ state, selectedLabel }: Props) => {
  const issuesQuery = useInfiniteQuery({
    queryKey: ["issues", "infinite", { state, selectedLabel }],
    queryFn: ({ pageParam, queryKey }) => {
      //esta es una forma de tomar las propiedades state y salectedLabel, desestructurando el queryKey
      const [, , args] = queryKey;
      const { state, selectedLabel } = args as Props;

      console.log(queryKey);

      return getIssues(state, selectedLabel, pageParam);
    },
    staleTime: 1000 * 60, // 1 minute
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) =>
      lastPage.length > 0 ? pages.length + 1 : undefined,
  });

  return {
    issuesQuery,
  };
};
