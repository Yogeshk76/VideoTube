import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { Playlist } from '@/types';

interface PlaylistState {
  playlists: Playlist[];
  playlist: Playlist | null;
  loading: boolean;
  error: string | null;
}

const initialState: PlaylistState = {
  playlists: [],
  playlist: null,
  loading: false,
  error: null,
};

//createPlaylist

export const getUserPlaylists = createAsyncThunk<Playlist[], string>(
  'playlists/getUserPlaylists',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/playlist/user/${userId}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch playlists');
    }
  }
);

export const getPlaylistById = createAsyncThunk<Playlist, string>(
  'playlists/getPlaylistById',
  async (playlistId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/playlist/${playlistId}`);
      return data.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch playlist');
    }
  }
);

//addVideoToPlaylist

//removeVideoFromPlaylist

//deletePlaylist

//updatePlaylist

const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload;
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload;
      })
      .addCase(getPlaylistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default playlistSlice.reducer; 