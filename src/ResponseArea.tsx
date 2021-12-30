import React from "react";
import {Skeleton} from "native-base";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const {width, height} = Dimensions.get("window");

type ResponseProps = {
  sending: boolean;
  response: string[];
};

const ResponseArea: React.FC<ResponseProps> = ({sending}) => {
  const top = useSharedValue<number>(height);

  const rStyle = useAnimatedStyle(() => ({
    position: "absolute",
    top: top.value,
    left: 0,
  }));

  useAnimatedReaction(
    () => sending,
    (bool) => {
      if (bool) {
        top.value = withSpring(height / 2);
      } else {
        top.value = withTiming(height);
      }
    },
  );

  return (
    <Animated.View style={[styles.response, rStyle]}>
      <Skeleton variant={"rect"} style={styles.skeleton} />
    </Animated.View>
  );
};

export default ResponseArea;

const styles = StyleSheet.create({
  response: {
    width,
    height: height / 2,
  },
  skeleton: {
    flex: 1,
  },
});
