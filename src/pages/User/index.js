/* 
* src/pages/User/index.js
* tabela de cores: #FFB901 #55A9D6 #7F7B7B #5D5D5D #FF0000 #0033CC #FFF000 #131313 #4DCE4D
*/

import '@azure/core-asynciterator-polyfill';
import { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { AuthContext } from '../../contexts/AuthContext';
import { DataStore } from '@aws-amplify/datastore';
import { User } from '../../models';

import PageHeader from '../../components/PageHeader';

export default function Perfil() {
  const navigation = useNavigation();
  const { signOut } = useAuthenticator();
  const { sub, dbUser, setDbUser } = useContext(AuthContext);

  const [ nome, setNome ] = useState(dbUser?.Nome || '');
  const [ sobrenome, setSobrenome ] = useState(dbUser?.Sobrenome || '');
  const [ urlfoto, setUrlFoto ] = useState(dbUser?.UrlFoto || '');
  const [ telefone, setTelefone ] = useState(dbUser?.Telefone || '');

  async function onSave() {
    if (!!dbUser) {
      await updateUser();
    } else {
      await createUser();
    }
    navigation.goBack();
  };

  async function updateUser() {
    const user = await DataStore.save(
      User.copyOf(dbUser, (updated) => {
        updated.Nome = nome;
        updated.Sobrenome = sobrenome;
        updated.UrlFoto = urlfoto;
        updated.Token = sub;
        updated.Telefone = telefone;
      })
    );
    setDbUser(user);
    Alert.alert('Dados atualizados com sucesso!');
  };

  async function createUser() {
    try {
      const user = await DataStore.save(
        new User({
          Nome: nome,
          Sobrenome: sobrenome,
          UrlFoto: null,
          Token: sub,
          Telefone: telefone
        })
      );
      setDbUser(user);
      Alert.alert('Dados cadastrados com sucesso!');
    } catch (e) {
      Alert.alert("Error", e.message);
    }
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <PageHeader/>
      <Text style={styles.subtitle}>PERFIL DO USUÁRIO</Text>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Nome:</Text>
          <TextInput 
            value={ nome }
            placeholder="Nome"
            autoCorrect={false}
            onChangeText={ (input) => setNome(input) }
            autoCapitalize="words"
            style={styles.input}
          />
        </View>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Sobrenome:</Text>
          <TextInput
            value={ sobrenome }
            placeholder="Sobrenome"
            onChangeText={ (input) => setSobrenome(input) }
            autoCapitalize="words"
            style={styles.input}
          />
        </View>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>FOTO (LINK/URL):</Text>
          <TextInput
            value={ urlfoto }
            placeholder="URL da foto"
            onChangeText={ (input) => setUrlFoto(input) }
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
          />
        </View>
        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Telefone:</Text>
          <TextInputMask
            type={'custom'}
            options={{
              mask: "(99) 99999-9999",
            }}
            value={telefone}
            placeholder="(31) 99999-9999"
            onChangeText={ (input) => setTelefone(input) }
            keyboardType="numeric"
            style={styles.input}
          />
        </View>
      </ScrollView>
      <TouchableOpacity style={styles.btnSubmit} onPress={ onSave }>
        <Text style={styles.btnTxt}>{ (!!dbUser) ? "ATUALIZAR" : "SALVAR" } DADOS</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btnLogout} onPress={ signOut }>
        <Text style={styles.btnTxt}>FECHAR (LOGOUT)</Text>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  content: {
    width: '98%',
    paddingHorizontal: 10,
  },
  title:{ 
    color: '#000',
    textAlign: "center",
    fontWeight: 'bold',
    fontSize: 21,
  },
  subtitle:{
    color: '#000',
    textAlign: "center",
    fontSize: 15,
  },
  areaInput:{
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 5,
  },
  input:{
    flex: 1, 
    width: "98%",
    height: 45,
    padding: 10,
    backgroundColor: "#FFF",
    borderColor: "#8CB8D2",
    borderWidth: 1,
    borderRadius: 7,
    fontSize: 17,
    color: "#000",
  },
  btnSubmit:{
    width: "95%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    borderRadius: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5
  },
  btnLogout: {
    width: '95%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF0000',
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5
  },
  btnTxt:{
    color: "#FFF", 
    fontSize: 20,
    textAlign: "center", 
  },
})
