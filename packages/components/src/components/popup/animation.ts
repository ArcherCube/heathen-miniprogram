import { LayerProps } from '../layer';
import { PopupProps } from './popup';

const maskAnimation: NonNullable<LayerProps['animation']>['mask'] = {
  close: [
    {
      style: {
        opacity: 0,
      },
    },
  ],
  show: [
    {
      style: {
        opacity: 1,
      },
    },
  ],
};

export const ANIMATION_CONFIG: Record<NonNullable<PopupProps['placement']>, LayerProps['animation']> = {
  bottom: {
    mask: maskAnimation,
    body: {
      show: [
        {
          style: { opacity: 1, transform: 'translate(0,0)', transformOrigin: '50% 100%' },
        },
      ],
      close: [
        {
          style: { opacity: 0, transform: 'translate(0,100%)', transformOrigin: '50% 100%' },
        },
      ],
    },
  },
  top: {
    mask: maskAnimation,
    body: {
      show: [
        {
          style: { opacity: 1, transform: 'translate(0,0)', transformOrigin: '50% 100%' },
        },
      ],
      close: [
        {
          style: { opacity: 0, transform: 'translate(0,-100%)', transformOrigin: '50% 100%' },
        },
      ],
    },
  },
  left: {
    mask: maskAnimation,
    body: {
      show: [
        {
          style: { opacity: 1, transform: 'translate(0,0)', transformOrigin: '100% 50%' },
        },
      ],
      close: [
        {
          style: { opacity: 0, transform: 'translate(-100%,0)', transformOrigin: '100% 50%' },
        },
      ],
    },
  },
  right: {
    mask: maskAnimation,
    body: {
      show: [
        {
          style: { opacity: 1, transform: 'translate(0,0)', transformOrigin: '100% 50%' },
        },
      ],
      close: [
        {
          style: { opacity: 0, transform: 'translate(100%,0)', transformOrigin: '100% 50%' },
        },
      ],
    },
  },
};
