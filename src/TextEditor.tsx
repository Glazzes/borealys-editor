import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-java";
import "ace-builds/src-noconflict/mode-kotlin";
import "ace-builds/src-noconflict/mode-golang";
import "ace-builds/src-noconflict/mode-python";

import "ace-builds/src-noconflict/theme-crimson_editor";
import "ace-builds/src-noconflict/theme-xcode";

import "ace-builds/src-noconflict/ext-language_tools";
import "ace-builds/src-noconflict/ext-beautify";

type TextEditorProps = {
  mode: string;
  code: string;
  setCode: React.Dispatch<React.SetStateAction<string>>;
};

const {height, width} = Dimensions.get("window");

const TextEditor: React.FC<TextEditorProps> = ({mode, code, setCode}) => {
  return (
    <View style={styles.root}>
      <AceEditor
        mode={mode.toLocaleLowerCase()}
        theme={"xcode"}
        tabSize={4}
        value={code}
        onChange={(currentCode) => setCode(currentCode)}
        placeholder="Start coding!!!!"
        focus={true}
        showPrintMargin={false}
        width="100%"
        height="1000px"
        style={{flex: 1}}
        setOptions={{
          enableLiveAutocompletion: true,
          enableBasicAutocompletion: true,
          showLineNumbers: true,
          fontSize: 20,
          animatedScroll: true,
          newLineMode: true,
          wrap: true,
        }}
      />
    </View>
  );
};

export default React.memo(TextEditor);

const styles = StyleSheet.create({
  root: {
    width,
    height: height - 60,
  },
});
