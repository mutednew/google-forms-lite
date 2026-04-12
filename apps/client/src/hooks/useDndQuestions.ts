import { useState } from "react"
import {
    PointerSensor,
    useSensor,
    useSensors,
    type DragEndEvent,
    type DragStartEvent,
} from "@dnd-kit/core"
import type { LocalQuestion } from "../types/formBuilder.types"

interface UseDndQuestionsProps {
    questions: LocalQuestion[]
    onReorder: (activeId: string, overId: string) => void
}

export const useDndQuestions = ({ questions, onReorder }: UseDndQuestionsProps) => {
    const [activeId, setActiveId] = useState<string | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 },
        }),
    )

    const handleDragStart = (event: DragStartEvent) => {
        setActiveId(String(event.active.id))
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event
        if (over && active.id !== over.id) {
            onReorder(String(active.id), String(over.id))
        }
        setActiveId(null)
    }

    const handleDragCancel = () => setActiveId(null)

    const activeQuestion = activeId ? (questions.find((q) => q.id === activeId) ?? null) : null

    const activeIndex = activeId ? questions.findIndex((q) => q.id === activeId) : 0

    return {
        sensors,
        activeId,
        activeQuestion,
        activeIndex,
        handleDragStart,
        handleDragEnd,
        handleDragCancel,
    }
}
