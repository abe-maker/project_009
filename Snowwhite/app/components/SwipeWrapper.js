// app/components/SwipeWrapper.js
import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  runOnJS,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");

export default function SwipeWrapper({ children, navigation, user }) {
  const translateX = useSharedValue(0);
  const screens = ["Leaderboard", "Main", "Highscores"];

  const handleSwipe = (direction) => {
    const currentIndex = screens.indexOf(
      navigation.getState().routes[navigation.getState().index].name
    );
    if (direction === "left" && currentIndex < screens.length - 1)
      navigation.navigate(screens[currentIndex + 1], { user });
    if (direction === "right" && currentIndex > 0)
      navigation.navigate(screens[currentIndex - 1], { user });
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      const threshold = width / 4;
      if (translateX.value > threshold) runOnJS(handleSwipe)("right");
      else if (translateX.value < -threshold) runOnJS(handleSwipe)("left");
      translateX.value = withSpring(0);
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const handleMenuPress = (screen) => navigation.navigate(screen, { user });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.wrapper, animatedStyle]}>
        {children}

        {/* Menü unten */}
        <View style={styles.menu}>
          <TouchableOpacity onPress={() => handleMenuPress("Leaderboard")}>
            <Text style={styles.menuText}>🌐</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress("Main")}>
            <Text style={styles.menuText}>🎮</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleMenuPress("Highscores")}>
            <Text style={styles.menuText}>⭐</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1 },
  menu: {
    flexDirection: "row",
    position: "absolute",
    bottom: 30,
    width: "100%",
    justifyContent: "space-around",
  },
  menuText: { fontSize: 30 },
});
