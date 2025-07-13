import { useState } from "react";
import { LoadingSpinner } from "../../shared";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssuesInfinite } from "../hooks";
import { State } from "../interfaces/issue.interface";

export const ListViewInfinite = () => {
  const [state, setState] = useState<State>(State.All);
  const [selectedLabel, setSelectedLabel] = useState<string[]>([]);
  const { issuesQuery } = useIssuesInfinite({
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

  //Viene un arreglo de arreglos [[issue1, issue2], [issue3 , issue4]]
  // con flat() lo convertimos en un array unico [issue1, issue2, issue3, issue4]

  const issues = issuesQuery.data?.pages.flat() ?? [];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 mt-5">
      <div className="col-span-1 sm:col-span-2">
        {issuesQuery.isLoading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-col justify-center">
            <IssueList
              issues={issues}
              onStateChange={setState}
              selectedState={state}
            />
            {/* 
            <div className="flex justify-between items-center"> */}
            <button
              onClick={() => issuesQuery.fetchNextPage()}
              disabled={issuesQuery.isFetchingNextPage}
              className="p-2 bg-blue-500 rounded-md hover:bg-blue-700 transition-all disabled:bg-slate-400"
            >
              {issuesQuery.isFetchingNextPage
                ? "Cargando más ..."
                : "Cargar más..."}
            </button>
            {/* </div> */}
          </div>
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
