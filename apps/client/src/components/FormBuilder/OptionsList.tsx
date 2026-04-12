import { memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { LocalOption } from "../../types/formBuilder.types";
import { QuestionType } from "@gfl/shared";
import { cn } from "../../lib/cn";

interface OptionsListProps {
    options: LocalOption[];
    questionId: string;
    questionType: QuestionType;
    onAdd: (questionId: string) => void;
    onUpdate: (questionId: string, optionId: string, value: string) => void;
    onRemove: (questionId: string, optionId: string) => void;
}

const OptionsList = memo(
    ({ options, questionId, questionType, onAdd, onUpdate, onRemove }: OptionsListProps) => {
        return (
            <div className="mt-4">
                <div className="flex flex-col gap-3">
                    <AnimatePresence mode="popLayout">
                        {options.map((option, idx) => (
                            <motion.div
                                layout
                                key={option.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="group/option flex items-center gap-3"
                            >
                                <div
                                    className={cn(
                                        "h-4 w-4 shrink-0 border-2 transition-colors",
                                        questionType === QuestionType.Checkbox
                                            ? "rounded-[4px]"
                                            : "rounded-full",
                                        "border-slate-300 dark:border-slate-600",
                                        "group-focus-within/option:border-purple-400 dark:group-focus-within/option:border-purple-500"
                                    )}
                                />

                                <input
                                    type="text"
                                    value={option.value}
                                    onChange={(e) =>
                                        onUpdate(questionId, option.id, e.target.value)
                                    }
                                    placeholder={`Option ${idx + 1}`}
                                    className={cn(
                                        "flex-1 border-b border-transparent bg-transparent py-1 text-sm transition-colors focus:outline-none",
                                        "text-slate-700 dark:text-slate-200",
                                        "placeholder-slate-400 dark:placeholder-slate-600",
                                        "hover:border-slate-200 dark:hover:border-slate-700",
                                        "focus:border-purple-400 dark:focus:border-purple-500"
                                    )}
                                />

                                <button
                                    onClick={() => onRemove(questionId, option.id)}
                                    aria-label="Remove option"
                                    className={cn(
                                        "rounded-md p-1.5 opacity-0 transition-all",
                                        "group-focus-within/option:opacity-100 group-hover/option:opacity-100",
                                        "text-slate-400 hover:bg-red-50 hover:text-red-500",
                                        "dark:hover:bg-red-500/10"
                                    )}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                <button
                    onClick={() => onAdd(questionId)}
                    className={cn(
                        "group mt-4 flex cursor-pointer items-center gap-2 text-sm font-medium transition-colors focus:outline-none",
                        "text-slate-500 hover:text-purple-600",
                        "dark:text-slate-400 dark:hover:text-purple-400"
                    )}
                >
                    <div
                        className={cn(
                            "flex h-4 w-4 items-center justify-center rounded-full transition-colors",
                            "bg-slate-100 group-hover:bg-purple-100",
                            "dark:bg-slate-800 dark:group-hover:bg-purple-500/20"
                        )}
                    >
                        <Plus className="h-3 w-3" />
                    </div>
                    Add Option
                </button>
            </div>
        );
    }
);

export default OptionsList;