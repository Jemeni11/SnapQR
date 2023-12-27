import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { GlobalStyles } from "../styles";
import TabScreen from "../components/TabScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScanFromCamera({ navigation }) {
  const insets = useSafeAreaInsets();
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [currentCamera, setCurrentCamera] = useState("back");

  function switchCurrentCamera() {
    setCurrentCamera(currentCamera === "back" ? "front" : "back");
  }

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = (BarCodeScannerResult) => {
    setScanned(true);
    navigation.navigate("QRCodeDetailsScreen", {
      QRdata: BarCodeScannerResult,
    });
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <TabScreen extraStyles={{ paddingTop: insets.top, rowGap: 6 }}>
      <BarCodeScanner
        type={currentCamera}
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.barCodeScanner}
      >
        <TouchableOpacity
          style={styles.switchButton}
          onPress={() => switchCurrentCamera()}
        >
          <MaterialCommunityIcons
            name="camera-flip"
            size={40}
            color={GlobalStyles.color.primaryColor}
          />
          <Text style={{ fontSize: 20 }}>
            Switch to {currentCamera === "back" ? "front" : "back"} camera
          </Text>
        </TouchableOpacity>
        {scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
        )}
      </BarCodeScanner>
    </TabScreen>
  );
}

const styles = StyleSheet.create({
  barCodeScanner: {
    flex: 7,
  },
  switchButton: {
    flexDirection: "row",
    flex: 1,
    alignSelf: "center",
    marginVertical: 10,
    justifyContent: "center",
    columnGap: 4,
    alignItems: "center",
    backgroundColor: GlobalStyles.color.accentColor,
    width: "96%",
    borderRadius: 24,
  },
});
