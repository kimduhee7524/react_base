import { JSX } from 'react';

export type ModalComponent<T> = (props: {
  close: (result: T) => void;
}) => JSX.Element;
