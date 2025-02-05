import { Component } from './component';

export interface Position {
  x: number;
  y: number;
}

export interface DragItem {
  type: string;
  id: string;
  component?: Component;
}

export interface EditorState {
  selectedComponentId: string | null;
  hoveredComponentId: string | null;
  clipboard: Component | null;
  zoom: number;
  history: {
    past: Component[][];
    present: Component[];
    future: Component[][];
  };
}

export interface CanvasConfig {
  width: number;
  height: number;
  scale: number;
  gridSize: number;
  showGrid: boolean;
  showRulers: boolean;
}
