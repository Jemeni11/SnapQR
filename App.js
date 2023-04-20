import { useCallback } from "react";
import { Platform } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./screens/HomeScreen";
import HistoryScreen from "./screens/HistoryScreen";
import SettingsScreen from "./screens/SettingsScreen";
import ScanFromCamera from "./screens/ScanFromCamera";
import ScanFromImage from "./screens/ScanFromImage";

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
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "./styles";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeTabStackScreen() {
  function CustomTabBarIcon({ focused, name, size, color }) {
    return (
      <Ionicons
        name={`${name}${focused ? "" : "-outline"}`}
        size={size}
        color={color}
      />
    );
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: GlobalStyles.color.primaryColor,
          height: 50,
          borderColor: GlobalStyles.color.primaryColor,
          borderTopWidth: 0,
          elevation: 0,
          shadowColor: Platform.OS === "ios" ? "transparent" : undefined,
          shadowOffset: Platform.OS === "ios" ? { height: 0 } : undefined,
          shadowOpacity: Platform.OS === "ios" ? 0 : undefined,
          shadowRadius: Platform.OS === "ios" ? 0 : undefined,
        },
        tabBarActiveTintColor: GlobalStyles.color.secondaryColor,
        tabBarInactiveTintColor: GlobalStyles.color.accentColor,
        tabBarLabelStyle: {
          fontSize: 15,
        },
        headerStyle: {
          backgroundColor: GlobalStyles.color.primaryColor,
        },
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <CustomTabBarIcon
              focused={focused}
              name="home"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="HistoryScreen"
        component={HistoryScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <CustomTabBarIcon
              focused={focused}
              name="time"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "History",
        }}
      />
      <Tab.Screen
        name="SecurityScreen"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ focused, size, color }) => (
            <CustomTabBarIcon
              focused={focused}
              name="settings"
              size={size}
              color={color}
            />
          ),
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  let [fontsLoaded] = useFonts({
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

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaProvider onLayout={onLayoutRootView}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="HomeTabStackScreen"
            component={HomeTabStackScreen}
          />
          <Stack.Screen
            name="ScanFromCameraScreen"
            component={ScanFromCamera}
          />
          <Stack.Screen name="ScanFromImageScreen" component={ScanFromImage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
