import { useFormResponses } from "../../hooks/useFormResponses";
import ResponseCard from "../../components/FormResponses/ResponseCard";
import { Link } from "react-router-dom";

const FormResponsesPage = () => {
    const { form, responses, isLoading, getQuestionTitle, getOptionValue } = useFormResponses();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        )
    }

    if (!form) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-lg">Form not found.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Link to="/" className="text-blue-600 hover:underline text-sm mb-6 block">
                    ← Back to forms
                </Link>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{form.title}</h1>

                    {form.description && (
                        <p className="text-gray-500 mt-2">{form.description}</p>
                    )}

                    <p className="text-sm text-gray-400 mt-3">
                        {responses.length} {responses.length === 1 ? 'response' : 'responses'}
                    </p>
                </div>

                {responses.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg mb-4">No responses yet</p>

                        <Link
                            to={`/forms/${form.id}/fill`}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Fill out this form
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-4">
                        {responses.map((response, index) => (
                            <ResponseCard
                                key={response.id}
                                response={response}
                                index={index}
                                getQuestionTitle={getQuestionTitle}
                                getOptionValue={getOptionValue}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
};

export default FormResponsesPage