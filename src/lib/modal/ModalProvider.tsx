import { useState, useCallback, useEffect } from 'react';
import { ModalStateContext } from './context';
import { emitter } from './emitter';
import { ModalRoot } from './ModalRoot';
import type { OverlayControllerComponent, OverlayState } from './types';

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modals, setModals] = useState<OverlayState[]>([]);

  const close = useCallback((id: string) => {
    setModals((prev) =>
      prev.map((modal) => (modal.id === id ? { ...modal, isOpen: false } : modal))
    );
  }, []);

  const unmount = useCallback((id: string) => {
    setModals((prev) => prev.filter((modal) => modal.id !== id));
  }, []);

  const closeAll = useCallback(() => {
    setModals((prev) => prev.map((modal) => ({ ...modal, isOpen: false })));
  }, []);

  const unmountAll = useCallback(() => {
    setModals([]);
  }, []);

  useEffect(() => {
    const handleOpen = ({
      id,
      Controller,
      props,
    }: {
      id: string;
      Controller: OverlayControllerComponent;
      props: Record<string, any>;
    }) => {
      setModals((prev) => [
        ...prev,
        { id, isOpen: true, Controller, props },
      ]);
    };

    const handleClose = ({ id }: { id: string }) => {
      close(id);
    };

    const handleUnmount = ({ id }: { id: string }) => {
      unmount(id);
    };

    const offOpen = emitter.on('open', handleOpen);
    const offClose = emitter.on('close', handleClose);
    const offUnmount = emitter.on('unmount', handleUnmount);
    const offCloseAll = emitter.on('closeAll', closeAll);
    const offUnmountAll = emitter.on('unmountAll', unmountAll);

    return () => {
      offOpen();
      offClose();
      offUnmount();
      offCloseAll();
      offUnmountAll();
    };
  }, [close, unmount, closeAll, unmountAll]);

  return (
    <ModalStateContext.Provider value={modals}>
      {children}
      <ModalRoot />
    </ModalStateContext.Provider>
  );
};