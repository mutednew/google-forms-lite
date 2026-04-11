import { useHomePage } from "../../hooks/useHomePage";
import { Link } from "react-router-dom";

const HomePage = () => {
    const { forms, isLoading, isError } = useHomePage()

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-gray-600 text-lg">Loading...</p>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-lg">Something went wrong. Please try again.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto px-4 py-10">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">My Forms</h1>

                    <Link
                        to="/forms/new"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-lg transition-colors"
                    >
                        + Create New Form
                    </Link>
                </div>

                {forms.length === 0 ? (
                    <div className="text-center py-20">
                        <p className="text-gray-400 text-lg mb-4">No forms yet</p>

                        <Link
                            to="/forms/new"
                            className="text-blue-600 hover:underline font-medium"
                        >
                            Create your first form
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {forms.map((form) => (
                            <div
                                key={form.id}
                                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 flex items-center justify-between"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-800">{form.title}</h2>

                                    {form.description && (
                                        <p className="text-gray-500 mt-1">{form.description}</p>
                                    )}

                                    <p className="text-gray-400 text-sm mt-2">
                                        {new Date(form.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Link
                                        to={`/forms/${form.id}/fill`}
                                        className="text-blue-600 hover:bg-blue-50 border border-blue-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Fill
                                    </Link>

                                    <Link
                                        to={`/forms/${form.id}/responses`}
                                        className="text-gray-600 hover:bg-gray-50 border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Responses
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HomePage