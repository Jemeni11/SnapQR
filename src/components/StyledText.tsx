import { StyleSheet } from "react-native";

import { Text, TextProps } from "./Themed";

const StyledTextStyle = StyleSheet.create({
  monoText: {
    fontFamily: "SpaceMono",
  },
});

export function MonoText(props: TextProps) {
  return <Text {...props} style={[props.style, StyledTextStyle.monoText]} />;
}
