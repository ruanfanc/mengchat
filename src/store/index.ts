import { configureStore } from '@reduxjs/toolkit'
import cookieReducer from './features/cookie'
export const store = configureStore({
    reducer: {
        cookie: cookieReducer,
    },
})


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch 