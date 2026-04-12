import { useState } from "react"
import { Outlet, useOutletContext } from "react-router-dom"
import Header from "./Header"
import type { HeaderProps, LayoutContext } from "../../types/header.types"
import { cn } from "../../lib/cn"

export const useHeaderProps = () => {
    const context = useOutletContext<LayoutContext | null>()
    return context ?? { setHeaderProps: () => {} }
}

const Layout = () => {
    const [headerProps, setHeaderProps] = useState<HeaderProps>({})

    return (
        <div
            className={cn(
                "min-h-screen transition-colors duration-300",
                "bg-slate-50/50 dark:bg-slate-950",
            )}
        >
            <Header {...headerProps} />
            <Outlet context={{ setHeaderProps } satisfies LayoutContext} />
        </div>
    )
}

export default Layout
