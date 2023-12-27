import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TabScreen from "../components/TabScreen";
import PageTitle from "../components/PageTitle";
import { GlobalStyles } from "../styles";
import historyMMKVStorage from "../storage/history";

export default function HistoryScreen() {
  const allHistoryKeys = historyMMKVStorage.getAllKeys();
  console.log(allHistoryKeys)
  const historyArray = [];
  for (let i of allHistoryKeys) {
    if (historyMMKVStorage.getString(i)) {
      console.log("____", historyMMKVStorage.getString(i))
      historyArray.push(JSON.parse(historyMMKVStorage.getString(i)));
    }
  }
  console.log(historyArray);

  const insets = useSafeAreaInsets();
  return (
    <TabScreen extraStyles={{ paddingTop: insets.top }}>
      <PageTitle title="History" />
      {historyArray.map((historyItem) => {
        return (
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                color: GlobalStyles.color.secondaryColor,
              }}
            >
              {historyItem.aspect_ratio}
            </Text>
          </View>
        );
      })}
    </TabScreen>
  );
}

const styles = StyleSheet.create({});
