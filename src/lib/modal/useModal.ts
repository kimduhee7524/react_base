import { useCallback } from 'react';
import { useModalContext } from './ModalContext';
import type { ModalComponent } from './types';

export function useModal<T>(component: ModalComponent<T>) {
  const { openModal } = useModalContext(); // 모달 상태에 접근
  const open = useCallback(() => openModal(component), [component]);
  return { open };
}
