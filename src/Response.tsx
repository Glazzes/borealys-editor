import React, {useEffect} from "react";
import {ScrollView, Skeleton} from "native-base";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {emitter} from "./emitter";

const {width, height} = Dimensions.get("window");

type ResponseProps = {
  sending: boolean;
  response: string[];
  status: number;
};

const ResponseArea: React.FC<ResponseProps> = ({sending, response, status}) => {
  const ty = useSharedValue<number>(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: ty.value}],
    };
  });

  useEffect(() => {
    emitter.addListener("raise", function () {
      ty.value = withTiming(-height * 0.4);
    });

    return () => {
      emitter.removeAllListeners();
    };
  }, []);

  return (
    <Animated.View style={[styles.container, rStyle]}>
      {sending ? (
        // @ts-ignore
        <Skeleton variant={"rect"} bg={"teal.500"} style={styles.skeleton} />
      ) : (
        <View style={styles.outputContainer}>
          <ScrollView showsVerticalScrollIndicator={true}>
            {response.map((line, index) => {
              return (
                <Text style={styles.text} key={`line-${index}`}>
                  {line}
                </Text>
              );
            })}
          </ScrollView>
        </View>
      )}
    </Animated.View>
  );
};

export default React.memo(ResponseArea);

const styles = StyleSheet.create({
  container: {
    width,
    height: height * 0.4,
    backgroundColor: "#27282c",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 1000,
    position: "relative",
    overflow: "hidden",
  },
  outputContainer: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 20,
  },
  skeleton: {
    flex: 1,
    backgroundColor: "#27282c",
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
});
