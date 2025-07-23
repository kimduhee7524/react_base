import { createContext, useContext } from 'react';
import type { OverlayState } from './types';

export const ModalStateContext = createContext<OverlayState[] | null>(null);

export const useModalState = () => {
  const state = useContext(ModalStateContext);
  if (state === null) {
    throw new Error('useModalState must be used within a ModalProvider');
  }
  return state;
};