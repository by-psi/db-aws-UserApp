/* 
* src/pages/Pedidos/OrderPayment.js
*/

import { useState, useEffect, useContext } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { OrderContext } from '../../contexts/OrderContext';
import { useAuthenticator } from '@aws-amplify/ui-react-native';

export default function OrderPayment({ id }) {
  const { user } = useAuthenticator();
  const { getOrder } = useContext(OrderContext);
  const [ order, setOrder ] = useState({});

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, [id]);

  function formatDate(dt) {
    let dthr = new Date(dt); 
    return dthr.toLocaleString('pt-BR').split('-').reverse().join('/'); //.tz('America/Sao_Paulo');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <Text style={styles.subtitle}>FORMAS DE PAGAMENTO</Text>
        <Text>{" "}</Text>
        <Text>{user?.attributes?.email}</Text>
        <Text style={{fontSize: 13}}>Pedido nº {id}</Text>
        <Text style={{fontWeight: 'bold'}}>Data/Hora do Pedido: { formatDate(order?.createdAt) }</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  subtitle:{
    color: '#000',
    textAlign: "center",
    fontSize: 15,
  },
})
