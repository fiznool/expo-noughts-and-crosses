import {
  BackgroundColorProps,
  createRestyleComponent,
  layout,
  LayoutProps,
  spacing,
  SpacingProps,
  border,
  BorderProps,
  backgroundColor,
} from '@shopify/restyle';
import {ComponentProps, PropsWithChildren} from 'react';
import {Pressable as RNPressable} from 'react-native';
import {Theme} from '../../theme';

type RestyleProps = LayoutProps<Theme> & BackgroundColorProps<Theme> & SpacingProps<Theme> & BorderProps<Theme>;
type Props = PropsWithChildren<RestyleProps & ComponentProps<typeof RNPressable>>;

const Pressable = createRestyleComponent<Props, Theme>([layout, backgroundColor, spacing, border], RNPressable);

export default Pressable;
