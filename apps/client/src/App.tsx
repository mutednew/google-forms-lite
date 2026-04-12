import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import FormBuilderPage from "./pages/FormBuilderPage"
import FormFillerPage from "./pages/FormFillerPage"
import FormResponsesPage from "./pages/FormResponsesPage"
import { useSelector } from "react-redux"
import { selectIsDark } from "./store/slices/themeSlice"
import { useEffect } from "react"
import Layout from "./components/layout/Layout"

const App = () => {
    const isDark = useSelector(selectIsDark)

    useEffect(() => {
        if (isDark) {
            document.body.classList.add("dark")
        } else {
            document.body.classList.remove("dark")
        }
    }, [isDark])

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/forms/new" element={<FormBuilderPage />} />
                    <Route path="/forms/:id/fill" element={<FormFillerPage />} />
                    <Route path="/forms/:id/responses" element={<FormResponsesPage />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
