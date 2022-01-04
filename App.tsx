import {useFonts} from "expo-font";
import {extendTheme, NativeBaseProvider} from "native-base";
import {StyleSheet, View} from "react-native";
import CodeEditor from "./src/CodeEditor";

const theme = extendTheme({
  colors: {
    buttons: {
      "900": "#212227",
    },
  },
});

export default function App() {
  let [fontLoaded] = useFonts({
    "sftp-regular": require("./assets/fonts/sftp-regular.ttf"),
  });

  return (
    <NativeBaseProvider theme={theme}>
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
