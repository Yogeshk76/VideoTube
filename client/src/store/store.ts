import { configureStore } from "@reduxjs/toolkit";
import authReducer from '@/features/authSlice';
import videoReducer from '@/features/videoSlice';
import commentReducer from '@/features/commentSlice';
import likeReducer from '@/features/likeSlice';
import tweetReducer from '@/features/tweetSlice';
import subscriptionReducer from '@/features/subscriptionSlice';
import playlistReducer from '@/features/playlistSlice';
import dashboardReducer from '@/features/dashboardSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    videos: videoReducer,
    comments: commentReducer,
    likes: likeReducer,
    tweets: tweetReducer,
    subscriptions: subscriptionReducer,
    playlists: playlistReducer,
    dashboard: dashboardReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
