import { useState } from "react";
import { LoadingSpinner } from "../../shared";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import { State } from "../interfaces/issue.interface";

export const ListView = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
  const { issuesQuery } = useIssues({
    state: state,
    selectedLabel: selectedLabel,
  });

  const onLabelSelected = (label: string) => {
    if (selectedLabel.includes(label)) {
      setSelectedLabel(selectedLabel.filter((l) => l !== label));
    } else {
      setSelectedLabel([...selectedLabel, label]);
    }
  };

  const issues = issuesQuery.data ?? [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <IssueList
              issues={issues}
              onStateChange={setState}
              selectedState={state}
            />

            <div className="flex justify-between items-center">
              <button className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all">
                Anteriores
              </button>
              <span>{1}</span>
              <button className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all">
                Siguientes
              </button>
            </div>
          </>
        )}
      </div>

      <div className="col-span-1 px-2">
        <LabelPicker
          onLabelSelected={onLabelSelected}
          selectedLabel={selectedLabel}
        />
      </div>
    </div>
  );
};
