import { useQuery } from "@tanstack/react-query";
import { getIssue, getIssueComments } from "../actions";

export const useIssue = (issueNumber: number) => {
  const issueQuery = useQuery({
    queryKey: ["issues", issueNumber],
    queryFn: () => getIssue(issueNumber),
    staleTime: 1000 * 60, // 1 minute
  });

  const commentsQuery = useQuery({
    queryKey: ["issues", issueNumber, "comments"],
    queryFn: () => getIssueComments(issueNumber),
    staleTime: 1000 * 60, // 1 minute
  });

  // Si quieres que los comentarios se carguen solo si la consulta del issue fue exitosa, puedes usar `enabled`.
  //De este modo, la peticion de comentarios se realiza de manera secuencial y no paralela.
  // const commentsQuery = useQuery({
  //   queryKey: ["issues", issueQuery.data?.number, "comments"],
  //   queryFn: () => getIssueComments(issueQuery.data!.number),
  //   staleTime: 1000 * 60, // 1 minute
  //  enabled: issueQuery.data !== undefined, // Solo se ejecuta si la peticion de issueQuery ha sido exitosa
  // });

  return { issueQuery, commentsQuery };
};
