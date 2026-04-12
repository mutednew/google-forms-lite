import { createSlice } from "@reduxjs/toolkit"

interface ThemeState {
    isDark: boolean
}

const initialState: ThemeState = {
    isDark: false,
}

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark
        },
    },
})

export const { toggleTheme } = themeSlice.actions
export const selectIsDark = (state: { theme: ThemeState }) => state.theme.isDark
export default themeSlice.reducer
