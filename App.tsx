import {StyleSheet, Text, View} from "react-native";
import Editor from "./src/Editor";

export default function App() {
  return (
    <View style={styles.container}>
      <Editor />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
