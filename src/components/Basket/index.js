/**
 * src/components/Basket/index.js
 */

import '@azure/core-asynciterator-polyfill';
import { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DataStore } from "@aws-amplify/datastore";
import { Produto } from "../../models";

export default function BasketItem({ data, AddQtd, RemoveQtd }) {
  const [ qtd, setQtd ] = useState(data?.Qtd);
  const [ produto, setProduto ] = useState([]);
  const [ total, setTotal ] = useState(qtd * data.VrUnitario);

  const id = data.id; 

  useEffect(() => {
    if (id) {
      DataStore.query(Produto, id).then(setProduto);
    }
  }, [id]);

  function add() {
    setQtd(qtd +1)
    setTotal((qtd +1) * produto.VrUnitario);
    AddQtd();
  }

  function remove() {
    if (qtd>1) {
      setQtd(qtd -1);
      setTotal((qtd -1) * produto.VrUnitario);
      RemoveQtd();
    }
  }

  return (
    <View style={styles.container}>
      <View>
        <View>
          <Text style={styles.nome}>{ data?.Nome } &#8226; R$ { parseFloat( data?.VrUnitario ).toFixed(2) }</Text>
          <Text style={styles.preco}>R$ { parseFloat( total ).toFixed(2) }</Text>
        </View>
        <View style={styles.qtd}>
          <TouchableOpacity onPress={remove}>
            <Ionicons name="md-remove-circle-outline" size={30} color="red"/>
          </TouchableOpacity>
          <Text style={styles.qtdText}>{qtd}</Text>
          <TouchableOpacity onPress={add}>
            <Ionicons name="ios-add-circle-outline" size={30} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      <Image style={styles.imagem} source={{uri: data?.UrlFoto }} />
    </View>
  );
}

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
    fontSize: 18,
  },
  preco:{
    fontSize: 16,
  },
  qtd:{
    width: 100, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 5
  },
  qtdText:{
    color: '#000', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  imagem:{
    width: 75, 
    height: 75,
  },
})
