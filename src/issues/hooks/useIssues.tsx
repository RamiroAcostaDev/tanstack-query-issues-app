import { useQuery } from "@tanstack/react-query";
import { getIssues } from "../actions/get-issues.action";
import { State } from "../interfaces/issue.interface";
import { useEffect, useState } from "react";

interface Props {
  state: State;
  selectedLabel: string[];
}
export const useIssues = ({ state, selectedLabel }: Props) => {
  const [page, setPage] = useState(1);

  const issuesQuery = useQuery({
    queryKey: ["issues", { state, selectedLabel, page }],
    queryFn: () => getIssues(state, selectedLabel, page),
    staleTime: 1000 * 60, // 1 minute
  });

  useEffect(() => {
    setPage(1);
  }, [state]);

  useEffect(() => {
    setPage(1);
  }, [selectedLabel]);

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) {
      return;
    }

    setPage(page + 1);
  };

  const prevPage = () => {
    if (page === 1) {
      return;
    }

    setPage((prevPage) => prevPage - 1);
  };

  return {
    issuesQuery,
    //Getters
    page,
    //Actions
    nextPage,
    prevPage,
  };
};
