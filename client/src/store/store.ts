import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/authSlice';
import videoReducer from '@/features/videoSlice';
import commentReducer from '@/features/commentSlice';
import likeReducer from '@/features/likeSlice';
import tweetReducer from '@/features/tweetSlice';
import subscriptionReducer from '@/features/subscriptionSlice';
import playlistReducer from '@/features/playlistSlice';
import userReducer from '@/features/userSlice';
import dashboardReducer from '@/features/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    video: videoReducer,
    comment: commentReducer,
    playlist: playlistReducer,
    like: likeReducer,
    tweet: tweetReducer,
    subscription: subscriptionReducer,
    dashboard: dashboardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
