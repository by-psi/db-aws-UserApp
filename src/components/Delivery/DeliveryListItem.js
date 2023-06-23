/**
 * src/components/Delivery/DeliveryListItem.js
 */

import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

export default function DeliveryListItem({ item, selectItem }) {
  const produto = item;
  return (
    <TouchableOpacity onPress={ selectItem } style={ styles.container }>
      <View style={{ flex: 1 }}>
        <Text style={ styles.name }>{ produto?.Nome }</Text>
        <Text style={ styles.description } numberOfLines={ 2 }>
          { produto?.Descricao }
        </Text>
        <Text style={ styles.price }>R$ { (produto?.VrUnitario > 0) ? parseFloat( produto?.VrUnitario ).toFixed(2) : "0,00" }</Text>
      </View>
      <Image style={ styles.image } source={{ uri: produto?.UrlFoto }} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
    flexDirection: "row",
  },
  name: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
  description: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    height: 75,
    aspectRatio: 1,
  }
});
