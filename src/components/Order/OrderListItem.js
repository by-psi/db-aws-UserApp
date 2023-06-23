/**
 * src/components/Order/OrderListItem.js
 */

import '@azure/core-asynciterator-polyfill';
import { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { OrderStatus } from "../../models";

export default function OrderListItem({ order }) {
  const { user } = useAuthenticator();
  const { sub, dbUser} = useContext(AuthContext);
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("Pedido", { id: order.id });
  };

  function formatDate(dt) {
    let dthr = new Date(dt); 
    return dthr.toLocaleString('pt-BR').split('-').reverse().join('/'); //.tz('America/Sao_Paulo');
  }

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={ onPress }>
        <View style={{flexDirection: 'row', padding: 5}}>
          { order.Status === OrderStatus.NOVO ? <Text style={[styles.status, {backgroundColor: 'red'}]}>NOVO</Text> : null }
          { order.Status === OrderStatus.AGUARDANDO ? <Text style={[styles.status, {backgroundColor: 'orange'}]}>AGUARDANDO</Text> : null }
          { order.Status === OrderStatus.PREPARANDO ? <Text style={[styles.status, {backgroundColor: 'blue'}]}>PREPARANDO</Text> : null }
          { order.Status === OrderStatus.PRONTO_PARA_RETIRADA ? <Text style={[styles.status, {backgroundColor: 'green'}]}>PRONTO PARA RETIRDADA</Text> : null }
          { order.Status === OrderStatus.SAIU_PARA_ENTREGA ? <Text style={[styles.status, {backgroundColor: 'grey'}]}>SAIU PARA ENTREGA</Text> : null }
          { order.Status === OrderStatus.RECEBIDO ? <Text style={[styles.status, {backgroundColor: 'black'}]}>RECEBIDO</Text> : null }
          { order.Status === OrderStatus.FINALIZADO ? <Text style={[styles.status, {backgroundColor: 'pink'}]}>FINALIZADO</Text> : null }
          { order.Status === OrderStatus.CANCELADO ? <Text style={[styles.status, {backgroundColor: 'purple'}]}>CANCELADO</Text> : null }
        </View>
        <Text>Usuário: {dbUser?.Nome} {dbUser?.Sobrenome}</Text>
        <Text style={{fontWeight: 'bold'}}>Data/Hora do Pedido: { formatDate(order.createdAt) }</Text>
        <Text style={{fontWeight: 'bold'}}>Total: R$ { parseFloat( order.Total ).toFixed(2) }</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: "#FFF",
    padding: 10,
  },
  card:{
    borderBottomWidth: 0.5,
    borderColor: "#9C9C9C",
    padding: 5,
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
  status:{
    color: '#FFF',
    borderRadius: 5,
    marginLeft: 5,
    marginTop: 5,
    padding: 3
  },
  line18:{ 
    color: '#000', 
    fontSize: 18 
  },
  line13:{
    color: '#000',
    fontSize: 13,
    marginBottom: 10
  },
})
