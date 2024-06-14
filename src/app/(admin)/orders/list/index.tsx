// import { FlatList } from 'react-native-gesture-handler';
import { FlatList, Text } from "react-native";
// import orders from "../../../../../assets/data/orders";
import OrderListItem from "../../../../components/OrderListItem";
import { Stack } from "expo-router";
import { useAdminOrderList } from "@/src/api/orders";
import { ActivityIndicator } from "react-native";
import { useInsertOrderSubscription } from "@/src/api/orders/subscriptions";

export default function OrdersScreen() {
  const {
    data: orders,
    isLoading,
    error,
  } = useAdminOrderList({ archived: false });

  useInsertOrderSubscription();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <>
      {/* <Stack.Screen options={{ title: "Orders" }} /> */}
      <FlatList
        data={orders}
        contentContainerStyle={{ gap: 10, padding: 10 }}
        renderItem={({ item }) => <OrderListItem order={item} />}
      />
    </>
  );
}
