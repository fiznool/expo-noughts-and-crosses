import React from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {ThemeProvider} from '@shopify/restyle';
import theme from './theme';
import Text from './components/primitives/Text';
import SafeAreaView from './components/primitives/SafeAreaView';
import Box from './components/primitives/Box';
import GameBoard from './components/GameBoard';

const MainScreen = () => {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView flex={1} alignItems="center" justifyContent="center">
        <MaterialCommunityIcons name="sword-cross" size={64} color={theme.colors.textPrimary} />
        <Text variant="header">Noughts & Crosses</Text>
        <Box my="l">
          <GameBoard />
        </Box>
      </SafeAreaView>
    </ThemeProvider>
  );
};

export default MainScreen;
