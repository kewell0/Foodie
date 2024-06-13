import Colors from "@/src/constants/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { Link, Stack } from "expo-router";
import { Pressable } from "react-native";

export default function MenuLayout() {
  return (
    <Stack>
      {/* <Stack.Screen
        name="index"
        options={{
          title: "Orders",
          headerTitleAlign: "center",
        }}
      /> */}
      <Stack.Screen
        name="list"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
