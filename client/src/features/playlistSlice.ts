import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/api/axios';
import type { Playlist, UserIdInput, ApiResponse, AddVideoToPlaylistInput, PlaylistIdInput, UpdatePlaylistInput  } from '@/types';
import { setSuccessState } from '@/utils/successState';

interface PlaylistState {
  playlists: Playlist[];
  playlist: Playlist | null;
  loading: boolean;
  error: string | null;
  statusCode?: number | null;
  message?: string | null;
}

const initialState: PlaylistState = {
  playlists: [],
  playlist: null,
  loading: false,
  error: null,
  statusCode: null,
  message: null,
};

export const createPlaylist = createAsyncThunk<ApiResponse<Playlist>, Playlist>(
  'playlists/createPlaylist',
  async (playlistData, { rejectWithValue }) => {
    try {
      const { data } = await api.post('/', playlistData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create playlist');
    }
  }
);

export const getUserPlaylists = createAsyncThunk<ApiResponse<Playlist[]>, UserIdInput>(
  'playlists/getUserPlaylists',
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/playlist/user/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch playlists');
    }
  }
);

export const getPlaylistById = createAsyncThunk<ApiResponse<Playlist>, PlaylistIdInput>(
  'playlists/getPlaylistById',
  async (playlistId, { rejectWithValue }) => {
    try {
      const { data } = await api.get(`/playlist/${playlistId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch playlist');
    }
  }
);

export const addVideoToPlaylist = createAsyncThunk<ApiResponse<Playlist>, AddVideoToPlaylistInput>(
  'playlists/addVideoToPlaylist',
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    try {
      const { data } = await api.post(`/playlist/${videoId}/${playlistId}`, {}, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add video to playlist');
    }
  }
);

export const removeVideoFromPlaylist = createAsyncThunk<ApiResponse<Playlist>, AddVideoToPlaylistInput>(
  'playlists/removeVideoFromPlaylist',
  async ({ videoId, playlistId }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/playlist/${videoId}/${playlistId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to remove video from playlist');
    }
  }
);

export const deletePlaylist = createAsyncThunk<ApiResponse<null>, PlaylistIdInput>(
  'playlists/deletePlaylist',
  async ({ playlistId }, { rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/playlist/${playlistId}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete playlist');
    }
  }
);

export const updatePlaylist = createAsyncThunk<ApiResponse<Playlist>, UpdatePlaylistInput>(
  'playlists/updatePlaylist',
  async ({ name, description, playlistId }, { rejectWithValue }) => {
    try {
      const { data } = await api.put(`/playlist/${playlistId}`, { name, description }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update playlist');
    }
  }
);


const playlistSlice = createSlice({
  name: 'playlists',
  initialState,
  reducers: {
    resetPlaylistState: (state) => {
      state.playlist = null;
      state.error = null;
      state.statusCode = null;
      state.message = null;
    },
    resetErrorState: (state) => {
      state.error = null;
      state.statusCode = null;
      state.message = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // -- Create Playlist
      .addCase(createPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload.data;
        state.playlists.push(action.payload.data);
        setSuccessState(state, action.payload);
      })
      .addCase(createPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Get User Playlists
      .addCase(getUserPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(getUserPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Get Playlist By ID
      .addCase(getPlaylistById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPlaylistById.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(getPlaylistById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Add Video To Playlist
      .addCase(addVideoToPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addVideoToPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload.data;
        state.playlist.videos = action.payload.data.videos;
        setSuccessState(state, action.payload);
      })
      .addCase(addVideoToPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Remove Video From Playlist
      .addCase(removeVideoFromPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeVideoFromPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload.data;
        setSuccessState(state, action.payload);
      })
      .addCase(removeVideoFromPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // -- Delete Playlist
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = state.playlists.filter(playlist => playlist._id !== action.payload.data);
        setSuccessState(state, action.payload);
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })    
      // -- Update Playlist
      .addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlist = action.payload.data;
        state.playlists = state.playlists.map(playlist => playlist._id === action.payload.data._id ? action.payload.data : playlist);
        setSuccessState(state, action.payload);
      })
      .addCase(updatePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      }
      );
  },
});

export default playlistSlice.reducer; 
export const { resetPlaylistState, resetErrorState } = playlistSlice.actions;