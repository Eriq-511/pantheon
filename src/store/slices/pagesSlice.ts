import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { pagesService } from '@/services/pagesService';
import type { Page, PageRequest } from '@/types';

interface PagesState {
  pages: Page[];
  currentPage: Page | null;
  loading: boolean;
  error: string | null;
}

const initialState: PagesState = {
  pages: [],
  currentPage: null,
  loading: false,
  error: null,
};

export const fetchPages = createAsyncThunk(
  'pages/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await pagesService.getAll();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch pages');
    }
  }
);

export const fetchPageBySlug = createAsyncThunk(
  'pages/fetchBySlug',
  async (slug: string, { rejectWithValue }) => {
    try {
      // Ensure slug is trimmed and lowercased for backend compatibility
      const safeSlug = slug.trim().toLowerCase();
      return await pagesService.getBySlug(safeSlug);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Page not found');
    }
  }
);

export const createPage = createAsyncThunk(
  'pages/create',
  async (data: PageRequest, { rejectWithValue }) => {
    try {
      return await pagesService.create(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to create page');
    }
  }
);

export const updatePage = createAsyncThunk(
  'pages/update',
  async ({ id, data }: { id: number; data: PageRequest }, { rejectWithValue }) => {
    try {
      return await pagesService.update(id, data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to update page');
    }
  }
);

export const deletePage = createAsyncThunk(
  'pages/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await pagesService.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to delete page');
    }
  }
);

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    clearCurrentPage: (state) => { state.currentPage = null; },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchPages.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(fetchPages.fulfilled, (state, action: PayloadAction<Page[]>) => {
      state.loading = false;
      state.pages = action.payload;
    });
    builder.addCase(fetchPages.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Fetch by slug
    builder.addCase(fetchPageBySlug.fulfilled, (state, action: PayloadAction<Page>) => {
      state.currentPage = action.payload;
    });

    // Create
    builder.addCase(createPage.fulfilled, (state, action: PayloadAction<Page>) => {
      state.pages.unshift(action.payload);
    });
    builder.addCase(createPage.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updatePage.fulfilled, (state, action: PayloadAction<Page>) => {
      const idx = state.pages.findIndex((p) => p.id === action.payload.id);
      if (idx !== -1) state.pages[idx] = action.payload;
    });
    builder.addCase(updatePage.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Delete
    builder.addCase(deletePage.fulfilled, (state, action: PayloadAction<number>) => {
      state.pages = state.pages.filter((p) => p.id !== action.payload);
    });
    builder.addCase(deletePage.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearError, clearCurrentPage } = pagesSlice.actions;
export default pagesSlice.reducer;
