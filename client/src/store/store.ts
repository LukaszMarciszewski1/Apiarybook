import { configureStore } from '@reduxjs/toolkit'
import { apiaryApi } from './api/apiaries'

export const store = configureStore({
  reducer: {[apiaryApi.reducerPath]: apiaryApi.reducer},
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      apiaryApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch