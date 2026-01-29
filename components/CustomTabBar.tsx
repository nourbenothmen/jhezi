// components/CustomTabBar.tsx
import React, { useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { MotiView } from 'moti';
import Svg, { Path } from 'react-native-svg';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const TAB_BAR_HEIGHT = 70;
const NOTCH_RADIUS = 28; // rayon du creux (ajuste selon tes besoins)
const CIRCLE_DIAMETER = 56;
const CIRCLE_RADIUS = CIRCLE_DIAMETER / 2;

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const tabCount = state.routes.length;
  const tabWidth = SCREEN_WIDTH / tabCount;

  const animatedX = useSharedValue(state.index * tabWidth);

  useEffect(() => {
    animatedX.value = withTiming(state.index * tabWidth, { duration: 400 });
  }, [state.index]);

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: animatedX.value + tabWidth / 2 - CIRCLE_RADIUS,
      },
    ],
  }));

  const svgAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: animatedX.value }],
  }));

  const renderPath = (activeIndex: number) => {
    const centerX = activeIndex * tabWidth + tabWidth / 2;

    // Points pour une courbe douce (cercle-like notch)
    const startX = centerX - NOTCH_RADIUS;
    const endX = centerX + NOTCH_RADIUS;

    return `
      M 0 ${TAB_BAR_HEIGHT}
      L ${startX} ${TAB_BAR_HEIGHT}
      C ${startX} ${TAB_BAR_HEIGHT - NOTCH_RADIUS * 0.8}, ${centerX - NOTCH_RADIUS * 0.6} ${TAB_BAR_HEIGHT - NOTCH_RADIUS * 1.4}, ${centerX} ${TAB_BAR_HEIGHT - NOTCH_RADIUS}
      C ${centerX + NOTCH_RADIUS * 0.6} ${TAB_BAR_HEIGHT - NOTCH_RADIUS * 1.4}, ${endX} ${TAB_BAR_HEIGHT - NOTCH_RADIUS * 0.8}, ${endX} ${TAB_BAR_HEIGHT}
      L ${SCREEN_WIDTH} ${TAB_BAR_HEIGHT}
      L ${SCREEN_WIDTH} 0
      L 0 0
      Z
    `;
  };

  return (
    <View style={styles.container}>
      {/* Cercle violet mobile */}
      <Animated.View style={[styles.circleContainer, animatedCircleStyle]}>
        <View style={styles.circle} />
      </Animated.View>

      {/* SVG avec encoche animée */}
      <Animated.View style={[StyleSheet.absoluteFill, svgAnimatedStyle]}>
        <Svg width={SCREEN_WIDTH} height={TAB_BAR_HEIGHT} viewBox={`0 0 ${SCREEN_WIDTH} ${TAB_BAR_HEIGHT}`}>
          <Path d={renderPath(state.index)} fill="#000000" />
        </Svg>
      </Animated.View>

      {/* Onglets tactiles */}
      <View style={styles.tabsRow}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const icon = options.tabBarIcon?.({
            focused: isFocused,
            color: isFocused ? '#FFFFFF' : '#888888',
            size: 28,
          });

          return (
            <TouchableOpacity
              key={route.key}
              style={styles.tabItem}
              onPress={onPress}
              activeOpacity={0.8}
            >
              <MotiView
                animate={{
                  translateY: isFocused ? -NOTCH_RADIUS * 0.8 : 0,
                }}
                transition={{
                  type: 'timing',
                  duration: 400,
                }}
                style={styles.iconWrapper}
              >
                {icon}
              </MotiView>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
  },
  circleContainer: {
    position: 'absolute',
    bottom: TAB_BAR_HEIGHT - CIRCLE_RADIUS - 4, // un peu au-dessus de la barre
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_DIAMETER,
    height: CIRCLE_DIAMETER,
    borderRadius: CIRCLE_RADIUS,
    backgroundColor: '#8A2BE2',
    shadowColor: '#8A2BE2',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  tabsRow: {
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrapper: {
    // paddingTop pour compenser l'élévation
    paddingTop: 8,
  },
});

export default CustomTabBar;