import { createPortal } from 'react-dom';
import { useModalContext } from './ModalContext';

export function ModalRoot() {
  const { modals } = useModalContext();

  return (
    <>
      {modals.map(({ key, element }) =>
        createPortal(element, document.body, key)
      )}
    </>
  );
}
