import {
  Text,
  View,
  Image,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";

import products from "@assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import { useProductList } from "@/src/api/products";

export default function MenuScreen() {
  const { data: product, isLoading, error } = useProductList();

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  return (
    <FlatList
      data={product}
      renderItem={({ item }) => <ProductListItem product={item} />}
      numColumns={2}
      contentContainerStyle={{ gap: 10, padding: 10 }}
      columnWrapperStyle={{ gap: 10 }}
    />
  );
}
