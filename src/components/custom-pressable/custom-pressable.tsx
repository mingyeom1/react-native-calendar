import React, { forwardRef, useMemo } from 'react';
import {
  GestureResponderEvent,
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  View,
  ViewStyle,
} from 'react-native';
import { isArray } from '~/utils/is-array';
import { isFunction } from '~/utils/is-function';
import { throttle } from '~/utils/throttle';

const DEFAULT_THROTTLE_DURATION = 1000;
const PRESS_SCALE = 0.99;

export enum PressDelay {
  FASTEST = 0,
  FAST = 50,
  SLOW = 100,
  SLOWEST = 150,
}

export const doNothing = () => {
  return;
};

const reactivePressableStyles = (
  style?: StyleProp<ViewStyle>,
  activeOpacity?: number,
  pressScale?: number,
): ((state: PressableStateCallbackType) => StyleProp<ViewStyle>) => {
  if (!style) {
    return ({ pressed }) => [
      { opacity: pressed ? activeOpacity : 1 },
      { transform: [{ scale: pressed ? pressScale ?? PRESS_SCALE : 1 }] },
    ];
  }
  if (isArray(style)) {
    return ({ pressed }) => [
      ...style,
      { opacity: pressed ? activeOpacity : 1 },
      { transform: [{ scale: pressed ? pressScale ?? PRESS_SCALE : 1 }] },
    ];
  }
  return ({ pressed }) => [
    style,
    { opacity: pressed ? activeOpacity : 1 },
    { transform: [{ scale: pressed ? pressScale ?? PRESS_SCALE : 1 }] },
  ];
};

export type CustomPressableProps = PressableProps & {
  throttleDisabled?: boolean;
  throttleDuration?: number;
  onPress?: (event: GestureResponderEvent) => void;
  onPressIn?: (event: GestureResponderEvent) => void;
  onPressOut?: (event: GestureResponderEvent) => void;
  unstable_pressDelay?: PressDelay;
  activeOpacity?: number;
  pressScale?: number;
};

export const CustomPressable = forwardRef<View, CustomPressableProps>(
  (
    {
      style,
      onPress = doNothing,
      onPressIn = doNothing,
      onPressOut = doNothing,
      throttleDisabled,
      throttleDuration = DEFAULT_THROTTLE_DURATION,
      activeOpacity = 0.8,
      pressScale = 0.99,
      ...props
    }: CustomPressableProps,
    ref,
  ) => {
    const customStyle = useMemo(
      () =>
        isFunction(style)
          ? style
          : reactivePressableStyles(style, activeOpacity, pressScale),
      [activeOpacity, pressScale, style],
    );

    const throttledOnPress = useMemo(
      () =>
        throttle<(event: GestureResponderEvent) => void>(
          onPress,
          throttleDuration,
          { leading: true, trailing: false },
        ),
      [onPress, throttleDuration],
    );
    const throttledOnPressIn = useMemo(
      () =>
        throttle<(event: GestureResponderEvent) => void>(
          onPressIn,
          throttleDuration,
          {
            leading: true,
            trailing: false,
          },
        ),
      [onPressIn, throttleDuration],
    );
    const throttledOnPressOut = useMemo(
      () =>
        throttle<(event: GestureResponderEvent) => void>(
          onPressOut,
          throttleDuration,
          {
            leading: true,
            trailing: false,
          },
        ),
      [onPressOut, throttleDuration],
    );

    return (
      <Pressable
        {...props}
        ref={ref}
        style={activeOpacity === 1 ? style : customStyle}
        onPress={throttleDisabled ? onPress : throttledOnPress}
        onPressIn={throttleDisabled ? onPressIn : throttledOnPressIn}
        onPressOut={throttleDisabled ? onPressOut : throttledOnPressOut}
      />
    );
  },
);
