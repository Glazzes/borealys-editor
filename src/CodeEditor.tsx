import axios from "axios";
import {Icon, IconButton, Select} from "native-base";
import React, {useState, useEffect} from "react";
import {Dimensions, StyleSheet, Text, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Editor from "./Editor";
import ResponseArea from "./ResponseArea";
import {Language} from "./types/Language";

const {width} = Dimensions.get("window");

const CodeEditor = () => {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectLanguage, setSelectedLanguage] = useState<string>("");

  const [sending, setSending] = useState<boolean>(false);
  const [response, setResponse] = useState<string[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/languages")
      .then(({data}: {data: Language[]}) => setLanguages(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View>
          <Select
            selectedValue={selectLanguage}
            placeholder="Choose a language"
            onValueChange={(val) => setSelectedLanguage(val)}
            variant={"unstyled"}
            minWidth={"200"}
            _selectedItem={{
              _text: {
                color: "dark.900",
              },
            }}>
            {languages.map((lang) => {
              return <Select.Item label={lang.name} value={lang.name} key={`lang-${lang.name}`} />;
            })}
          </Select>
        </View>
        <IconButton
          borderRadius={"full"}
          icon={<Icon as={MaterialCommunityIcons} name={"play"} />}
          _icon={{
            color: "dark.900",
            size: "md",
          }}
        />
      </View>
      <Editor mode={selectLanguage} />
      <ResponseArea sending={false} response={[]} />
    </View>
  );
};

export default CodeEditor;

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  header: {
    width: width,
    height: 50,
    backgroundColor: "#27282c",
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
