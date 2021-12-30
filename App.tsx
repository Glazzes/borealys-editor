import {NativeBaseProvider} from "native-base";
import {StyleSheet, Text, View} from "react-native";
import CodeEditor from "./src/CodeEditor";
import Editor from "./src/Editor";

export default function App() {
  return (
    <NativeBaseProvider>
      <View style={styles.container}>
        <CodeEditor />
      </View>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
});
