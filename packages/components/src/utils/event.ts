import { ITouchEvent } from '@tarojs/components';

interface ClientCoordinates {
  clientX: number;
  clientY: number;
}

export function getClientCoordinates(event: ITouchEvent | MouseEvent): ClientCoordinates {
  // @ts-ignore
  const { clientX, clientY, detail = {}, touches = [] } = event;

  if (clientX && clientY) {
    return {
      clientX,
      clientY,
    };
  }
  return touches[0] || { clientX: detail.x || detail.clientX, clientY: detail.y || detail.clientY };
}
