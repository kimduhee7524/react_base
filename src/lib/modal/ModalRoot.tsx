import { ContentOverlayController } from './ContentOverlayController';
import { useModalState } from './context';
import { modal } from './api';

export function ModalRoot() {
  const modals = useModalState();

  const handleClose = (id: string) => {
    modal.close(id);
  };

  const handleExited = (id: string) => {
    modal.unmount(id);
  };

  const activeModals = modals.filter(m => m.isOpen);

  if (activeModals.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
        backgroundColor: activeModals.length > 0 ? 'rgba(0, 0, 0, 0.5)' : 'transparent',
        transition: 'background-color 0.2s',
      }}
    >
      {modals.map((modal) => (
        <div
          key={modal.id}
        >
          <ContentOverlayController
            id={modal.id}
            isOpen={modal.isOpen}
            Controller={modal.Controller}
            props={modal.props}
            onClose={handleClose}
            onExited={handleExited}
          />
        </div>
      ))}
    </div>
  );
}