export interface HeaderProps {
    onSave?: () => void
    isSaving?: boolean
    canSave?: boolean
}

export interface LayoutContext {
    setHeaderProps: (props: HeaderProps) => void
}
