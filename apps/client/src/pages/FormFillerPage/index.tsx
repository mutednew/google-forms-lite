import QuestionField from "../../components/FormFiller/QuestionField";
import { Link } from "react-router-dom";
import { useFormFiller } from "../../hooks/useFormFiller";

const FormFillerPage = () => {
    const {
        form,
        isLoading,
        isError,
        isSubmitting,
        isSubmitted,
        submitError,
        answers,
        handleTextChange,
        handleSingleChoice,
        handleMultipleChoice,
        handleSubmit,
        isValid,
    } = useFormFiller()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-500 text-lg">Loading...</p>
            </div>
        )
    }

    if (isError || !form) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-lg">Form not found.</p>
            </div>
        )
    }

    if (isSubmitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="bg-white rounded-xl border border-gray-200 p-10 shadow-sm text-center max-w-md">
                    <div className="text-5xl mb-4">✅</div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Form submitted!</h2>
                    <p className="text-gray-500 mb-6">Your response has been recorded.</p>
                    <Link
                        to="/"
                        className="text-blue-600 hover:underline font-medium"
                    >
                        Back to forms
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <Link to="/" className="text-blue-600 hover:underline text-sm mb-6 block">
                    ← Back to forms
                </Link>

                <div className="bg-white rounded-xl border-t-8 border-blue-600 border border-gray-200 p-6 shadow-sm mb-6">
                    <h1 className="text-2xl font-bold text-gray-800">{form.title}</h1>
                    {form.description && (
                        <p className="text-gray-500 mt-2">{form.description}</p>
                    )}
                </div>

                <div className="flex flex-col gap-4 mb-6">
                    {form.questions.map((question) => (
                        <QuestionField
                            key={question.id}
                            question={question}
                            values={answers[question.id] ?? []}
                            onTextChange={handleTextChange}
                            onSingleChoice={handleSingleChoice}
                            onMultipleChoice={handleMultipleChoice}
                        />
                    ))}
                </div>

                {submitError && (
                    <p className="text-red-500 text-sm mb-4">{submitError}</p>
                )}

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isValid}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium py-3 rounded-lg transition-colors"
                >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
            </div>
        </div>
    )
};

export default FormFillerPage;