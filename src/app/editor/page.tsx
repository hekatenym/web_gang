'use client';

import { Editor } from '@/components/editor/Editor';
import { AntdConfigProvider } from '@/components/AntdConfigProvider';
import { Provider } from 'react-redux';
import { store } from '@/store';
import { Component } from '@/types/component';

export default function EditorPage() {
  const handleChange = (components: Component[]) => {
    console.log('Editor components changed:', components);
  };

  const handleSave = (components: Component[]) => {
    console.log('Saving editor components:', components);
  };

  return (
    <Provider store={store}>
      <AntdConfigProvider>
        <div className="h-screen">
          <Editor 
            initialComponents={[]}
            onChange={handleChange}
            onSave={handleSave}
          />
        </div>
      </AntdConfigProvider>
    </Provider>
  );
} 