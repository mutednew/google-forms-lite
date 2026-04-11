import { LocalOption } from "../../types/formBuilder.types";

interface OptionsListProps {
    options: LocalOption[];
    questionId: string;
    onAdd: (questionId: string) => void;
    onUpdate: (questionId: string, optionId: string, value: string) => void;
    onRemove: (questionId: string, optionId: string) => void;
}

const OptionsList = ({ options, questionId, onAdd, onUpdate, onRemove }: OptionsListProps) => {
    return (
        <div className="mt-3">
            <p className="text-sm font-medium text-gray-600 mb-2">Options</p>
            <div className="flex flex-col gap-2">
                {options.map((option) => (
                    <div key={option.id} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full border-2 border-gray-300 flex-shrink-0" />

                        <input
                            type="text"
                            value={option.value}
                            onChange={(e) => onUpdate(questionId, option.id, e.target.value)}
                            placeholder="Option text"
                            className="flex-1 border border-gray-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-400"
                        />

                        <button
                            onClick={() => onRemove(questionId, option.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors text-lg leading-none"
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>

            <button
                onClick={() => onAdd(questionId)}
                className="mt-2 text-sm text-blue-600 hover:underline"
            >
                + Add option
            </button>
        </div>
    );
};

export default OptionsList;