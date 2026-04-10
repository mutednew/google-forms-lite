import {AnswerInput, db, QuestionInput} from "./store";

export const resolvers = {
    Query: {
        forms: () => db.getForms(),
        form: (_: unknown, { id }: { id: string }) => db.getFormById(id),
        responses: (_: unknown, { formId }: { formId: string }) => db.getResponsesByFormId(formId),
    },

    Mutation: {
        createForm: (
            _: unknown, {
                title,
                description,
                questions
            }: {
                title: string,
                description?: string,
                questions: QuestionInput[]
            }
        ) => db.createForm(title, description, questions),

        submitResponse: (_: unknown, { formId, answers }: { formId: string, answers: AnswerInput[] }) => db.submitResponse(formId, answers),
    }
}