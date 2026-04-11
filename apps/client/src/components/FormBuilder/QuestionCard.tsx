import { LocalQuestion } from "../../types/formBuilder.types";
import { QuestionType } from "@gfl/shared";
import OptionsList from "./OptionsList";

interface QuestionCardProps {
    question: LocalQuestion;
    index: number;
    onUpdate: (id: string, changes: Partial<LocalQuestion>) => void;
    onRemove: (id: string) => void;
    onAddOption: (questionId: string) => void;
    onUpdateOption: (questionId: string, optionId: string, value: string) => void;
    onRemoveOption: (questionId: string, optionId: string) => void;
}

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
    [QuestionType.Text]: "Text",
    [QuestionType.MultipleChoice]: "Multiple Choice",
    [QuestionType.Checkbox]: "Checkbox",
    [QuestionType.Date]: "Date",
};

const QUESTION_TYPES_WITH_OPTIONS = [
    QuestionType.MultipleChoice,
    QuestionType.Checkbox,
];

const QuestionCard = ({
    question,
    index,
    onUpdate,
    onRemove,
    onAddOption,
    onUpdateOption,
    onRemoveOption
}: QuestionCardProps) => {
    const hasOptions = QUESTION_TYPES_WITH_OPTIONS.includes(question.type);

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-gray-400">Question {index + 1}</span>

                <button
                    onClick={() => onRemove(question.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors text-sm"
                >
                    Remove
                </button>
            </div>

            <input
                type="text"
                value={question.title}
                onChange={(e) => onUpdate(question.id, { title: e.target.value })}
                placeholder="Question title"
                className="w-full border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-blue-400 mb-3"
            />

            <div className="flex items-center gap-4">
                <select
                    value={question.type}
                    onChange={(e) => onUpdate(question.id, { type: e.target.value as QuestionType, options: [] })}
                    className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                >
                    {Object.values(QuestionType).map((type) => (
                        <option key={type} value={type}>
                            {QUESTION_TYPE_LABELS[type]}
                        </option>
                    ))}
                </select>

                <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={question.required}
                        onChange={(e) => onUpdate(question.id, { required: e.target.checked })}
                        className="w-4 h-4 accent-blue-600"
                    />

                    Required
                </label>
            </div>

            {hasOptions && (
                <OptionsList
                    options={question.options}
                    questionId={question.id}
                    onAdd={onAddOption}
                    onUpdate={onUpdateOption}
                    onRemove={onRemoveOption}
                />
            )}
        </div>
    );
};

export default QuestionCard;