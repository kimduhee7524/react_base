import type { FC } from 'react';

export type OverlayControllerProps = {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
};

export type OverlayAsyncControllerProps<T> = Omit<OverlayControllerProps, 'close'> & {
  close: (param?: T) => void;
};

// 동기 모달 컴포넌트 타입
export type OverlayControllerComponent = FC<OverlayControllerProps>;

// 비동기 모달 컴포넌트 타입
export type OverlayAsyncControllerComponent<T> = FC<OverlayAsyncControllerProps<T>>;

export type OpenOverlayOptions = {
  overlayId?: string;
};

export interface OverlayState<T = any> {
  id: string;
  isOpen: boolean;
  Controller: FC<any>;
  props: any;
  resolve?: (value: T | PromiseLike<T>) => void;
}