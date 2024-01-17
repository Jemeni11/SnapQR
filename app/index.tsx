import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
// import { GlobalStyles } from "../styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";
// import TabScreen from "../components/TabScreen";
// import PageTitle from "../components/PageTitle";
import { Ionicons } from "@expo/vector-icons";

export default function HomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  function HomeButton({ onClick, text }) {
    return (
      <TouchableOpacity style={styles.homeButton} onPress={onClick}>
        <Text style={styles.homeButtonText}>{text}</Text>
        <Ionicons
          name="arrow-forward"
          size={30}
          // color={GlobalStyles.color.secondaryColor}
        />
      </TouchableOpacity>
    );
  }

  return (
    <View>
      <Text>Home</Text>
    </View>
    );
}

const styles = StyleSheet.create({
  container: {},
  homeButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
  },
  homeButtonText: {
    // fontFamily: GlobalStyles.fonts.regular,
    fontSize: 25,
    // color: GlobalStyles.color.secondaryColor,
  },
});
