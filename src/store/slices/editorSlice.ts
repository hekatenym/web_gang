import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Component } from '@/types/component';

interface EditorState {
  components: Component[];
  selectedComponent: Component | null;
  isDragging: boolean;
  draggingComponent: Component | null;
  undoStack: Component[][];
  redoStack: Component[][];
}

const initialState: EditorState = {
  components: [],
  selectedComponent: null,
  isDragging: false,
  draggingComponent: null,
  undoStack: [],
  redoStack: [],
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setComponents: (state, action: PayloadAction<Component[]>) => {
      state.components = action.payload;
    },
    setSelectedComponent: (state, action: PayloadAction<Component | null>) => {
      state.selectedComponent = action.payload ? {
        ...action.payload,
        props: {
          style: { ...action.payload.props.style },
          data: { ...action.payload.props.data }
        }
      } : null;
    },
    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload;
    },
    setDraggingComponent: (state, action: PayloadAction<Component | null>) => {
      state.draggingComponent = action.payload ? {
        ...action.payload,
        props: {
          style: { ...action.payload.props.style },
          data: { ...action.payload.props.data }
        }
      } : null;
    },
    updateComponent: (state, action: PayloadAction<Component>) => {
      const index = state.components.findIndex(c => c.id === action.payload.id);
      if (index !== -1) {
        // 保存当前状态到撤销栈
        state.undoStack.push([...state.components]);
        // 更新组件，确保创建新的引用
        state.components[index] = {
          ...action.payload,
          props: {
            style: { ...action.payload.props.style },
            data: { ...action.payload.props.data }
          }
        };
        // 清空重做栈
        state.redoStack = [];
      }
    },
    deleteComponent: (state, action: PayloadAction<string>) => {
      // 保存当前状态到撤销栈
      state.undoStack.push([...state.components]);
      state.components = state.components.filter(c => c.id !== action.payload);
      // 清空重做栈
      state.redoStack = [];
      if (state.selectedComponent?.id === action.payload) {
        state.selectedComponent = null;
      }
    },
  },
});

export const {
  setComponents,
  setSelectedComponent,
  setIsDragging,
  setDraggingComponent,
  updateComponent,
  deleteComponent,
} = editorSlice.actions;

export default editorSlice.reducer; 