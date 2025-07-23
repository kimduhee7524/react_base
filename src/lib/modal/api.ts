import { emitter } from './emitter';
import { randomId } from './utils';
import type {
  OverlayControllerComponent,
  OverlayAsyncControllerComponent,
  OpenOverlayOptions,
} from './types';

class OverlayManager {
  private emitter = emitter;

  open(
    controller: OverlayControllerComponent,
    options?: OpenOverlayOptions
  ) {
    const overlayId = options?.overlayId ?? randomId();

    this.emitter.emit('open', {
      id: overlayId,
      Controller: controller,
      props: {},
    });
    return overlayId;
  }

  openAsync<T>(
    controller: OverlayAsyncControllerComponent<T>,
    options?: OpenOverlayOptions
  ): Promise<T> {
    const overlayId = options?.overlayId ?? randomId();
    const unmount = () => this.unmount(overlayId);

    return new Promise<T>((resolve) => {
      this.open((props) => {
        const close = (value: T) => {
          resolve(value);
          unmount();
        };
        return controller({ ...props, close, unmount });
      }, { overlayId });
    });
  }

  close<T>(id: string, value?: T) {
    this.emitter.emit('close', { id, value });
  }

  unmount(id: string) {
    this.emitter.emit('unmount', { id });
  }

  closeAll() {
    this.emitter.emit('closeAll');
  }

  unmountAll() {
    this.emitter.emit('unmountAll');
  }
}

export const modal = new OverlayManager();