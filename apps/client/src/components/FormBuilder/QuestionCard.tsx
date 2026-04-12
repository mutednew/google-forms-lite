import { memo } from "react"
import { motion } from "framer-motion"
import { Trash2, GripVertical } from "lucide-react"
import { QuestionType } from "@gfl/shared"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import OptionsList from "./OptionsList"
import { LocalQuestion } from "../../types/formBuilder.types"
import { cn } from "../../lib/cn"

interface QuestionCardProps {
    question: LocalQuestion
    index: number
    isOverlay?: boolean
    onUpdate: (id: string, changes: Partial<LocalQuestion>) => void
    onRemove: (id: string) => void
    onAddOption: (questionId: string) => void
    onUpdateOption: (questionId: string, optionId: string, value: string) => void
    onRemoveOption: (questionId: string, optionId: string) => void
}

const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
    [QuestionType.Text]: "Text",
    [QuestionType.MultipleChoice]: "Multiple Choice",
    [QuestionType.Checkbox]: "Checkbox",
    [QuestionType.Date]: "Date",
}

const QUESTION_TYPES_WITH_OPTIONS = [QuestionType.MultipleChoice, QuestionType.Checkbox]

const QuestionCard = memo(
    ({
        question,
        index,
        isOverlay = false,
        onUpdate,
        onRemove,
        onAddOption,
        onUpdateOption,
        onRemoveOption,
    }: QuestionCardProps) => {
        const hasOptions = QUESTION_TYPES_WITH_OPTIONS.includes(question.type)

        const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
            useSortable({
                id: question.id,
                disabled: isOverlay,
            })

        const dndStyle = {
            transform: CSS.Translate.toString(transform),
            transition,
            opacity: isDragging && !isOverlay ? 0.3 : 1,
        }

        const CardContent = (
            <div
                className={cn(
                    "group relative overflow-hidden rounded-2xl p-6",
                    isOverlay
                        ? "z-50 cursor-grabbing border-2 border-purple-500 bg-slate-50/90 shadow-2xl shadow-purple-500/20 backdrop-blur-sm dark:bg-slate-800/90 dark:shadow-purple-900/40"
                        : "border border-slate-200 bg-white shadow-sm transition-colors duration-300 focus-within:border-purple-300 focus-within:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:focus-within:border-purple-500/50",
                )}
            >
                <div
                    className={cn(
                        "absolute top-0 bottom-0 left-0 w-1.5 -translate-x-full transform bg-purple-500",
                        "transition-transform duration-300 ease-out",
                        "group-hover:translate-x-0 focus-within:translate-x-0",
                    )}
                />

                <div className="mb-5 flex items-start justify-between gap-4 sm:items-center">
                    <div className="flex items-center gap-2">
                        <button
                            {...attributes}
                            {...listeners}
                            aria-label="Drag to reorder"
                            className={cn(
                                "hidden touch-none transition-colors focus:outline-none sm:block",
                                "text-slate-300 hover:text-slate-500",
                                "dark:text-slate-600 dark:hover:text-slate-400",
                                isOverlay ? "cursor-grabbing" : "cursor-grab",
                            )}
                        >
                            <GripVertical className="h-5 w-5" />
                        </button>

                        <span
                            className={cn(
                                "rounded-md px-2.5 py-1 text-xs font-bold tracking-wider uppercase select-none",
                                "bg-slate-100 text-slate-400",
                                "dark:bg-slate-800 dark:text-slate-500",
                            )}
                        >
                            Q{index + 1}
                        </span>
                    </div>

                    <button
                        onClick={() => onRemove(question.id)}
                        title="Delete question"
                        className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-lg transition-colors focus:outline-none",
                            "text-slate-400 hover:bg-red-50 hover:text-red-500",
                            "dark:hover:bg-red-500/10",
                        )}
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>

                <div className="mb-4 flex flex-col gap-4 sm:flex-row">
                    <input
                        type="text"
                        value={question.title}
                        onChange={(e) => onUpdate(question.id, { title: e.target.value })}
                        placeholder="Question title"
                        className={cn(
                            "flex-1 rounded-xl border border-transparent px-4 py-3 text-base font-medium transition-colors focus:outline-none",
                            "bg-slate-50 text-slate-900 placeholder-slate-400 shadow-sm shadow-slate-100 focus:border-purple-400 focus:bg-white",
                            "dark:bg-slate-800/50 dark:text-white dark:placeholder-slate-600 dark:shadow-none dark:focus:border-purple-500 dark:focus:bg-slate-900",
                        )}
                    />

                    <select
                        value={question.type}
                        onChange={(e) =>
                            onUpdate(question.id, {
                                type: e.target.value as QuestionType,
                                options: [],
                            })
                        }
                        className={cn(
                            "cursor-pointer rounded-xl border px-4 py-3 text-sm font-medium transition-colors focus:outline-none sm:w-48",
                            "border-slate-200 bg-white text-slate-700 shadow-sm shadow-slate-100 focus:border-purple-400",
                            "dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:shadow-none dark:focus:border-purple-500",
                        )}
                    >
                        {Object.values(QuestionType).map((type) => (
                            <option key={type} value={type}>
                                {QUESTION_TYPE_LABELS[type]}
                            </option>
                        ))}
                    </select>
                </div>

                {hasOptions && (
                    <div className="pl-0 sm:pl-7">
                        <OptionsList
                            options={question.options}
                            questionId={question.id}
                            questionType={question.type}
                            onAdd={onAddOption}
                            onUpdate={onUpdateOption}
                            onRemove={onRemoveOption}
                        />
                    </div>
                )}

                <div className="mt-6 flex justify-end border-t border-slate-100 pt-4 dark:border-slate-800">
                    <label className="group/req flex cursor-pointer items-center gap-2.5 text-sm font-medium text-slate-600 select-none dark:text-slate-300">
                        <span className="transition-colors group-hover/req:text-slate-900 dark:group-hover/req:text-white">
                            Required
                        </span>

                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                checked={question.required}
                                onChange={(e) =>
                                    onUpdate(question.id, { required: e.target.checked })
                                }
                                className="peer sr-only"
                            />

                            <div
                                className={cn(
                                    "h-5 w-10 rounded-full transition-colors",
                                    "bg-slate-200 dark:bg-slate-700",
                                    "peer-checked:bg-purple-500 dark:peer-checked:bg-purple-600",
                                    "after:absolute after:top-[2px] after:left-[2px]",
                                    "after:h-4 after:w-4 after:rounded-full after:border",
                                    "after:border-slate-300 after:bg-white",
                                    "after:transition-all after:content-['']",
                                    "peer-checked:after:translate-x-5 peer-checked:after:border-white",
                                )}
                            />
                        </div>
                    </label>
                </div>
            </div>
        )

        if (isOverlay) {
            return CardContent
        }

        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
            >
                <div ref={setNodeRef} style={dndStyle}>
                    {CardContent}
                </div>
            </motion.div>
        )
    },
)

export default QuestionCard
