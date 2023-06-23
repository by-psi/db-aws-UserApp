/**
 * src/pages/Home/index.js
 */

import '@azure/core-asynciterator-polyfill';
import { useState, useEffect } from "react";
import { View, Text, Image, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { DataStore } from "@aws-amplify/datastore";
import { Categoria } from "../../models";

import PageHeader from '../../components/PageHeader'; 

export default function Home() {
  const navigation = useNavigation();
  const [ categorias, setCategorias ] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const result = await DataStore.query(Categoria);
        const listaordenada = [...result].sort((a, b) => a.Ordem.localeCompare(b.Ordem));
        setCategorias(listaordenada);
      } catch (error) {
        console.warn("lista está vazia...");
        console.error("Error (query: Categoria): ", error);
      }
    })();
  }, []);

  function LinkTo(page, p) {
    navigation.navigate(page, p);
  }

  if (!categorias) {
    return <ActivityIndicator size={"large"} color="#145E7D" />
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <PageHeader />
      <View style={styles.container}>
        <Text style={styles.title}>CATEGORIAS</Text>
        <FlatList
          data={categorias}
          showsVerticalScrollIndicator={true}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View>
              <TouchableOpacity onPress={ ()=>LinkTo('Deliveries', { id: item.id, Descricao: item.Descricao }) }>
                <View style={styles.card}>
                  <Image source={{ uri: item.UrlFoto }} style={styles.imagem} />
                  <Text style={styles.label}>{ item.Descricao }</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
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
  title:{
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    borderBottomColor: '#E2E2E2',
    borderBottomWidth: 1,
    paddingBottom: 10
  },
  label:{
    fontSize: 18,
    fontWeight: 'bold',
    width: "70%"
  },
  card:{
    flex: 1,
    height: 115,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  imagem:{
    width: 100,
    height: 100,
    margin: 5
  },
});
