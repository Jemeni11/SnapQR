import {
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { GlobalStyles } from "../styles";
import TabScreen from "../components/TabScreen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import historyMMKVStorage from "../storage/history";
import generateUUID from "../utils/uuidGenerator";

export default function QRCodeDetails({ route }) {
  const { height } = useWindowDimensions();
  const three_fourth_height = (height * 3) / 4;
  console.log(three_fourth_height);
  const insets = useSafeAreaInsets();
  const { QRdata } = route.params;
  console.log("QRdata: ", QRdata);

  const bounds = QRdata.bounds;
  let aspect_ratio;
  if (bounds) {
    aspect_ratio = bounds.size.width / bounds.size.height;
  }
  const cornerPoints = QRdata.cornerPoints;
  let point_x = cornerPoints[0].x;

  function addToHistory() {
    const newHistoryAdditionName = `${new Date().toISOString()}___${generateUUID()}`;
    const newHistoryAdditionObject = {
      dateCreated: new Date(),
      type: QRdata.type,
      data: QRdata.data,
      bounds,
      aspect_ratio,
    };

    // Serialize the object into a JSON string
    historyMMKVStorage.set(
      newHistoryAdditionName,
      JSON.stringify(newHistoryAdditionObject)
    );
  }

  return (
    <TabScreen
      extraStyles={{ paddingTop: insets.top, height: three_fourth_height }}
    >
      <Text>Barcode Details</Text>
      <View>
        <Text>Barcode Type: {QRdata.type}</Text>
        <Text>Barcode Data: {QRdata.data}</Text>
        {QRdata.cornerPoints?.map((point) => (
          <Text key={point.x * 4}>
            x: {point.x} & y: {point.y}
          </Text>
        ))}
      </View>
      <TouchableOpacity onPress={() => addToHistory()}>
        <Text>Add to History</Text>
      </TouchableOpacity>
    </TabScreen>
  );
}
