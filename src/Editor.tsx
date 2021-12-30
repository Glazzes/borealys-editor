import React, {useState} from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-python";

import "ace-builds/src-noconflict/theme-one_dark";
import "ace-builds/src-noconflict/theme-xcode";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";
import ResponseArea from "./ResponseArea";

const {width, height} = Dimensions.get("window");

const Editor = () => {
  const [code, setCode] = useState<string>("");

  return (
    <View style={styles.root}>
      <AceEditor
        mode={"java"}
        theme={"one_dark"}
        tabSize={4}
        highlightActiveLine={true}
        value={code}
        onChange={(currentCode) => setCode(currentCode)}
        style={{padding: 10, borderRadius: 10}}
        setOptions={{
          enableLiveAutocompletion: true,
          enableBasicAutocompletion: true,
          showLineNumbers: true,
          fontSize: 16,
        }}
      />
      <ResponseArea />
    </View>
  );
};

export default Editor;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "row",
  },
});
