import axios from "axios";
import {Text, IconButton, Select, useToast} from "native-base";
import React, {useState, useEffect} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import Editor from "./TextEditor";
import ResponseArea from "./Response";
import {Language} from "./types/Language";
import {emitter} from "./emitter";

const {width, height} = Dimensions.get("window");

const CodeEditor = () => {
  const toast = useToast();

  const [languages, setLanguages] = useState<Language[]>([]);
  const [selectLanguage, setSelectedLanguage] = useState<string>("");

  const [code, setCode] = useState<string>("");
  const [status, setStatus] = useState<number>(200);

  const [sending, setSending] = useState<boolean>(false);
  const [response, setResponse] = useState<string[]>([]);

  const sendCode = () => {
    if (selectLanguage === "") {
      toast.show({
        title: "Select a language",
        description: "You must select a programming language before running your code!",
        status: "warning",
      });

      return;
    }

    setSending(true);
    emitter.emit("raise");

    const runnableCode = {
      language: selectLanguage,
      code: code.split("\n"),
    };

    axios
      .post("http://localhost:5000/api/run", runnableCode)
      .then(({data, status}) => {
        setResponse(data["Output"]);
        setStatus(status);
      })
      .catch(({data}) => {
        setResponse(data["Output"]);
        setStatus(status);
      })
      .finally(() => setSending(false));
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/languages")
      .then(({data}: {data: Language[]}) => setLanguages(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <View style={styles.root}>
      <View style={styles.header}>
        <View style={styles.info}>
          <Text bold color={"dark.900"} style={styles.info}>
            Borealys
          </Text>
          <Select
            selectedValue={selectLanguage}
            placeholder="Choose a language"
            onValueChange={(val) => setSelectedLanguage(val)}
            variant={"filled"}
            minWidth={"200"}>
            {languages.map((lang) => {
              return <Select.Item label={lang.name} value={lang.name} key={`lang-${lang.name}`} />;
            })}
          </Select>
        </View>
        <IconButton
          borderRadius={"full"}
          variant={"solid"}
          bg={"info.500"}
          onPress={sendCode}
          _icon={{
            as: MaterialCommunityIcons,
            name: "play",
            color: "dark.900",
            size: "sm",
          }}
        />
      </View>
      <Editor mode={selectLanguage} code={code} setCode={setCode} />
      <ResponseArea status={status} sending={sending} response={response} />
    </View>
  );
};

export default CodeEditor;

const styles = StyleSheet.create({
  root: {
    width,
    height,
  },
  info: {
    fontSize: 25,
    marginRight: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  header: {
    width: width,
    height: 60,
    backgroundColor: "#27282c",
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
