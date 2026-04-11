import { QuestionType } from "@gfl/shared";
import type { GetFormQuery } from "@gfl/shared";

type Form = NonNullable<GetFormQuery["form"]>
type Question = Form["questions"][number]
type Option = NonNullable<Question["options"]>[number]

interface QuestionFieldProps {
    question: Question
    values: string[]
    onTextChange: (questionId: string, value: string) => void
    onSingleChoice: (questionId: string, value: string) => void
    onMultipleChoice: (questionId: string, value: string, checked: boolean) => void
}

const QuestionField = ({
    question,
    values,
    onTextChange,
    onSingleChoice,
    onMultipleChoice,
}: QuestionFieldProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <p className="font-medium text-gray-800 mb-1">
                {question.title}
                {question.required && <span className="text-red-500 ml-1">*</span>}
            </p>

            {question.type === QuestionType.Text && (
                <input
                    type="text"
                    value={values[0] ?? ""}
                    onChange={(e) => onTextChange(question.id, e.target.value)}
                    placeholder="Your answer"
                    className="w-full border border-gray-200 rounded-lg px-4 py-2 mt-2 text-sm focus:outline-none focus:border-blue-400"
                />
            )}

            {question.type === QuestionType.Date && (
                <input
                    type="date"
                    value={values[0] ?? ""}
                    onChange={(e) => onTextChange(question.id, e.target.value)}
                    className="border border-gray-200 rounded-lg px-4 py-2 mt-2 text-sm focus:outline-none focus:border-blue-400"
                />
            )}

            {question.type === QuestionType.MultipleChoice && (
                <div className="flex flex-col gap-2 mt-3">
                    {question.options?.map((option: Option) => (
                        <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="radio"
                                name={question.id}
                                value={option.id}
                                checked={values[0] === option.id}
                                onChange={() => onSingleChoice(question.id, option.id)}
                                className="w-4 h-4 accent-blue-600"
                            />

                            <span className="text-sm text-gray-700">{option.value}</span>
                        </label>
                    ))}
                </div>
            )}

            {question.type === QuestionType.Checkbox && (
                <div className="flex flex-col gap-2 mt-3">
                    {question.options?.map((option: Option) => (
                        <label key={option.id} className="flex items-center gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                value={option.id}
                                checked={values.includes(option.id)}
                                onChange={(e) => onMultipleChoice(question.id, option.id, e.target.checked)}
                                className="w-4 h-4 accent-blue-600"
                            />

                            <span className="text-sm text-gray-700">{option.value}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    )
}

export default QuestionField