import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  JSX,
} from 'react';
import { ModalRoot } from './ModalRoot';
import type { ModalComponent } from './types';

interface ModalEntry {
  key: string;
  element: JSX.Element;
}

interface ModalContextValue {
  openModal: <T>(component: ModalComponent<T>) => Promise<T>;
  modals: ModalEntry[];
}

const ModalContext = createContext<ModalContextValue | undefined>(undefined);

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modals, setModals] = useState<ModalEntry[]>([]);
  const keyCounter = useRef(0);

  const openModal = <T,>(Component: ModalComponent<T>): Promise<T> => {
    // 모달을 열 때마다 모달 닫기 함수를 포함한 Promise를 반환
    return new Promise<T>((resolve) => {
      const key = `modal-${keyCounter.current++}`;
      const close = (result: T) => {
        resolve(result); // 모달 닫기 시 결과값 반환
        setModals((prev) => prev.filter((m) => m.key !== key));
      };
      const element = <Component close={close} />;
      setModals((prev) => [...prev, { key, element }]);
    });
  };

  return (
    <ModalContext.Provider value={{ openModal, modals }}>
      {children}
      <ModalRoot />
    </ModalContext.Provider>
  );
}

export function useModalContext(): ModalContextValue {
  const context = useContext(ModalContext);
  if (!context)
    throw new Error('useModalContext must be used within a ModalProvider');
  return context;
}
