import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { GithubIssue } from "../interfaces/issue.interface";
import { FC } from "react";
import { useQueryClient } from "@tanstack/react-query";
// import { getIssue, getIssueComments } from "../actions";

interface Props {
  issue: GithubIssue;
}

export const IssueItem: FC<Props> = ({ issue }) => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  //Permite hacer un prefech de los datos del issue cuando el mouse entra en el componente. Los datos se guardan en la cache de react-query y se cargan automáticamente cuando se accede a la ruta del issue.
  // const prefetchData = () => {
  //   console.log("Prefetching data");
  //   queryClient.prefetchQuery({
  //     queryKey: ["issues", issue.number],
  //     queryFn: () => getIssue(issue.number),
  //     staleTime: 1000 * 60, // 1 minute
  //   });

  //   queryClient.prefetchQuery({
  //     queryKey: ["issues", issue.number, "comments"],
  //     queryFn: () => getIssueComments(issue.number),
  //     staleTime: 1000 * 60, // 1 minute
  //   });
  // };

  // Esta función es similar a prefetchData, pero en lugar de hacer una petición a la API, simplemente guarda los datos del issue en la cache de react-query.
  // Esto es útil si ya tienes los datos del issue y quieres que se carguen automáticamente
  const presetData = () => {
    console.log("Prefetching data");
    queryClient.setQueryData(["issues", issue.number], issue, {
      updatedAt: Date.now() + 1000 * 60, // 1 minute
    });
    // Esto es para que los comentarios se carguen automáticamente cuando se accede a la ruta del issue.
    // queryClient.setQueryData(
    //   ["issues", issue.number, "comments"],
    //   issue.comments,
    //   {}
    // );
  };

  return (
    <div
      // onMouseEnter={prefetchData}
      onMouseEnter={presetData}
      className="flex items-center px-2 py-3 mb-5 border rounded-md bg-slate-900 hover:bg-slate-800"
    >
      {issue.state === "closed" ? (
        <FiCheckCircle size={30} color="green" className="min-w-10" />
      ) : (
        <FiInfo size={30} color="red" className="min-w-10" />
      )}

      <div className="flex flex-col flex-grow px-2">
        <a
          onClick={() => navigate(`/issues/issue/${issue.number}`)}
          className="hover:underline"
        >
          {issue.title}
        </a>
        {/* TODO: format date for {issue.created_at} */}
        <span className="text-gray-500">
          #{issue.number} opened 2 days ago by{" "}
          <span className="font-bold">{issue.user.login}</span>
        </span>

        <div className="flex flex-wrap">
          {issue.labels.map((label) => (
            <span
              key={label.id}
              className="animate-fade-in px-2 py-1 rounded-full text-xs font-semibold mr-2 mb-2"
              style={{
                border: `1px solid #${label.color}`,
                color: `#${label.color}`,
              }}
            >
              {label.name}
            </span>
          ))}
        </div>
      </div>

      <img
        src={issue.user.avatar_url}
        alt="User Avatar"
        className="w-8 h-8 rounded-full"
      />
      <div className="flex flex-col mx-2 items-center">
        <FiMessageSquare size={30} className="min-w-5" color="gray" />
        <span className="px-4 text-gray-400">{issue.comments}</span>
      </div>
    </div>
  );
};
