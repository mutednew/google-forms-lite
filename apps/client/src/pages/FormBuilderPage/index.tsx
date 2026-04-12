import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus } from "lucide-react"
import {
    DndContext,
    closestCenter,
    DragOverlay,
    defaultDropAnimationSideEffects,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useFormBuilder } from "../../hooks/useFormBuilder"
import { useDndQuestions } from "../../hooks/useDndQuestions"
import { useHeaderProps } from "../../components/layout/Layout"
import QuestionCard from "../../components/FormBuilder/QuestionCard"
import { cn } from "../../lib/cn"

const FormBuilderPage = () => {
    const {
        state,
        isLoading,
        setTitle,
        setDescription,
        addQuestion,
        removeQuestion,
        updateQuestion,
        reorderQuestions,
        addOption,
        updateOption,
        removeOption,
        handleSubmit,
    } = useFormBuilder()

    const { setHeaderProps } = useHeaderProps()

    const {
        sensors,
        activeQuestion,
        activeIndex,
        handleDragStart,
        handleDragEnd,
        handleDragCancel,
    } = useDndQuestions({
        questions: state.questions,
        onReorder: reorderQuestions,
    })

    useEffect(() => {
        setHeaderProps({
            onSave: handleSubmit,
            isSaving: isLoading,
            canSave: !!state.title.trim(),
        })
    }, [handleSubmit, isLoading, state.title])

    return (
        <div className="pb-20">
            <div className="mx-auto max-w-3xl px-6 py-10">
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                        "relative mb-6 overflow-hidden rounded-2xl border p-8 shadow-sm transition-colors",
                        "border-t-8 border-t-purple-500 dark:border-t-purple-600",
                        "border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900",
                    )}
                >
                    <input
                        type="text"
                        value={state.title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Untitled Form"
                        className={cn(
                            "mb-4 w-full border-b-2 border-transparent bg-transparent pb-2",
                            "text-2xl font-extrabold transition-colors focus:outline-none",
                            "text-slate-900 dark:text-white",
                            "placeholder-slate-300 dark:placeholder-slate-700",
                            "focus:border-purple-400 dark:focus:border-purple-500",
                        )}
                    />

                    <textarea
                        value={state.description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Form description (optional)"
                        rows={1}
                        className={cn(
                            "w-full resize-none overflow-hidden border-b border-transparent bg-transparent pb-1",
                            "text-base transition-colors focus:outline-none",
                            "text-slate-500 dark:text-slate-400",
                            "placeholder-slate-300 dark:placeholder-slate-700",
                            "focus:border-purple-300 dark:focus:border-purple-500/50",
                        )}
                        onInput={(e) => {
                            const target = e.target as HTMLTextAreaElement
                            target.style.height = "auto"
                            target.style.height = `${target.scrollHeight}px`
                        }}
                    />
                </motion.div>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                    onDragCancel={handleDragCancel}
                >
                    <SortableContext
                        items={state.questions.map((q) => q.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="mb-8 flex flex-col gap-6">
                            <AnimatePresence mode="popLayout">
                                {state.questions.map((question, index) => (
                                    <QuestionCard
                                        key={question.id}
                                        question={question}
                                        index={index}
                                        onUpdate={updateQuestion}
                                        onRemove={removeQuestion}
                                        onAddOption={addOption}
                                        onUpdateOption={updateOption}
                                        onRemoveOption={removeOption}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    </SortableContext>

                    <DragOverlay
                        dropAnimation={{
                            sideEffects: defaultDropAnimationSideEffects({
                                styles: { active: { opacity: "0.4" } },
                            }),
                        }}
                    >
                        {activeQuestion ? (
                            <QuestionCard
                                question={activeQuestion}
                                index={activeIndex}
                                isOverlay={true}
                                onUpdate={() => {}}
                                onRemove={() => {}}
                                onAddOption={() => {}}
                                onUpdateOption={() => {}}
                                onRemoveOption={() => {}}
                            />
                        ) : null}
                    </DragOverlay>
                </DndContext>

                <motion.button
                    onClick={addQuestion}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className={cn(
                        "group flex w-full items-center justify-center gap-2 py-5",
                        "rounded-2xl border-2 border-dashed bg-transparent",
                        "text-sm font-semibold transition-all",
                        "border-slate-300 text-slate-500 dark:border-slate-700 dark:text-slate-400",
                        "hover:border-purple-500 hover:bg-purple-50 hover:text-purple-600",
                        "dark:hover:border-purple-500 dark:hover:bg-purple-500/10 dark:hover:text-purple-400",
                    )}
                >
                    <div
                        className={cn(
                            "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                            "bg-slate-100 dark:bg-slate-800",
                            "group-hover:bg-purple-100 dark:group-hover:bg-purple-500/20",
                        )}
                    >
                        <Plus className="h-5 w-5" />
                    </div>
                    Add new question
                </motion.button>
            </div>
        </div>
    )
}

export default FormBuilderPage
