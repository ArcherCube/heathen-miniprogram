import { LayerProps } from '../layer';
import { PopupProps } from './popup';

const maskAnimation: NonNullable<LayerProps['animation']>['mask'] = {
  close: [
    {
      duration: 200,
      ease: 'ease-out',
      style: {
        opacity: 0,
      },
    },
  ],
  show: [
    {
      duration: 300,
      ease: 'ease-out',
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
          ease: 'ease-out',
          duration: 300,
        },
      ],
      close: [
        {
          style: { opacity: 0, transform: 'translate(0,40%)', transformOrigin: '50% 100%' },
          ease: 'ease-out',
          duration: 200,
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
          ease: 'ease-out',
          duration: 300,
        },
      ],
      close: [
        {
          style: { opacity: 0, transform: 'translate(0,-40%)', transformOrigin: '50% 100%' },
          ease: 'ease-out',
          duration: 200,
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
          ease: 'ease-out',
          duration: 300,
        },
      ],
      close: [
        {
          style: { opacity: 0, transform: 'translate(-40%,0)', transformOrigin: '100% 50%' },
          ease: 'ease-out',
          duration: 200,
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
          ease: 'ease-out',
          duration: 300,
        },
      ],
      close: [
        {
          style: { opacity: 0, transform: 'translate(40%,0)', transformOrigin: '100% 50%' },
          ease: 'ease-out',
          duration: 200,
        },
      ],
    },
  },
};
