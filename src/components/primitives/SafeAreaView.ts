import {createRestyleComponent, layout, LayoutProps} from '@shopify/restyle';
import {PropsWithChildren} from 'react';
import {SafeAreaView as RNSafeAreaView} from 'react-native';
import {Theme} from '../../theme';

type Props = PropsWithChildren<LayoutProps<Theme>>;
const SafeAreaView = createRestyleComponent<Props, Theme>([layout], RNSafeAreaView);

export default SafeAreaView;
