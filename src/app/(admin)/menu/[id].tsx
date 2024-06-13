import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import products from "@/assets/data/products";
import { defaultPizzaImage } from "@/src/components/ProductListItem";
import { PizzaSize } from "@/src/types";
import Button from "@/src/components/Button";
import { useCart } from "@/src/providers/CartProvider";

const sizes: PizzaSize[] = ["S", "M", "L", "XL"];

const ProductDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const { addItem } = useCart();

  const router = useRouter();

  const [selectedSize, setSelectedSize] = useState<PizzaSize>("M");

  const product = products.find((p) => p.id.toString() === id);

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
      {/* custom screen tittle */}
      <Stack.Screen options={{ title: `${product.name}` }} />

      <Image
        style={styles.image}
        source={{ uri: product.image || defaultPizzaImage }}
        resizeMode="contain"
      />

      <Text style={styles.title}>${product.name}</Text>
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
