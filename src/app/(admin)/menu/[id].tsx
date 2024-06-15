import {
  View,
  Text,
  StyleSheet,
  Image,
  Pressable,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { PizzaSize } from "@/src/types";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "@/src/constants/Colors";
import { useProduct } from "@/src/api/products";
import RemoteImage from "@/src/components/RemoteImage";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { id: idString } = useLocalSearchParams();
  const id = parseFloat(typeof idString === "string" ? idString : idString[0]);
  const { data: product, error, isLoading } = useProduct(id);

  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  // const product = products.find((p) => p.id.toString() === id);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Failed to fetch products</Text>;
  }

  if (!product) {
    return <Text>Product not found</Text>;
  }
  const addToCart = () => {
    // console.warn("Adding to Cart", selectedSize);
    if (!product) {
      return;
    }
    addItem(product, selectedSize);
    router.push("/cart");
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        // name="[id]"
        options={{
          title: "Product",
          headerTitleAlign: "center",

          headerRight: () => (
            <Link href={`/(admin)/menu/create?id=${id}`} asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="pencil"
                    size={20}
                    color={Colors.light.tint}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />

      {/* custom screen tittle */}
      <Stack.Screen options={{ title: `${product.name}` }} />

      <RemoteImage
        path={product.image}
        fallback={defaultPizzaImage}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Button text="Add To Cart" onPress={addToCart} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 10,
    flex: 1,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    alignSelf: "center",
  },
  title: {
    marginVertical: 20,
    fontWeight: "600",
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    // marginTop: "auto",
  },
});

export default ProductDetailScreen;
