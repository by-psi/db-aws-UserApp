/* 
* src/pages/Pedidos/OrderLiveUpdates.js
*/

import MapView, { Marker } from "react-native-maps";
import React, { useState, useEffect, useRef, useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { OrderContext } from '../../contexts/OrderContext';
import { DataStore } from "aws-amplify";
import { OrderStatus, Courier } from "../../models";

import * as Location from 'expo-location';

export default function OrderLiveUpdates({ id }) {
  const { getOrder } = useContext(OrderContext);
  const [ order, setOrder ] = useState(null);
  const [ courier, setCourier ] = useState(null);
  const [ latitude, setLatitude ] = useState(0);
  const [ longitude, setLongitude ] = useState(0);

  const mapRef = useRef(null);

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, [id]);

  useEffect(() => {
    if ( order?.courierID ) {
      DataStore.query(Courier, order?.courierID).then(setCourier);
    }
  }, [ order?.courierID ]);

  useEffect(() => {
    if (!courier) {
      return;
    }
    const subscription = DataStore.observe(Courier, courier?.id).subscribe((msg) => {
      if (msg.opType === "UPDATE") {
        setCourier(msg.element);
      }
    });
    return () => subscription.unsubscribe();
  }, [courier]);

  useEffect(() => {
    getPositionByGps();
    if (mapRef.current && courier?.Latitude && courier?.Longitude) {
        mapRef.current.animateToRegion({
        latitude: courier?.Latitude,
        longitude: courier?.Longitude,
        latitudeDelta: 0.003, 
        longitudeDelta: 0.003,
      });
    } else {
      mapRef.current.animateToRegion({
        latitude: latitude, // -19.82724237992428 { DeliveryBairro.com }
        longitude: longitude, // -43.98314774041266 { DeliveryBairro.com }
        latitudeDelta: 0.003, 
        longitudeDelta: 0.003,
      });
    }
  }, [courier]);

  function renderStatusMessage(status) {
    const statusStyle = {
      [OrderStatus.NOVO]: { backgroundColor: 'red' },
      [OrderStatus.AGUARDANDO]: { backgroundColor: 'orange' },
      [OrderStatus.PREPARANDO]: { backgroundColor: 'blue' },
      [OrderStatus.PRONTO_PARA_RETIRADA]: { backgroundColor: 'green' },
      [OrderStatus.SAIU_PARA_ENTREGA]: { backgroundColor: 'grey' },
      [OrderStatus.RECEBIDO]: { backgroundColor: 'black' },
      [OrderStatus.FINALIZADO]: { backgroundColor: 'pink' },
      [OrderStatus.CANCELADO]: { backgroundColor: 'purple' },
    };
    // const formattedStatus = order?.Status.replace(/_/g, ' ');

    if (status in statusStyle) {
      return <Text style={[styles.status, statusStyle[status]]}>{order?.Status.replace(/_/g, ' ')}</Text>;
    } else {
      return <Text> loading... </Text>;
    }
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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderStatusMessage(order?.Status)}
      <MapView style={styles.map} ref={mapRef} showsUserLocation={true}>
        {courier?.Latitude && courier?.Longitude && (
          <Marker coordinate={{ latitude: courier?.Latitude, longitude: courier?.Longitude }}>
            <View style={{ padding: 5, backgroundColor: "red", borderRadius: 5 }}>
              <Fontisto name="motorcycle" size={25} color="white" />
            </View>
          </Marker>
        )}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  status: {
    color: '#FFF',
    textAlign: "center",
    borderRadius: 5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    padding: 15
  },
});
