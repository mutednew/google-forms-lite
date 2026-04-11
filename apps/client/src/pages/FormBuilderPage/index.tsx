import { useFormBuilder } from "../../hooks/useFormBuilder";
import QuestionCard from "../../components/FormBuilder/QuestionCard";
import { Link } from "react-router-dom";

const FormBuilderPage = () => {
    const {
        state,
        isLoading,
        setTitle,
        setDescription,
        addQuestion,
        removeQuestion,
        updateQuestion,
        addOption,
        updateOption,
        removeOption,
        handleSubmit
    } = useFormBuilder();

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/" className="text-blue-600 hover:underline text-sm">
                        ← Back to forms
                    </Link>

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading || !state.title.trim()}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium px-6 py-2 rounded-lg transition-colors"
                    >
                        {isLoading ? 'Saving...' : 'Save Form'}
                    </button>
                </div>

                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm mb-6">
                    <input
                        type="text"
                        value={state.title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Form title"
                        className="w-full text-2xl font-bold border-b border-gray-200 pb-3 mb-4 focus:outline-none focus:border-blue-400"
                    />

                    <input
                        type="text"
                        value={state.description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Form description (optional)"
                        className="w-full text-gray-500 focus:outline-none focus:border-b focus:border-blue-400 pb-1"
                    />
                </div>

                <div className="flex flex-col gap-4 mb-6">
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
                </div>

                <button
                    onClick={addQuestion}
                    className="w-full border-2 border-dashed border-gray-300 hover:border-blue-400 text-gray-400 hover:text-blue-500 rounded-xl py-4 transition-colors font-medium"
                >
                    + Add Question
                </button>
            </div>
        </div>
    );
};

export default FormBuilderPage;