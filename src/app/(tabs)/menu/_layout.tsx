import { Stack } from "expo-router";

export default function MenuLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{ title: "Menu", headerTitleAlign: "center" }}
      />
      <Stack.Screen
        name="[id]"
        options={{ title: "Product", headerTitleAlign: "center" }}
      />
    </Stack>
  );
}
