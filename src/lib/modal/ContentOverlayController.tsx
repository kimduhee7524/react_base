import { memo, useEffect } from 'react';
import type { OverlayControllerComponent } from './types';

interface ContentOverlayControllerProps {
  id: string;
  isOpen: boolean;
  Controller: OverlayControllerComponent;
  props: Record<string, any>;
  onClose: (id: string) => void;
  onExited: (id: string) => void;
}

export const ContentOverlayController = memo(
  function ContentOverlayController({
    id,
    isOpen,
    Controller,
    props,
    onClose,
    onExited,
  }: ContentOverlayControllerProps) {
    useEffect(() => {
      // 필요시 
    }, [isOpen]);

    return (
      <Controller
        {...props}
        isOpen={isOpen}
        close={() => onClose(id)}
        unmount={() => onExited(id)}
      />
    );
  }
);