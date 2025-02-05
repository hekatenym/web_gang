import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Component {
  id: string;
  type: string;
  props: {
    style: Record<string, string>;
    data: Record<string, any>;
  };
  children?: Component[];
}

interface EditorState {
  selectedComponent: string | null;
  clipboard: Component | null;
  history: {
    past: Component[][];
    present: Component[];
    future: Component[][];
  };
}

const initialState: EditorState = {
  selectedComponent: null,
  clipboard: null,
  history: {
    past: [],
    present: [],
    future: [],
  },
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setSelectedComponent: (state, action: PayloadAction<string | null>) => {
      state.selectedComponent = action.payload;
    },
    setClipboard: (state, action: PayloadAction<Component | null>) => {
      state.clipboard = action.payload;
    },
    updateHistory: (state, action: PayloadAction<EditorState['history']>) => {
      state.history = action.payload;
    },
  },
});

export const { setSelectedComponent, setClipboard, updateHistory } = editorSlice.actions;
export default editorSlice.reducer;
