import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import pagesReducer from './slices/pagesSlice';
import imagesReducer from './slices/imagesSlice';
import menuReducer from './slices/menuSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pages: pagesReducer,
    images: imagesReducer,
    menu: menuReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
