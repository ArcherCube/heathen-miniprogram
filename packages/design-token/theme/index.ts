import { Config } from 'tailwindcss';

export const theme = {
  colors: {
    black: {
      0: '#000000',
      1: '#262626',
      2: '#595959',
      3: '#8C8C8C',
      4: '#A6A6A6',
      5: '#D9D9D9',
      6: '#EBEBEB',
      7: '#F5F5F5',
      8: '#FAFAFA',
      9: '#FFFFFF',
    },
    success: {
      1: '#f6ffed',
      2: '#d9f7be',
      3: '#b7eb8f',
      4: '#95de64',
      5: '#73d13d',
      6: '#52c41a',
    },
    warning: {
      1: '#feffe6',
      2: '#ffffb8',
      3: '#fffb8f',
      4: '#fff566',
      5: '#ffec3d',
      6: '#fadb14',
    },
    error: {
      1: '#fff1f0',
      2: '#ffccc7',
      3: '#ffa39e',
      4: '#ff7875',
      5: '#ff4d4f',
      6: '#f5222d',
    },
  },
} satisfies Config['theme'];
