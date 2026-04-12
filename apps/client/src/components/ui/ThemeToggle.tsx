import { useDispatch, useSelector } from "react-redux"
import { Sun, Moon } from "lucide-react"
import { selectIsDark, toggleTheme } from "../../store/slices/themeSlice"
import { cn } from "../../lib/cn"

const ThemeToggle = () => {
    const dispatch = useDispatch()
    const isDark = useSelector(selectIsDark)

    return (
        <button
            onClick={() => dispatch(toggleTheme())}
            aria-label="Toggle theme"
            className={cn(
                "rounded-full p-2.5 transition-colors",
                "focus:ring-2 focus:ring-purple-500/50 focus:outline-none",
                "text-slate-500 hover:bg-slate-100",
                "dark:text-slate-400 dark:hover:bg-slate-800",
            )}
        >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
    )
}

export default ThemeToggle
