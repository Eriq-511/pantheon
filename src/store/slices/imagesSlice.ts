import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { imagesService } from '@/services/imagesService';
import type { CmsImage, ImageUpdateRequest } from '@/types';

interface ImagesState {
  images: CmsImage[];
  loading: boolean;
  uploading: boolean;
  error: string | null;
}

const initialState: ImagesState = {
  images: [],
  loading: false,
  uploading: false,
  error: null,
};

export const fetchImages = createAsyncThunk(
  'images/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await imagesService.getAll();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch images');
    }
  }
);

export const uploadImage = createAsyncThunk(
  'images/upload',
  async ({ file, altText }: { file: File; altText?: string }, { rejectWithValue }) => {
    try {
      return await imagesService.upload(file, altText);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to upload image');
    }
  }
);

export const updateImage = createAsyncThunk(
  'images/update',
  async ({ id, data }: { id: number; data: ImageUpdateRequest }, { rejectWithValue }) => {
    try {
      return await imagesService.update(id, data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to update image');
    }
  }
);

export const deleteImage = createAsyncThunk(
  'images/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await imagesService.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to delete image');
    }
  }
);

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchImages.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(fetchImages.fulfilled, (state, action: PayloadAction<CmsImage[]>) => {
      state.loading = false;
      state.images = action.payload;
    });
    builder.addCase(fetchImages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Upload
    builder.addCase(uploadImage.pending, (state) => { state.uploading = true; state.error = null; });
    builder.addCase(uploadImage.fulfilled, (state, action: PayloadAction<CmsImage>) => {
      state.uploading = false;
      state.images.unshift(action.payload);
    });
    builder.addCase(uploadImage.rejected, (state, action) => {
      state.uploading = false;
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updateImage.fulfilled, (state, action: PayloadAction<CmsImage>) => {
      const idx = state.images.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.images[idx] = action.payload;
    });
    builder.addCase(updateImage.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Delete
    builder.addCase(deleteImage.fulfilled, (state, action: PayloadAction<number>) => {
      state.images = state.images.filter((i) => i.id !== action.payload);
    });
    builder.addCase(deleteImage.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearError } = imagesSlice.actions;
export default imagesSlice.reducer;
