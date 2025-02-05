import { Page, PageListItem } from './page';
import { EditorState } from './editor';

export interface PagesState {
  list: PageListItem[];
  currentPage: Page | null;
  loading: boolean;
  error: string | null;
}

export interface RootState {
  pages: PagesState;
  editor: EditorState;
} 