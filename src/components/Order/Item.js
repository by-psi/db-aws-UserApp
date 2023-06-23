/**
 * src/components/Order/Item.js
 */

import '@azure/core-asynciterator-polyfill';
import { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { DataStore } from '@aws-amplify/datastore';
import { Produto } from '../../models'; 

export default function Item({ dish }) {
  const [ produto, setProduto ] = useState(null);

  useEffect(() => {
    DataStore.query(Produto, dish?.produtoID).then(setProduto);
  }, [dish]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.nome}>{ produto?.Nome }</Text>
        <Text style={styles.qtd}>{dish?.Qtd} x R$ { parseFloat(produto?.VrUnitario).toFixed(2) }</Text>
        <Text style={styles.total}>TOTAL R$ { parseFloat(dish?.Qtd * produto?.VrUnitario).toFixed(2) }</Text>
      </View>
      <Image style={styles.imagem} source={{uri: produto?.UrlFoto }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#DFDFDF',
    borderRadius: 2,
    marginBottom: 10,
    padding: 5,
  },
  nome:{
    fontWeight: 'bold',
    fontSize: 14,
  },
  qtd:{
    fontSize: 15,
    fontWeight: 'bold',
  },
  total:{
    color: "#D65656",
    fontSize: 15,
  },
  imagem:{
    width: 75, 
    height: 75,
  },

});
