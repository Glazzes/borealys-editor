import {NativeBaseProvider, Skeleton} from "native-base";
import React from "react";
import {StyleSheet, Text, View} from "react-native";

const ResponseArea = () => {
  return (
    <NativeBaseProvider>
      <View style={styles.skeleton}>
        <Skeleton variant={"rect"} style={styles.skeleton} />
      </View>
    </NativeBaseProvider>
  );
};

export default ResponseArea;

const styles = StyleSheet.create({
  skeleton: {
    width: 400,
    height: 400,
  },
});
