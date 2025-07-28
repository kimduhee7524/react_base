import { ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface ModalWrapperProps {
  isOpen: boolean;
  onExited: () => void;
  children: ReactNode;
}

export const ModalWrapper = ({ isOpen, onExited, children }: ModalWrapperProps) => {
  return (
    <AnimatePresence onExitComplete={onExited}>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.2 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
