'use client';

import { EditorPage } from '@/components/editor/EditorPage';
import { DndProvider } from '@/components/DndProvider';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { AntdConfigProvider } from '@/components/AntdConfigProvider';
import type { DropResult } from '@hello-pangea/dnd';
import type { Component } from '@/types/component';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <Provider store={store}>
      <AntdConfigProvider>
        <DndProvider>
          <EditorPage id={params.id} />
        </DndProvider>
      </AntdConfigProvider>
    </Provider>
  );
} 