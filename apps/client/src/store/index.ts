import { configureStore } from "@reduxjs/toolkit"
import { api } from "./api/api"
import themeReducer from "./slices/themeSlice"

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        theme: themeReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
