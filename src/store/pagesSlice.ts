import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Page {
  id: string;
  title: string;
  route: string;
  seo: {
    title: string;
    description: string;
    keywords: string;
  };
  components: any[]; // 后续会完善具体的组件类型
  createdAt: Date;
  updatedAt: Date;
}

interface PagesState {
  list: Page[];
  currentPage: Page | null;
  loading: boolean;
  error: string | null;
}

const initialState: PagesState = {
  list: [],
  currentPage: null,
  loading: false,
  error: null,
};

const pagesSlice = createSlice({
  name: 'pages',
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<Page[]>) => {
      state.list = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<Page | null>) => {
      state.currentPage = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setPages, setCurrentPage, setLoading, setError } = pagesSlice.actions;
export default pagesSlice.reducer;