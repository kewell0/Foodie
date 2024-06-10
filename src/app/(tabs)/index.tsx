import { ScrollView } from "react-native";

// import { Text, View } from "../../components/Themed";

import products from "@assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";

export default function MenuScreen() {
  return (
    <ScrollView>
      <ProductListItem product={products[1]} />
      <ProductListItem product={products[5]} />
      <ProductListItem product={products[5]} />
    </ScrollView>
  );
}
