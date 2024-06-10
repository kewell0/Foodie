import { Text, View, Image, StyleSheet } from "react-native";

// import { Text, View } from "../../components/Themed";
import Colors from "@/src/constants/Colors";
import { Product } from "../types";

export const defaultPizzaImage =
  "'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/food/default.png'";

interface ProductListItemProps {
  product: Product;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={{ uri: product.image || defaultPizzaImage }}
        style={styles.image}
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

export default ProductListItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: 10,
  },
  price: {
    color: Colors.light.tint,
    // fontWeight: "bold",
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
