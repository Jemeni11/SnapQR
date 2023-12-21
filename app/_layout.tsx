// #ACA7CB - BG
// #0C0C1C - Text

import React, { useEffect } from "react";
import { SplashScreen } from "expo-router";
import { Drawer } from "expo-router/drawer";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useColorScheme } from "react-native";
import {
  ThemeProvider,
  DarkTheme,
  DefaultTheme,
  useTheme,
} from "@react-navigation/native";

const customDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: "rgb(209, 207, 227)",
    background: "rgb(24, 24, 27)",
  },
};

const customDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(81, 72, 106)",
    background: "rgb(242, 242, 242)",
  },
};

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const scheme = useColorScheme();
  let [fontsLoaded, fontError] = useFonts({
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      // Hide the splash screen after the fonts have loaded
      // (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  // Prevent rendering until the font has loaded
  //  or an error was returned
  if (!fontsLoaded && !fontError) {
    return null;
  }

  // Render the children routes now that all the assets are loaded.
  return (
    <SafeAreaProvider>
      <ThemeProvider
        value={scheme === "dark" ? customDarkTheme : customDefaultTheme}
      >
        <Drawer>
          <Drawer.Screen
            name="index"
            options={{
              drawerLabel: "Home",
              title: "Home",
            }}
          />
          <Drawer.Screen
            name="ScanQR"
            options={{
              drawerLabel: "Scan QR",
              title: "Scan QR",
            }}
          />
          <Drawer.Screen
            name="CreateQR"
            options={{
              drawerLabel: "Create QR",
              title: "Create QR",
            }}
          />
          <Drawer.Screen
            name="History"
            options={{
              drawerLabel: "History",
              title: "History",
            }}
          />
          <Drawer.Screen
            name="Stats"
            options={{
              drawerLabel: "Stats",
              title: "Stats",
            }}
          />
          <Drawer.Screen
            name="Settings"
            options={{
              drawerLabel: "Settings",
              title: "Settings",
            }}
          />
        </Drawer>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
