/**
 * src/pages/Delivery/index.js
 */

import '@azure/core-asynciterator-polyfill';
import { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { Delivery } from "../../models";

import PageHeader from '../../components/PageHeader';

export default function Deliveries({ route }) {
  const navigation = useNavigation();
  const [ deliveries, setDeliveries ] = useState([]);

  const id = route.params?.id;

  useEffect(() => {
    (async function() {
      try {
        await DataStore.query(Delivery, (delivery) => delivery.Categorias?.categoriaId.eq(id)).then(setDeliveries)
      } catch(error) {
        console.error("Error (Deliveries): ", error);
      }
    })();
  }, [ route.params?.id ]);

  function LinkTo(page, p) {
    navigation.navigate(page, p);
  }

  if (!deliveries) {
    return(
      <View style={styles.indicator}>
        <ActivityIndicator size={"large"} color="#FFB901" />
      </View>
    )
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <PageHeader />
      <View style={styles.container}>
        <Text style={styles.categoria_title}>{ route.params.Descricao }</Text>
        <FlatList
          data={deliveries}
          keyExtractor={ (item) => item.id }
          renderItem={({ item }) => (
            <TouchableOpacity onPress={ ()=>LinkTo("DeliveryInfo", { id: item?.id }) }>
              <Text style={styles.delivery_title}>{ item?.Nome }</Text>
              <Image style={styles.imagem} source={{ uri: item?.UrlFoto }} />
              <View style={styles.row}>
                <Text style={styles.subtitle}>
                  Taxa de Entrega R$ { parseFloat(item?.TaxaEntrega).toFixed(2) } &#8226;{" "}
                  { item?.MinDeliveryTime }-{ item?.MaxDeliveryTime } minutos
                </Text>
                <View style={styles.rating}>
                  <Text style={{color: "#FFF"}}>{ parseFloat(item?.Rating).toFixed(1) }</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          ListEmptyComponent={ () => <Text style={styles.empty}>Não há Deliveries disponíveis nesta categoria.</Text> }
          showsVerticalScrollIndicator={ true }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  label:{
    fontSize: 21,
    fontWeight: 'bold'
  },
  imagem: {
    width: "100%",
    aspectRatio: 5 / 3,
    marginBottom: 5,
  },
  categoria_title:{
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    borderBottomColor: "#E2E2E2",
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  delivery_title: {
    fontSize: 17,
    fontWeight: "bold",
    color: "black",
  },
  subtitle: {
    color: "grey",
    marginBottom: 10
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  rating: {
    marginLeft: "auto",
    backgroundColor: "black",
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
  },
  empty:{
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10
  }
})
