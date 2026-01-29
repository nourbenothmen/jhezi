import React, { useEffect, useRef } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

type Props = {
  children: React.ReactNode;
  onPress?: (...args: any[]) => void;
  accessibilityState?: {
    selected?: boolean;
  };
};

export default function AnimatedTabButton({
  children,
  onPress,
  accessibilityState,
}: Props) {

  const focused = accessibilityState?.selected === true;

  const iconRef = useRef<any>(null);
  const circleRef = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      circleRef.current?.animate({
        0: { scale: 0 },
        1: { scale: 1 },
      });

      iconRef.current?.animate({
        0: { scale: 0.8 },
        1: { scale: 1.2 },
      });
    } else {
      circleRef.current?.animate({
        0: { scale: 1 },
        1: { scale: 0 },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.container}
    >
      <Animatable.View
        ref={circleRef}
        duration={250}
        style={[
          styles.circle,
          { opacity: focused ? 1 : 0 },
        ]}
      />

      <Animatable.View ref={iconRef} duration={250}>
        {children}
      </Animatable.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#7B3FE4',
  },
});
