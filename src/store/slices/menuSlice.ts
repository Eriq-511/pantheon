import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { menuService } from '@/services/menuService';
import type { MenuItem, MenuItemRequest, ReorderRequest } from '@/types';

interface MenuState {
  items: MenuItem[];
  loading: boolean;
  error: string | null;
}

const initialState: MenuState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchMenu = createAsyncThunk(
  'menu/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await menuService.getAll();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to fetch menu');
    }
  }
);

export const createMenuItem = createAsyncThunk(
  'menu/create',
  async (data: MenuItemRequest, { rejectWithValue }) => {
    try {
      return await menuService.create(data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to create menu item');
    }
  }
);

export const updateMenuItem = createAsyncThunk(
  'menu/update',
  async ({ id, data }: { id: number; data: MenuItemRequest }, { rejectWithValue }) => {
    try {
      return await menuService.update(id, data);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to update menu item');
    }
  }
);

export const reorderMenu = createAsyncThunk(
  'menu/reorder',
  async (data: ReorderRequest, { rejectWithValue }) => {
    try {
      await menuService.reorder(data);
      return data.items;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to reorder menu');
    }
  }
);

export const deleteMenuItem = createAsyncThunk(
  'menu/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await menuService.delete(id);
      return id;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || 'Failed to delete menu item');
    }
  }
);

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    clearError: (state) => { state.error = null; },
    setItemsOptimistic: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Fetch all
    builder.addCase(fetchMenu.pending, (state) => { state.loading = true; state.error = null; });
    builder.addCase(fetchMenu.fulfilled, (state, action: PayloadAction<MenuItem[]>) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchMenu.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // Create
    builder.addCase(createMenuItem.fulfilled, (state, action: PayloadAction<MenuItem>) => {
      state.items.push(action.payload);
      state.items.sort((a, b) => a.orderIndex - b.orderIndex);
    });
    builder.addCase(createMenuItem.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updateMenuItem.fulfilled, (state, action: PayloadAction<MenuItem>) => {
      const idx = state.items.findIndex((i) => i.id === action.payload.id);
      if (idx !== -1) state.items[idx] = action.payload;
    });
    builder.addCase(updateMenuItem.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Reorder
    builder.addCase(reorderMenu.rejected, (state, action) => {
      state.error = action.payload as string;
    });

    // Delete
    builder.addCase(deleteMenuItem.fulfilled, (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    });
    builder.addCase(deleteMenuItem.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { clearError, setItemsOptimistic } = menuSlice.actions;
export default menuSlice.reducer;
