import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function TabLayout() {
  return (
    <NativeTabs labelVisibilityMode="labeled" rippleColor="transparent">
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Scan</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="qr_code_scanner" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="generator">
        <NativeTabs.Trigger.Label>Generate</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="create" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="history">
        <NativeTabs.Trigger.Label>History</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="history" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="saved">
        <NativeTabs.Trigger.Label>Saved</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon md="bookmark" />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
