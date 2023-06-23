/**
 * src/pages/Delivery/DeliveryInfo.js
 */

import '@azure/core-asynciterator-polyfill';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, FlatList, Modal, SafeAreaView, ActivityIndicator } from "react-native";
import { CartContext } from '../../contexts/CartContext';
import { DataStore } from "@aws-amplify/datastore";
import { Delivery, Produto } from "../../models";

import PageHeader from '../../components/PageHeader';

import DeliveryHeader from '../../components/Delivery/DeliveryHeader';
import DeliveryItemToSelect from '../../components/Delivery/DeliveryItemToSelect';
import DeliveryListItem from '../../components/Delivery/DeliveryListItem';

export default function DeliveryInfo({ route }) {
  const { delivery, setDelivery } = useContext(CartContext);
  const [ show, showModal ] = useState(false);
  const [ produto, setProduto ] = useState({});
  const [ listadeprodutos, setListaDeProdutos ] = useState([]);
  const [ isAscending, setIsAscending ] = useState(true);

  const id = route.params?.id; 

  const { setDelivery: setBasketDelivery } = useContext(CartContext);

  useEffect(() => {
    if (!id) {
      return;
    }

    (async function () {
      try {
        setBasketDelivery(null);
        await DataStore.query(Delivery, id).then(setDelivery);
        await DataStore.query(Produto, (produto) => produto.ProdutoDeliveries.deliveryId.eq(id)).then(setListaDeProdutos)
      } catch (error) {
        console.error("Error (DeliveryInfo): ", error);
      }
    })();

  }, [id]);

  useEffect(() => {
    setBasketDelivery(delivery);
  }, [delivery]);

  function listByAZ() {
    const listaordenada = [...listadeprodutos].sort((a, b) => (
      isAscending ? a.Nome.localeCompare(b.Nome) : b.Nome.localeCompare(a.Nome)
    ));
    setListaDeProdutos(listaordenada);
    setIsAscending(!isAscending);
  }

  async function handleSelectItem(item) {
    setProduto(item);
    showModal(true);
  }

  async function handleCloseModal() {
    showModal(false);
  }

  if (!delivery) {
    return <ActivityIndicator size={"large"} color="#145E7D" />
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Modal animationType="slide" transparent={ true } visible={show} >
          <DeliveryItemToSelect produto={produto} close={ ()=>handleCloseModal() } />
        </Modal>
        <PageHeader />
        <FlatList
          data={listadeprodutos}
          ListHeaderComponent={ ()=><DeliveryHeader delivery={ delivery } listbyaz={ () => listByAZ() } /> }
          ListEmptyComponent={ ()=><Text style={styles.empty}>Ainda não há produtos deste Delivery.</Text> }
          keyExtractor={ (item)=>item.id }
          renderItem={ ({ item }) => <DeliveryListItem item={item} selectItem={ ()=>handleSelectItem(item) } /> }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  empty: {
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  },
  flatlist: {
    flex: 1,
  },
  button: {
    backgroundColor: "black",
    margin: 10,
    padding: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
  }
});
