/**
 * src/pages/User/SignUpCode.js
 */

import React, { useState } from 'react';
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, Alert, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Auth } from 'aws-amplify';

import logo from '../../../assets/logo.png';
import marca from '../../../assets/marca.png';

export default function SignUpCode({ route }) {
  
  const [email, setEmail] = useState(route?.params?.email);
  const [authCode, setAuthCode] = useState("");
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function confirmSignUp() {
    const username = email;
    setLoading(true);
    try {
      await Auth.confirmSignUp(username, authCode);
      setLoading(false);
      Alert.alert("Info",`Código enviado com sucesso! Confira o email enviado para: ${username}`);
      navigation.navigate('CustomSignIn');
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "O código de verificação não corresponde. Insira um código de verificação válido.");
    }
  }

  async function ResendConfirmationCode(email) {
    const username = email;
    setLoading(true);
    try {
      const { user } =  await Auth.resendSignUp(username);
      setLoading(false);
      Alert.alert("Info",`Código reenviado com sucesso! Confira novamente o email enviado para: ${user.email}`);
    } catch (error) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possivel reenviar o código de verificação. Tente novamente.");
    }
  }

  if (loading) {
    return(
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} color="#0033CC" />
      </View>
    )
  }

  return (
    <View style={styles.background}>
      <View style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : ''} enabled>

        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Image source={marca} style={styles.marca} resizeMode="contain" />

        <View style={styles.areaInput}>
          <Text style={{marginBottom: 5}}>Usuário:</Text>
          <TextInput
            value={email}
            onChangeText={(input)=>setEmail(input)}
            placeholder='username@email.com'
            autoCapitalize='none'
            keyboardType='email-address'
            textContentType='emailAddress'
            onSubmitEditing={() => Keyboard.dismiss()}
            style={styles.input}
          />
        </View>

        <View style={styles.areaInput}>
          <Text>Código de confirmação:</Text>
          <TextInput
            value={authCode}
            onChangeText={(input)=>setAuthCode(input)}
            placeholder="######"
            keyboardType='numeric'
            onSubmitEditing={() => Keyboard.dismiss()}
            secureTextEntry={false}
            style={styles.input}
          />
        </View>

        <TouchableOpacity style={styles.btnSubmit} onPress={confirmSignUp}>
          {loading ? (
            <ActivityIndicator size={"large"} color="#FFF" />
          ) : (
            <Text style={styles.btnTxt}>CONFIRMAR CÓDIGO</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.link} onPress={()=>navigation.navigate('SignIn')}>
          <Text style={styles.linkTxt}>EFETUAR LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.link} onPress={() => ResendConfirmationCode()}>
          <Text style={styles.linkTxt}>Código não recebido? Renviar Código.</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    paddingVertical: 10,
    padding: 10
  },
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  logo:{
    width: 100, 
    height: 100
  },
  marca:{
    width: 300, 
    height: 100,
    marginBottom: 15
  },
  areaInput:{
    width: "100%",
    justifyContent: "center",
    alignItems: "flex-start",
    margin: 10,
  },
  input:{
    width: "95%",
    height: 50,
    backgroundColor: "#FFF",
    padding: 10,
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
    margin: 10,
  },
  btnTxt:{
    color: "#FFF", 
    fontSize: 20,
    textAlign: "center", 
  },
  link: {
    marginTop: 10,
    marginBottom: 10,
  },
  linkTxt:{
    textAlign: "center",
    color: "#000",
  }
})
