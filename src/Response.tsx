import React, {useEffect} from "react";
import {FlatList, Icon, Skeleton} from "native-base";
import {Dimensions, ListRenderItemInfo, StyleSheet, Text, View} from "react-native";
import Animated, {useAnimatedStyle, useSharedValue, withTiming} from "react-native-reanimated";
import {emitter} from "./emitter";
import {MaterialCommunityIcons} from "@expo/vector-icons";

const {width, height} = Dimensions.get("window");

type ResponseProps = {
  sending: boolean;
  response: string[];
  status: number;
};

function renderItem(line: ListRenderItemInfo<string>): React.ReactElement {
  return <Text style={styles.text}>{line.item}</Text>;
}

function keyExtractor(_: string, index: number): string {
  return `line-${index}`;
}

const ResponseArea: React.FC<ResponseProps> = ({sending, response, status}) => {
  const ty = useSharedValue<number>(0);

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: ty.value}],
    };
  });

  const closeResponse = () => {
    ty.value = withTiming(0);
  };

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
        <Skeleton
          // @ts-ignore
          variant={"rect"}
          startColor={"gray.700"}
          endColor={"gray.800"}
          style={styles.skeleton}
        />
      ) : (
        <View style={styles.outputContainer}>
          <View style={styles.info}>
            <Icon
              as={MaterialCommunityIcons}
              name="close"
              color={"dark.900"}
              size={"md"}
              onPress={closeResponse}
            />
          </View>
          <FlatList
            data={response}
            keyExtractor={keyExtractor}
            renderItem={renderItem}
            showsVerticalScrollIndicator={true}
            initialNumToRender={200}
            maxToRenderPerBatch={1000}
          />
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
  info: {
    position: "absolute",
    right: 50,
    top: 20,
    zIndex: 1200,
  },
  skeleton: {
    flex: 1,
    backgroundColor: "#27282c",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "sftp-regular",
  },
});
