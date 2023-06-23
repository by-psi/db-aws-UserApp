/**
* src/pages/Pedidos/OrderDetails.js
*/

import '@azure/core-asynciterator-polyfill';
import { useEffect, useState, useContext } from "react";
import { View, Text, Image, FlatList, ActivityIndicator, StyleSheet, Alert, SafeAreaView } from "react-native";
import { AuthContext } from '../../contexts/AuthContext';
import { OrderContext } from '../../contexts/OrderContext';
import { DataStore } from '@aws-amplify/datastore';
import { Delivery } from '../../models';

import Item from '../../components/Order/Item';

export default function OrderDetails({ id }) {
  const { dbUser } = useContext(AuthContext);
  const { getOrder } = useContext(OrderContext);
  const [ order, setOrder ] = useState();
  const [ delivery, setDelivery ] = useState({});

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, [id]);

  useEffect(() => {
    async function getDelivery() {
      try {
        await DataStore.query(Delivery, order?.deliveryID).then(setDelivery);
      } catch (error) {
        console.log('Erro ao carregar dados do Delivery ref. ao Pedido (delivery): ', error);
      }
    }
    getDelivery();
  }, [order]);

  function OrderDetailsHeader() {
    return (
      <View style={ styles.container }>
        <Image style={ styles.image } source={{uri: delivery?.UrlFoto}} />
        <Text style={ styles.title }>{delivery?.Nome}</Text>
        <View style={{ flex: 1 }}>
          <View style={ styles.description }>
            <Text>Usuário: {dbUser?.Nome} {dbUser?.Sobrenome} {dbUser?.Telefone}</Text>
            <Text style={styles.line}>Sub Total: R$ {parseFloat(order?.SubTotal).toFixed(2)}</Text>
            <Text style={styles.line}>Taxa de Entrega: R$ {parseFloat(order?.TaxaEntrega).toFixed(2)}</Text>
            <Text style={{fontWeight: 'bold'}}>Total: R$ {parseFloat(order?.Total).toFixed(2)}</Text>
          </View>
        </View>
        <Text style={styles.subtitle}>ITENS DESTE PEDIDO</Text>
      </View>
    );
  };

  if (!order) {
    return <ActivityIndicator size={"large"} color="gray" />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <FlatList
        data={ order.dishes }
        ListHeaderComponent={() => <OrderDetailsHeader />}
        renderItem={({ item }) => <Item dish={ item } />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    marginHorizontal: 10,
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  description: {
    color: "gray",
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
  },
  image: {
    width: "50%",
    aspectRatio: 5 / 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#000",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#5D5D5D",
  },
});

/*
  const diffInMs = new Date() - new Date(order?.createdAt);
  const qtdDias = diffInMs / (1000 * 60 * 60 * 24); //calcular nº de dias maior que 1 a partir do parâmetro date() - createdAt **
  <Text style={styles.line}>Status do Pedido: {order?.Status} &#8226; {qtdDias > 1 ? `${qtdDias} dias atrás` : "hoje"} </Text>

  <Text style={ styles.price }>
    R$ { (produto?.VrUnitario > 0) ? parseFloat( produto?.VrUnitario ).toFixed(2) : "0,00" }
  </Text>
*/
