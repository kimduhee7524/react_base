import type { OverlayControllerComponent } from './types';

type Events = {
  open: (
    payload: {
      id: string;
      Controller: OverlayControllerComponent;
      props: Record<string, any>;
    }
  ) => void;
  close: (payload: { id: string; value?: unknown }) => void;
  unmount: (payload: { id: string }) => void;
  closeAll: () => void;
  unmountAll: () => void;
};

type Emitter = {
  on: <K extends keyof Events>(
    eventName: K,
    callback: Events[K]
  ) => () => void;
  emit: <K extends keyof Events>(
    eventName: K,
    ...args: Parameters<Events[K]>
  ) => void;
};

function createEmitter(): Emitter {
  const listeners: { [K in keyof Events]?: Events[K][] } = {};

  return {
    // 이벤트 등록
    on(eventName, callback) {
      if (!listeners[eventName]) {
        listeners[eventName] = [];
      }
      const eventListeners = listeners[eventName] as Events[typeof eventName][];
      eventListeners.push(callback);

      // 이벤트 제거
      return () => {
        const index = eventListeners.indexOf(callback);
        if (index > -1) {
          eventListeners.splice(index, 1);
        }
      };
    },
    // 이벤트 발생
    emit(eventName, ...args) {
      const eventListeners = listeners[eventName];
      if (eventListeners) {
        eventListeners.forEach((cb) => (cb as any)(...args));
      }
    },
  };
}

export const emitter = createEmitter();