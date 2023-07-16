import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import { userService } from "./services/user.services";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
    reducer: {
        counterReducer,
        [userService.reducerPath]: userService.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([userService.middleware])
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch