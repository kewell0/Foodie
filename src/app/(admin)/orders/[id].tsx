import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import orders from "../../../../assets/data/orders";
import OrderItemListItem from "@/src/components/OrderItemListItem";
import OrderListItem from "@/src/components/OrderListItem";
import { OrderStatusList } from "@/src/types";
import Colors from "@/src/constants/Colors";
import { useOrderDetails, useUpdateOrder } from "@/src/api/orders";

const OrderDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);

  const { data: order, isLoading, error } = useOrderDetails(id);
  const { mutate: updateOrder, isPending } = useUpdateOrder();

  const updateStatus = async (status: string) => {
    await updateOrder({
      id: id,
      updatedFields: { status },
    });
    // if (order) {
    //   await notifyUserAboutOrderUpdate({ ...order, status });
    // }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  if (error || !order) {
    return <Text>Failed to fetch</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Order #${order.id}` }} />

      <OrderListItem order={order} isPending={isPending} />

      <FlatList
        data={order.order_items}
        renderItem={({ item }) => <OrderItemListItem item={item} />}
        contentContainerStyle={{ gap: 10 }}
        ListFooterComponent={() => (
          <>
            <Text style={{ fontWeight: "bold" }}>Status</Text>
            <View style={{ flexDirection: "row", gap: 5 }}>
              {OrderStatusList.map((status) => (
                <TouchableOpacity
                  key={status}
                  onPress={() => updateStatus(status)}
                  style={{
                    borderColor: Colors.light.tint,
                    borderWidth: 1,
                    padding: 10,
                    borderRadius: 5,
                    marginVertical: 10,
                    backgroundColor:
                      order.status === status
                        ? Colors.light.tint
                        : "transparent",
                  }}
                >
                  <Text
                    style={{
                      color:
                        order.status === status ? "white" : Colors.light.tint,
                    }}
                  >
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    gap: 10,
  },
});

export default OrderDetailScreen;
