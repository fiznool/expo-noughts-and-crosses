import React from 'react';
import Pressable from './primitives/Pressable';
import Text from './primitives/Text';

type Props = {
  value: string,
  isDisabled: boolean,
  onPress: () => void,
};

const GameCell = ({value, isDisabled, onPress}: Props) => {
  return (
    <Pressable
      width={64}
      height={64}
      alignItems="center"
      justifyContent="center"
      backgroundColor="gamepadButtonBackground"
      onPress={onPress}
      disabled={isDisabled}
      style={({pressed}) => ({
        opacity: pressed ? 0.5 : 1,
      })}
    >
      <Text variant="gamepad">{value}</Text>
    </Pressable>
  );
};

export default GameCell;
