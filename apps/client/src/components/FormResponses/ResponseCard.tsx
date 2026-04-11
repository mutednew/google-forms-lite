import { GetResponsesQuery } from "@gfl/shared";

type Response = GetResponsesQuery["responses"][number];

interface ResponseCartProps {
    response: Response;
    index: number;
    getQuestionTitle: (questionId: string) => string;
    getOptionValue: (questionId: string, optionId: string) => string;
}

const ResponseCart = ({
    response,
    index,
    getQuestionTitle,
    getOptionValue
}: ResponseCartProps) => {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-800">Response #{index + 1}</h3>
                
                <span className="text-sm text-gray-400">
                    {new Date(response.submittedAt).toLocaleString()}
                </span>
            </div>

            <div className="flex flex-col gap-3">
                {response.answers.map((answer) => (
                    <div key={answer.questionId} className="border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                        <p className="text-sm font-medium text-gray-600 mb-1">
                            {getQuestionTitle(answer.questionId)}
                        </p>
                        
                        <p className="text-sm text-gray-800">
                            {answer.values
                                .map((v) => getOptionValue(answer.questionId, v))
                                .join(", ")}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default ResponseCart;