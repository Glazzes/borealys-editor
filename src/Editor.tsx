import React, {useState} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-python";

import "ace-builds/src-noconflict/theme-gruvbox";
import "ace-builds/src-noconflict/theme-xcode";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";

const {width, height} = Dimensions.get("window");

type TextEditorProps = {
  mode: string;
};

const Editor: React.FC<TextEditorProps> = ({mode}) => {
  const [code, setCode] = useState<string>("");

  return (
    <View style={styles.root}>
      <AceEditor
        mode={mode}
        theme={"gruvbox"}
        tabSize={4}
        value={code}
        onChange={(currentCode) => setCode(currentCode)}
        width="100%"
        height="100%"
        placeholder="Start coding!!!!"
        focus={true}
        showPrintMargin={false}
        setOptions={{
          enableLiveAutocompletion: true,
          enableBasicAutocompletion: true,
          showLineNumbers: true,
          fontSize: 19,
          animatedScroll: true,
          newLineMode: true,
          wrap: true,
        }}
      />
    </View>
  );
};

export default Editor;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
