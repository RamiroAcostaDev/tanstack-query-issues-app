import { FC } from "react";
import { GithubIssue, State } from "../interfaces/issue.interface";
import { IssueItem } from "./IssueItem";

interface Props {
  issues: GithubIssue[];
  onStateChange: (state: State) => void;
  selectedState: State;
}

export const IssueList: FC<Props> = ({
  issues,
  onStateChange,
  selectedState,
}) => {
  return (
    <>
      {/* Botones de All, Open, Closed */}
      <div className="flex gap-4">
        <button
          onClick={() => onStateChange(State.All)}
          className={`btn ${selectedState === State.All ? "active" : ""}`}
        >
          All
        </button>
        <button
          onClick={() => onStateChange(State.Open)}
          className={`btn ${selectedState === State.Open ? "active" : ""}`}
        >
          Open
        </button>
        <button
          onClick={() => onStateChange(State.Close)}
          className={`btn ${selectedState === State.Close ? "active" : ""}`}
        >
          Closed
        </button>
      </div>

      {/* Lista de issues */}
      <div className="mt-4">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </>
  );
};
