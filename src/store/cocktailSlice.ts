import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Cocktail } from '../types/cocktail';

// Сюда мы добавим тип для коктейля, когда он будет определен
interface CocktailState {
  cocktails: Record<string, Cocktail[]>;
  loading: boolean;
  error: string | null;
}

const initialState: CocktailState = {
  cocktails: {},
  loading: false,
  error: null,
};

/**
 * Асинхронный thunk для загрузки коктейлей по коду.
 * Перед отправкой запроса проверяет, есть ли данные в состоянии,
 * чтобы избежать дублирующих вызовов.
 */
export const fetchCocktailsByCode = createAsyncThunk(
  'cocktails/fetchByCode',
  async (code: string, { getState }) => {
    const { cocktails } = (getState() as { cocktails: CocktailState })
      .cocktails;
    if (cocktails[code]) {
      // Данные уже есть, не делаем запрос
      return { code, data: cocktails[code] };
    }
    const response = await axios.get<{ drinks: Cocktail[] }>(
      `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${code}`,
    );
    return { code, data: response.data.drinks };
  },
);

const cocktailSlice = createSlice({
  name: 'cocktails',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCocktailsByCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCocktailsByCode.fulfilled, (state, action) => {
        state.loading = false;
        state.cocktails[action.payload.code] = action.payload.data;
      })
      .addCase(fetchCocktailsByCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch cocktails';
      });
  },
});

export default cocktailSlice.reducer;
