import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogOverlay,
  DialogPortal,
  DialogClose,
} from '@/components/ui/dialog';
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface ModalWrapperProps {
  title: string;
  children: ReactNode;
  close: (result: { status: 'success' | 'error' | 'close' }) => void;
  className?: string;
}

export function ModalWrapper({
  title,
  children,
  close,
  className,
}: ModalWrapperProps) {
  return (
    <Dialog open onOpenChange={(open) => !open && close({ status: 'close' })}>
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={cn('max-w-4xl max-h-[90vh] overflow-y-auto', className)}
        >
          <DialogHeader className="flex items-center justify-between">
            <DialogTitle>{title}</DialogTitle>
            <DialogClose
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100"
              onClick={() => close({ status: 'close' })}
            ></DialogClose>
          </DialogHeader>
          <div>{children}</div>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}
