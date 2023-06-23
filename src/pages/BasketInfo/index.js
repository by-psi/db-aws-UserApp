/**
* src/pages/BasketInfo/index.js
*/

import '@azure/core-asynciterator-polyfill';
import { useState, useEffect, useContext } from 'react';
import { View, Text, TouchableOpacity, FlatList, Alert, StyleSheet } from 'react-native';
import { Fontisto } from "@expo/vector-icons";
import { CartContext } from '../../contexts/CartContext';
import { OrderContext } from '../../contexts/OrderContext';
import { useNavigation } from '@react-navigation/native';

import * as Location from 'expo-location';

import BasketItem from '../../components/Basket';

export default function BasketInfo() {
  const navigation = useNavigation();
  const { delivery, basket, subtotal, AddToBasket, RemoveFromBasket, CleanBasket } = useContext(CartContext);
  const { createOrder } = useContext(OrderContext);
  const [ latitude, setLatitude ] = useState(0);
  const [ longitude, setLongitude ] = useState(0);
  const [ total, setTotal ] = useState(0);

  useEffect(() => {
    function atualizaTotal() {
      const soma = parseFloat(subtotal) + parseFloat(delivery?.TaxaEntrega);
      setTotal(soma);
    }
    atualizaTotal();
  }, [subtotal]);

  function CancelarPedido() {
    CleanBasket();
    navigation.goBack();
  }

  async function getPositionByGps() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão para acessar a localização foi negada');
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setLatitude(coords.latitude);
      setLongitude(coords.longitude);
    } catch (error) {
      console.log("Não foi possível obter a localização atual do Usuário.");
    }
    return { latitude, longitude };
  }

  async function EnviarPedidoELimparCestaDeCompras() {
    getPositionByGps();
    console.log('Coordernadas atuais do Usuário: ', latitude, longitude);
    const novoPedido = await createOrder(latitude, longitude);
    Alert.alert('Pedido adicionado com sucesso!'),
    await CleanBasket();
    navigation.navigate("Pedidos", {
      screen: "Pedidos",
      params: { id: novoPedido.id },
    });
  }

  return (
    <View style={styles.container}>

      <View style={{flexDirection: 'row'}}>
        <View style={{flexDirection: 'column', width: '100%'}}>
          <Text style={{ fontSize: 21, fontWeight: 'bold' }}>{ delivery?.Nome }</Text>
          <Text style={{ fontSize: 13}}>{ delivery?.Horario }</Text>
          <Text style={{ fontSize: 13}}><Fontisto color="#FF0000" name='map-marker-alt' size={18}/> { parseFloat(delivery?.Latitude).toFixed(6) }, { parseFloat(delivery?.Longitude).toFixed(6) }</Text>
          <Text style={{ fontSize: 13, marginBottom: 10}}>Valor da Taxa de Entrega: R$ { parseFloat( delivery?.TaxaEntrega ).toFixed(2) }</Text>
          <Text style={{ fontWeight: "bold", marginTop: 20, fontSize: 19 }}>Seus Pedidos</Text>
        </View>
      </View>

      <FlatList
        data={ basket }
        showsVerticalScrollIndicator={ false }
        keyExtractor={ (item) => item.id }
        renderItem={ ({item}) => (
          <BasketItem
            data={ item }
            AddQtd={ ()=>AddToBasket(item, 1, item.VrUnitario) }
            RemoveQtd={ ()=>RemoveFromBasket(item) }
          />
        )}
        ListEmptyComponent={ () => <Text style={styles.empty}>Cesta de Compras vazia!</Text> }
        ListFooterComponent={ () => (
          <View>
            <Text style={styles.subtotal}>Sub-Total: R$ { parseFloat(subtotal).toFixed(2) }</Text>
            <Text style={styles.taxa}>Taxa de Entrega: R$ { parseFloat(delivery?.TaxaEntrega ).toFixed(2)}</Text>
            <Text style={styles.total}>Total: R$ { parseFloat(total).toFixed(2) }</Text>
          </View>
        )}
      />

      {
        (basket?.length > 0) &&
        <TouchableOpacity style={styles.btnAdd} onPress={ EnviarPedidoELimparCestaDeCompras }>
          <Text style={{color: '#FFF', fontSize: 18}}>CONFIRMAR PEDIDO</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity style={styles.btnCancel} onPress={ CancelarPedido }>
        <Text style={{color: '#FFF', fontSize: 18}}>CANCELAR</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14,
  },
  empty:{
    fontSize: 18,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 10
  },
  subtotal:{
    fontSize: 18,
    marginTop: 20
  }, 
  taxa:{
    fontSize: 18,
  },
  total:{
    fontSize: 18,
    fontWeight: 'bold',
  },
  btnAdd: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#145E7D',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  btnCancel: {
    width: '100%',
    height: 45,
    borderRadius: 7,
    backgroundColor: '#FF0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  imagem:{
    width: 75, 
    height: 75,
  },
})

/**
  import { FontAwesome5 } from '@expo/vector-icons';

  const [ info, setInfo ] = useState("");

  { info &&
    <Text style={{textAlign: "center"}}>{info}</Text>
  }

  <TouchableOpacity style={styles.btnSubmit} onPress={ getPositionByGps }>
    <Text style={styles.btnTxt}><FontAwesome5 name="map-marker-alt" size={18} color="white"/> OBTER COORDENADAS</Text>
  </TouchableOpacity>
 */