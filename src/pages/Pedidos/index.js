/**
* src/pages/Pedidos/index.js
*/

import '@azure/core-asynciterator-polyfill';
import { useContext } from 'react';
import { View, Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import { OrderContext } from '../../contexts/OrderContext';

import PageHeader from '../../components/PageHeader';
import OrderListItem from '../../components/Order/OrderListItem';

export default function Pedidos() {
  const { orders } = useContext(OrderContext);

  return (
    <SafeAreaView style={{flex: 1}}>
      <PageHeader />
      <View style={styles.container}>
        <Text style={styles.title}>MEUS PEDIDOS</Text>
        <FlatList
          data={ orders }
          showsVerticalScrollIndicator={ true }
          ListEmptyComponent={() => <Text>Não há pedidos.</Text>}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderListItem order={ item } />}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  title:{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  subtitle:{
    color: '#000',
    fontSize: 15,
    fontWeight: 'bold'
  },
})
