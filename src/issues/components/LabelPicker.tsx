import { LoadingSpinner } from "../../shared";
import { useLabels } from "../hooks";

interface Props {
  selectedLabel: string[];
  onLabelSelected: (label: string) => void;
}

export const LabelPicker = ({ onLabelSelected, selectedLabel }: Props) => {
  const { labelsQuery } = useLabels();

  if (labelsQuery.isLoading) {
    return (
      <div className="flex justify-center items-center h-52">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {labelsQuery.data?.map((label) => (
        <span
          onClick={() => onLabelSelected(label.name)}
          key={label.id}
          className={`animate-fade-in px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer
            ${selectedLabel.includes(label.name) ? "selected-label" : ""}
          `}
          style={{
            border: `1px solid #${label.color}`,
            color: "${ label.color }",
          }}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
