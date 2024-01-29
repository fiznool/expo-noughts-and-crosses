import {createTheme} from '@shopify/restyle';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#2B2B2B',
  white: '#F0F2F3',
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    textPrimary: palette.black,
    gamepadButtonText: palette.white,
    gamepadButtonBackground: palette.greenPrimary,
    newGameButtonText: palette.white,
    newGameButtonBackground: palette.purplePrimary,
  },
  spacing: {
    s: 4,
    m: 8,
    l: 12,
    xl: 16,
  },
  borderRadii: {
    s: 1,
    m: 2,
    lg: 4,
    xl: 8,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 24,
      lineHeight: 36,
    },
    subheader: {
      fontWeight: 'bold',
      fontSize: 20,
      lineHeight: 28,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    button: {
      fontSize: 18,
      lineHeight: 28,
      fontWeight: 700,
      textAlign: 'center',
    },
    gamepad: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'gamepadButtonText',
    },
    defaults: {
      // We can define a default text variant here.
      color: 'textPrimary',
    },
  },
});

export type Theme = typeof theme;
export default theme;
