import { useEffect } from 'react';

type HotkeyCallback = (e: KeyboardEvent) => void;

export function useHotkeys(keys: string, callback: HotkeyCallback) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = keys.toLowerCase();
      const isCtrl = key.includes('ctrl') && e.ctrlKey;
      const isAlt = key.includes('alt') && e.altKey;
      const isShift = key.includes('shift') && e.shiftKey;
      const pressedKey = e.key.toLowerCase();
      
      const keyWithoutModifiers = key
        .replace('ctrl+', '')
        .replace('alt+', '')
        .replace('shift+', '');
      
      if (
        pressedKey === keyWithoutModifiers &&
        (!key.includes('ctrl') || isCtrl) &&
        (!key.includes('alt') || isAlt) &&
        (!key.includes('shift') || isShift)
      ) {
        callback(e);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [keys, callback]);
} 